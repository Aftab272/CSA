import React, { useEffect, useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void;
  className?: string;
}

export default function CloudinaryUploadWidget({ onUploadSuccess, className }: CloudinaryUploadWidgetProps) {
  const widgetRef = useRef<any>(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const initWidget = () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      alert('Cloudinary settings are missing. Please check your environment variables (.env).');
      return false;
    }

    // @ts-ignore
    if (!window.cloudinary) {
      alert('Cloudinary widget is still loading. Please check your internet connection and try again.');
      return false;
    }

    if (!widgetRef.current) {
      try {
        // @ts-ignore
        widgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            sources: ['local'], // Only allow uploading from PC storage
            cropping: true,
            showSkipCropButton: false, // Force them to crop or at least see the crop screen
            multiple: false,
            clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
            maxImageFileSize: 5000000, // 5MB
            theme: 'minimal',
          },
          (error: any, result: any) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              // Do not alert on 'close' events
              if (error.message && error.message !== 'Widget is closed') {
                alert(`Image upload failed: ${error.statusText || error.message}`);
              }
            } else if (result && result.event === 'success') {
              onUploadSuccess(result.info.secure_url);
            }
          }
        );
      } catch (err: any) {
        console.error("Widget creation error:", err);
        alert(`Could not open image uploader: ${err.message}`);
        return false;
      }
    }
    return true;
  };

  const openWidget = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsInitializing(true);
    
    // Check if initialized or try to initialize
    if (widgetRef.current || initWidget()) {
      widgetRef.current.open();
    }
    
    setIsInitializing(false);
  };

  return (
    <button
      onClick={openWidget}
      disabled={isInitializing}
      className={`px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-70 disabled:cursor-not-allowed ${className || ''}`}
    >
      {isInitializing ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
      Upload Image
    </button>
  );
}
