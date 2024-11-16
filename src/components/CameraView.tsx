// CameraView.tsx
import React, { useState, useRef, useEffect } from "react";

interface CameraViewProps {
  onCapture: (imageSrc: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          // Wait until the video is ready to play
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
          };
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    startVideo();
  }, []);

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setImageSrc(canvas.toDataURL("image/png"));
      }
    }
  };

  useEffect(() => {
    if (imageSrc) {
      onCapture(imageSrc); // Call onCapture with the captured image
    }
  }, [imageSrc, onCapture]);

  return (
    <div className="flex flex-col items-center">
      {/* Camera feed with rounded corners */}
      <video
        ref={videoRef}
        autoPlay
        width="500"
        height="375"
        className="rounded-lg border border-gray-300 shadow"
        style={{ objectFit: "cover" }}
      />
      {/* Button as long as the camera feed */}
      <button
        onClick={captureImage}
        className="mt-5 bg-green-600 text-white py-2 rounded-lg w-full max-w-[500px]"
      >
        Authenticate
      </button>
    </div>
  );
};
