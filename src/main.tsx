import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "@components/ErrorFallBack.tsx";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => window.location.replace("/")}>
        <App />
      </ErrorBoundary>
    </ThemeProvider>
  </BrowserRouter>
);
