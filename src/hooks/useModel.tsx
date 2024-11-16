import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

const useModel = (modelUrl: string) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        const loadedModel = await tf.loadLayersModel(modelUrl);
        setModel(loadedModel);
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Model failed to load. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, [modelUrl]);

  return { model, loading, error };
};

export default useModel;
