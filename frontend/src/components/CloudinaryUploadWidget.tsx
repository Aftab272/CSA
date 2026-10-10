import React, { useEffect, useRef, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

interface CloudinaryUploadWidgetProps {
  onUploadSuccess: (url: string) => void;
  className?: string;
  croppingAspectRatio?: number;
}

export default function CloudinaryUploadWidget({ onUploadSuccess, className, croppingAspectRatio }: CloudinaryUploadWidgetProps) {
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

    // Destroy previous widget if options change so fresh cropping ratio applies
    if (widgetRef.current) {
      try {
        widgetRef.current.destroy();
      } catch (e) {}
      widgetRef.current = null;
    }

    try {
      const widgetOptions: any = {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
        sources: ['local'], // Only allow uploading from PC storage
        cropping: true,
        showSkipCropButton: false, // Strict crop mode to guarantee 100% card fit
        multiple: false,
        clientAllowedFormats: ['png', 'jpg', 'jpeg', 'webp'],
        maxImageFileSize: 5000000, // 5MB
        theme: 'minimal',
      };

      if (croppingAspectRatio) {
        widgetOptions.croppingAspectRatio = croppingAspectRatio;
        widgetOptions.croppingDefaultSelectionRatio = 0.95;
        widgetOptions.croppingShowDimensions = true;
      }

      // @ts-ignore
      widgetRef.current = window.cloudinary.createUploadWidget(
        widgetOptions,
        (error: any, result: any) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            // Do not alert on 'close' events
            if (error.message && error.message !== 'Widget is closed') {
              alert(`Image upload failed: ${error.statusText || error.message}`);
            }
          } else if (result && result.event === 'success') {
            let url: string = result.info.secure_url;
            // Apply exact 3:4 crop transformation to URL so image fits card frame 100%
            if (croppingAspectRatio && url.includes('/upload/')) {
              if (result.info.coordinates && result.info.coordinates.custom && result.info.coordinates.custom.length > 0) {
                url = url.replace('/upload/', '/upload/c_crop,g_custom/');
              } else {
                url = url.replace('/upload/', '/upload/c_fill,ar_3:4,g_auto/');
              }
            }
            onUploadSuccess(url);
          }
        }
      );
    } catch (err: any) {
      console.error("Widget creation error:", err);
      alert(`Could not open image uploader: ${err.message}`);
      return false;
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
