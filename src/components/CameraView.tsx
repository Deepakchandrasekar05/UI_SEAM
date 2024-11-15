import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, AlertCircle, CheckCircle2 } from 'lucide-react';

interface CameraViewProps {
  onCapture: (imageSrc: string) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [error, setError] = useState<string>('');
  const [isReady, setIsReady] = useState(false);

  const handleUserMedia = useCallback(() => {
    setIsReady(true);
    setError('');
  }, []);

  const handleUserMediaError = useCallback(() => {
    setError('Camera access denied. Please check your permissions.');
    setIsReady(false);
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [onCapture]);

  return (
    <div className="relative w-full max-w-md mx-auto">
      {error ? (
        <div className="bg-red-50 p-4 rounded-lg flex items-center gap-2 text-red-600 border border-red-200">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-black border-2 border-gray-200">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              onUserMedia={handleUserMedia}
              onUserMediaError={handleUserMediaError}
              className="w-full rounded-lg"
            />
            {isReady && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              </div>
            )}
          </div>
          <button
            onClick={capture}
            disabled={!isReady}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Camera className="w-5 h-5" />
            Authenticate
          </button>
        </div>
      )}
    </div>
  );
};