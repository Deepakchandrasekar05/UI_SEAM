import React, { useState, useRef, useEffect } from "react";
import { Camera, AlertCircle, CheckCircle2 } from "lucide-react";

interface CameraViewProps {
  onCapture: (imageSrc: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setIsReady(true); // Mark the camera feed as ready
          };
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setError("Could not access camera. Please check permissions.");
      }
    };

    startVideo();
  }, []);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setImageSrc(canvas.toDataURL("image/png"));
      }
    }
  };

  useEffect(() => {
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [imageSrc, onCapture]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Display error if camera fails */}
      {error ? (
        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-2 text-red-600 border border-red-200">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="relative">
          {/* Camera Feed */}
          <video
            ref={videoRef}
            autoPlay
            className="rounded-lg border border-gray-300 shadow w-full h-64 object-cover"
          />

          {/* Check Circle when feed is ready */}
          {isReady && (
            <div className="absolute top-4 right-4">
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            </div>
          )}
        </div>
      )}

      {/* Button */}
      <button
        onClick={captureImage}
        disabled={!isReady}
        className={`mt-5 py-2 rounded-lg w-full max-w-[500px] flex items-center justify-center gap-2 ${
          isReady
            ? "bg-green-600 text-white"
            : "bg-gray-400 text-gray-100 cursor-not-allowed"
        }`}
      >
        <Camera className="w-5 h-5" />
        <span>Authenticate</span>
      </button>
    </div>
  );
};
