import React, { useState, useEffect, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import Spinner from './Spinner';

type StyleFeature = 'hairstyle' | 'shirt' | 'beard' | 'jeans';

const StyleAdvisor: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<StyleFeature | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);
  
  const handleFeatureSelect = (feature: StyleFeature) => {
    setSelectedFeature(feature);
    setCustomPrompt('');
  }

  const handleCustomPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomPrompt(e.target.value);
    setSelectedFeature(null);
  }

  const getPromptsForFeature = (feature: StyleFeature): string[] => {
    switch(feature) {
      case 'hairstyle':
        return [
          "Keeping the person's face and facial features exactly the same, change their hairstyle to a modern, trendy haircut that is flattering for their face shape.",
          "Keeping the person's face and facial features exactly the same, change their hairstyle to a classic, elegant hairstyle that suits them."
        ];
      case 'shirt':
        return [
          "Keeping the person's face, hair, and body shape the same, change their shirt to a stylish casual button-down shirt that complements their appearance.",
          "Keeping the person's face, hair, and body shape the same, change their shirt to a high-quality, well-fitting plain t-shirt in a color that suits them."
        ];
      case 'beard':
        return [
            "Keeping the person's face and facial features exactly the same, add a well-groomed, full beard that suits their face shape.",
            "Keeping the person's face and facial features exactly the same, add a stylish, short stubble beard."
        ];
      case 'jeans':
        return [
            "Keeping the person's upper body (shirt, face, hair) the same, change their pants to a pair of classic, well-fitting blue jeans.",
            "Keeping the person's upper body (shirt, face, hair) the same, change their pants to a pair of modern, slim-fit black jeans."
        ];
      default:
        return [];
    }
  }

  const handleGenerate = useCallback(async () => {
    if (!imageFile || (!selectedFeature && !customPrompt.trim())) {
      setError('Please upload a photo and select a feature or enter a custom request.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);

    try {
        if (customPrompt.trim()) {
            const result = await editImage(imageFile, customPrompt.trim());
            setGeneratedImages([`data:image/png;base64,${result}`]);
        } else if (selectedFeature) {
            const prompts = getPromptsForFeature(selectedFeature);
            const results = await Promise.all([
                editImage(imageFile, prompts[0]),
                editImage(imageFile, prompts[1]),
            ]);
            setGeneratedImages(results.map(base64 => `data:image/png;base64,${base64}`));
        }
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating suggestions.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, selectedFeature, customPrompt]);
  
  const isButtonDisabled = isLoading || !imageFile || (!selectedFeature && !customPrompt.trim());

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">1. Upload Your Photo</h3>
          <ImageUploader onImageSelect={setImageFile} imagePreviewUrl={imagePreview} />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">2. Get Advice On...</h3>
          <div className="grid grid-cols-2 gap-3">
            {(['hairstyle', 'shirt', 'beard', 'jeans'] as const).map((feature) => (
               <button
                key={feature}
                onClick={() => handleFeatureSelect(feature)}
                className={`p-3 rounded-lg text-center font-semibold capitalize transition-all duration-200 flex flex-col items-center justify-center gap-2 ${selectedFeature === feature ? 'bg-indigo-600 text-white ring-2 ring-offset-2 ring-offset-gray-900 ring-indigo-500' : 'bg-gray-700 hover:bg-gray-600'}`}
               >
                {feature} Style
               </button>
            ))}
          </div>
          <div className="relative flex py-3 items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-400">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-300 mb-2">Try a custom request</h3>
            <textarea
                value={customPrompt}
                onChange={handleCustomPromptChange}
                placeholder="e.g., 'Add a stylish hat', 'Change the background to a cityscape at night'"
                className="w-full h-24 p-3 bg-gray-800 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
          <div className="pt-2">
             <button
                onClick={handleGenerate}
                disabled={isButtonDisabled}
                className="w-full flex justify-center items-center gap-2 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isLoading ? <><Spinner /> Getting Advice...</> : 'Get Style Advice'}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
      
      {isLoading && (
        <div className="text-center p-8 bg-gray-800/50 rounded-lg">
          <div className="flex justify-center items-center gap-4">
            <Spinner />
            <p className="text-lg">Consulting with our AI stylist...</p>
          </div>
          <p className="text-gray-400 mt-2">This may take a moment.</p>
        </div>
      )}

      {generatedImages && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center">
            {customPrompt.trim() ? "Your custom image is ready!" : "Here are a couple of ideas!"}
            </h3>
          <div className={`grid grid-cols-1 ${generatedImages.length > 1 ? 'sm:grid-cols-2' : ''} gap-4`}>
            {generatedImages.map((imgSrc, index) => (
                <div key={index} className="bg-gray-800/50 p-2 rounded-xl">
                    <img src={imgSrc} alt={`Suggestion ${index + 1}`} className="w-full mx-auto rounded-lg" />
                </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleAdvisor;