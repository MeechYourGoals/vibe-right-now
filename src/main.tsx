
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Import for testing - this will be tree-shaken in production
if (process.env.NODE_ENV !== 'production') {
  import("./utils/explore/__tests__/testSearch").catch(console.error);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
