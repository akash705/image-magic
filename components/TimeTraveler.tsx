
import React, { useState, useEffect, useCallback } from 'react';
import { editImage } from '../services/geminiService';
import { HISTORICAL_ERAS } from '../constants';
import ImageUploader from './ImageUploader';
import Spinner from './Spinner';

const TimeTraveler: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedEra, setSelectedEra] = useState<string>(HISTORICAL_ERAS[0]);
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
    if (!imageFile) {
      setError('Please upload a photo to begin your journey.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    
    let prompt = '';
    const indianAncientEras = [
      "Time of Mahabharat", 
      "Time of Ramayan", 
      "Kingdom of Chandragupta Maurya"
    ];

    if (indianAncientEras.includes(selectedEra)) {
      prompt = `Recreate this photo, transforming the person and scene into an ancient Indian-style painting or a detailed, aged sketch depicting the '${selectedEra}' era. Match the traditional clothing, hairstyles, and environment of that specific period in ancient India. The final image should have an artistic, hand-drawn, or aged manuscript/scroll appearance. Crucially, remove any modern items like eyeglasses, watches, or modern jewelry.`;
    } else {
      prompt = `Recreate this photo, transforming the person and scene to look like it was genuinely taken in the '${selectedEra}' era. Match the clothing, style, lighting, and photo quality of that time period. Ensure historical accuracy by removing any anachronistic items like modern gadgets, logos, or accessories (for example, modern eyeglasses should be removed for ancient or medieval periods).`;
    }


    try {
      const resultBase64 = await editImage(imageFile, prompt);
      setGeneratedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred during time travel.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [imageFile, selectedEra]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">1. Upload Your Photo</h3>
          <ImageUploader onImageSelect={setImageFile} imagePreviewUrl={imagePreview} />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-200">2. Choose Your Destination</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {HISTORICAL_ERAS.map((era) => (
              <button
                key={era}
                onClick={() => setSelectedEra(era)}
                className={`p-3 rounded-lg text-center font-semibold transition-all duration-200 ${
                  selectedEra === era
                    ? 'bg-indigo-600 text-white ring-2 ring-offset-2 ring-offset-gray-900 ring-indigo-500'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {era}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <button
            onClick={handleGenerate}
            disabled={isLoading || !imageFile}
            className="w-full max-w-sm flex justify-center items-center gap-2 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
            {isLoading ? <><Spinner /> Traveling...</> : 'Time Travel!'}
        </button>
      </div>

      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}
      
      {isLoading && (
        <div className="text-center p-8 bg-gray-800/50 rounded-lg">
          <div className="flex justify-center items-center gap-4">
            <Spinner />
            <p className="text-lg">Powering up the time machine...</p>
          </div>
          <p className="text-gray-400 mt-2">Please hold on, this could take a moment.</p>
        </div>
      )}

      {generatedImage && (
        <div>
          <h3 className="text-2xl font-bold mb-4 text-center">Welcome to the Past!</h3>
          <div className="bg-gray-800/50 p-4 rounded-xl">
            <img src={generatedImage} alt={`Generated in ${selectedEra}`} className="w-full max-w-2xl mx-auto rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTraveler;
