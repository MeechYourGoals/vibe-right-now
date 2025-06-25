
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MobileProvider } from './hooks/use-mobile'

// Ensure we're creating the root element properly
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Adding error boundary at the top level
try {
  createRoot(rootElement).render(
    <MobileProvider>
      <App />
    </MobileProvider>
  );
} catch (error) {
  console.error("Failed to render the app:", error);
  // Show a fallback UI instead of a blank screen
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center;">
      <h2>Something went wrong</h2>
      <p>Please refresh the page to try again.</p>
      <p>Error: ${error instanceof Error ? error.message : 'Unknown error'}</p>
    </div>
  `;
}
