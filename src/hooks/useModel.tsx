import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

// 1. Define the Custom Normalization Layer (if it's not already defined)
class NormalizationLayer extends tf.layers.Layer {
  mean: any;
  std: any;

  constructor(config: any) {
    super(config);
    this.mean = config.mean || 0; // Default mean
    this.std = config.std || 1; // Default standard deviation
  }

  // Define how the layer processes inputs
  call(inputs: tf.Tensor) {
    // Normalize the inputs using the formula: (inputs - mean) / std
    return tf.div(tf.sub(inputs, this.mean), this.std);
  }

  // Make sure to give the layer a class name for serialization
  static get className() {
    return "Normalization"; // This must match the name used in the original model
  }
}

// Register the custom Normalization layer to ensure it's recognized when loading the model
tf.serialization.registerClass(NormalizationLayer);

// Custom hook to load the model
const useModel = (modelUrl: string) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        console.log("Loading model from:", modelUrl);

        // Load the model with the custom layer registered
        const loadedModel = await tf.loadLayersModel(modelUrl);

        // If you need to adjust mean and std, do it here
        loadedModel.layers.forEach((layer) => {
          if (layer.getClassName() === "Normalization") {
            (layer as any).mean = 0; // Set the mean value (replace with the actual mean if known)
            (layer as any).std = 1; // Set the std value (replace with the actual std if known)
          }
        });

        setModel(loadedModel);

        // Log model summary to verify architecture
        console.log("Model loaded successfully:");
        loadedModel.summary();
      } catch (err: any) {
        console.error("Error loading model:", err.message);
        setError(`Model failed to load: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, [modelUrl]);

  // Return the model, loading status, and any error message
  return { model, loading, error };
};

export default useModel;
