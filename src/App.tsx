import React, { useState } from "react";
import { CameraView } from "/project/workspace/src/components/CameraView";
import { AuthStatus } from "/project/workspace/src/components/AuthStatus.tsx";
import { CircuitBoard } from "lucide-react";

function App() {
  const [authStatus, setAuthStatus] = useState<
    "idle" | "processing" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Ready for authentication"
  );

  const handleCapture = async (imageSrc: string) => {
    setAuthStatus("processing");
    setStatusMessage("Processing authentication...");

    // Simulate authentication process
    setTimeout(() => {
      setAuthStatus("success");
      setStatusMessage("Authentication successful!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <img src="/seam-logo.jpeg" alt="SEAM" className="h-24" />
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <CircuitBoard className="w-5 h-5" />
            <p className="text-lg">Secure Face Authentication Model</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-50 rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="max-w-md mx-auto space-y-6">
            <CameraView onCapture={handleCapture} />
            <AuthStatus status={authStatus} message={statusMessage} />
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500">
          <p>
            Please ensure good lighting and position your face within the frame
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} SEAM Authentication System
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
