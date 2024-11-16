import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

// 1. Define the Custom Normalization Layer (if it's not already defined)
class NormalizationLayer extends tf.layers.Layer {
  mean: any;
  std: any;

  constructor(config: any) {
    super(config);
    this.mean = config.mean || 0; // Set a default value if not provided
    this.std = config.std || 1; // Set a default value if not provided
  }

  call(inputs: any) {
    // Normalize the inputs (this might change depending on your model's implementation)
    return tf.div(tf.sub(inputs, this.mean), this.std);
  }

  // Make sure to give the layer a class name so it can be properly registered
  static get className() {
    return "Normalization";
  }
}

// Register the custom Normalization layer
tf.serialization.registerClass(NormalizationLayer);

const useModel = (modelUrl: string) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        setLoading(true);
        console.log("Loading model from:", modelUrl);

        // Load the model
        const loadedModel = await tf.loadLayersModel(modelUrl);

        // 2. Check if the Normalization layer exists and manually assign the weights (mean, std)
        const normalizationLayer = loadedModel.getLayer("normalization");
        if (normalizationLayer) {
          // If you know the correct mean and std, you can manually set them
          normalizationLayer.mean = 0; // Adjust these values as per your model's requirement
          normalizationLayer.std = 1; // Adjust these values as per your model's requirement
        }

        setModel(loadedModel);

        // Log model summary to check the architecture
        console.log("Model loaded successfully:", loadedModel.summary());
      } catch (err: any) {
        console.error("Error loading model:", err.message);
        setError(`Model failed to load: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, [modelUrl]);

  // Return model, loading status, and error if any
  return { model, loading, error };
};

export default useModel;
