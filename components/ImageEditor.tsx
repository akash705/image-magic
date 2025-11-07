
import React, { useState, useEffect, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import Spinner from './Spinner';

const ImageEditor: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
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

  const handleGenerate = useCallback(async () => {
    if (!imageFile || !prompt) {
      setError('Please upload an image and enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    try {
      const resultBase64 = await editImage(imageFile, prompt);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating the image.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, prompt]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">1. Upload Image</h3>
          <ImageUploader onImageSelect={setImageFile} imagePreviewUrl={imagePreview} />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">2. Describe Your Edit</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Add a retro filter', 'Make it look like a watercolor painting', 'Remove the person in the background'"
            className="w-full h-40 p-3 bg-gray-800 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            rows={5}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !imageFile || !prompt}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? <><Spinner /> Generating...</> : 'Generate Image'}
          </button>
        </div>
      </div>
      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}

      {isLoading && (
        <div className="text-center p-8 bg-gray-800/50 rounded-lg">
          <div className="flex justify-center items-center gap-4">
            <Spinner />
            <p className="text-lg">Performing Magic...</p>
          </div>
          <p className="text-gray-400 mt-2">This may take a moment.</p>
        </div>
      )}

      {generatedImage && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center">Result</h3>
          <div className="bg-gray-800/50 p-4 rounded-xl">
            <img src={generatedImage} alt="Generated" className="w-full max-w-2xl mx-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
