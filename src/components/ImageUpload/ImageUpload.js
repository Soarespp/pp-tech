"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { FiUpload, FiX } from "react-icons/fi";

const ImageUpload = ({ onImageUpload, currentImage }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImage(file);
    }
  };

  const handleImage = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImage(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onImageUpload(null);
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6
                     transition-colors duration-200 cursor-pointer
                     ${
                       isDragging
                         ? "border-green-900 bg-green-50"
                         : "border-gray-300 hover:border-green-700"
                     }`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDrag}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center space-y-2">
            <FiUpload className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-500">
              Arraste uma imagem ou clique para selecionar
            </p>
            <p className="text-xs text-gray-400">PNG, JPG ou JPEG até 5MB</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative">
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <Image src={preview} alt="Preview" fill className="object-cover" />
          </div>
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white 
                     rounded-full hover:bg-red-600 transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
