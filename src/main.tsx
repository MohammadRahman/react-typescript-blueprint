import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "@components/ErrorFallBack.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <React.StrictMode>
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => window.location.replace("/")}>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  </BrowserRouter>
);
