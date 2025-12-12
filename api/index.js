// Vercel serverless function wrapper for Express app
// Use dynamic import to ensure ES module compatibility
let app;

export default async (req, res) => {
  // Lazy load the Express app on first request
  if (!app) {
    const { default: expressApp } = await import('../backend/src/server.js');
    app = expressApp;
  }
  
  // Handle the request with Express app
  return app(req, res);
};

