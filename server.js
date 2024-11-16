import express from "express";
import cors from "cors";
import path from "path";

// Use import.meta.url to get the current directory
const __dirname = new URL(".", import.meta.url).pathname;

const app = express();
const PORT = 1235;

// Enable CORS
app.use(cors({ origin: "*" }));

// Serve static files for model
app.use(
  "/project/workspace/web_model",
  express.static(path.join(__dirname, "web_model"), {
    setHeaders: (res, path) => {
      // Set Cache-Control header for better caching in service workers
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    },
  })
);

// Test route
app.get("/", (req, res) => {
  res.send(
    "Server is running. Model available at /project/workspace/web_model/model.json"
  );
});

// Catch all other routes to prevent unnecessary errors
app.get("/test-model", (req, res) => {
  res.sendFile(path.join(__dirname, "web_model", "model.json"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
