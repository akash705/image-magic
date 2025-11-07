
import React, { useRef, useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageSelect: (file: File | null) => void;
  imagePreviewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, imagePreviewUrl }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onImageSelect(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0] || null;
    if (file && file.type.startsWith('image/')) {
        onImageSelect(file);
    }
  }, [onImageSelect]);


  return (
    <div 
      className={`relative w-full h-64 border-2 border-dashed rounded-lg flex items-center justify-center transition-colors duration-200 cursor-pointer ${isDragging ? 'border-indigo-500 bg-gray-800' : 'border-gray-600 hover:border-indigo-500 bg-gray-900/50'}`}
      onClick={handleUploadClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      {imagePreviewUrl ? (
        <img src={imagePreviewUrl} alt="Preview" className="object-contain w-full h-full rounded-lg" />
      ) : (
        <div className="text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="mt-2">Drag & drop an image here</p>
          <p className="text-xs">or click to select a file</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
