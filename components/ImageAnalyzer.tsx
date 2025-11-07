
import React, { useState, useEffect, useCallback } from 'react';
import { analyzeImage } from '../services/geminiService';
import ImageUploader from './ImageUploader';
import Spinner from './Spinner';

const ImageAnalyzer: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('Describe this image in detail.');
  const [analysis, setAnalysis] = useState<string | null>(null);
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

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) {
      setError('Please upload an image to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const resultText = await analyzeImage(imageFile, prompt);
      setAnalysis(resultText);
    } catch (err: any) {
      setError(err.message || 'An error occurred while analyzing the image.');
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
          <h3 className="text-xl font-semibold text-gray-200">2. Ask a Question</h3>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'What is happening in this image?', 'Identify the main subject.'"
            className="w-full h-40 p-3 bg-gray-800 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            rows={5}
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !imageFile}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? <><Spinner /> Analyzing...</> : 'Analyze Image'}
          </button>
        </div>
      </div>
      {error && <div className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</div>}

      {(isLoading || analysis) && (
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Analysis Result</h3>
          <div className="bg-gray-800/50 p-6 rounded-xl min-h-[10rem]">
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="flex items-center gap-4">
                    <Spinner />
                    <p>Analyzing the image...</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-300 whitespace-pre-wrap">{analysis}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;
