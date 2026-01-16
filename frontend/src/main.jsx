import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function MissingClerkPublishableKey() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-6">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Missing Clerk Publishable Key</h1>
          <p>
            Set <span className="font-mono">VITE_CLERK_PUBLISHABLE_KEY</span> in a
            <span className="font-mono"> frontend/.env</span> file and restart the
            Vite dev server.
          </p>
          <div className="mockup-code">
            <pre data-prefix="$">
              <code>VITE_CLERK_PUBLISHABLE_KEY=pk_test_...</code>
            </pre>
          </div>
          <p className="text-sm opacity-70">
            See the <span className="font-mono">.env Setup</span> section in the
            repo README.
          </p>
          <div className="card-actions justify-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {PUBLISHABLE_KEY ? (
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </BrowserRouter>
      </ClerkProvider>
    ) : (
      <MissingClerkPublishableKey />
    )}
  </StrictMode>
);
