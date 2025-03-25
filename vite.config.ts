import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createRequire } from "node:module";
import { viteStaticCopy } from "vite-plugin-static-copy";
import legacy from "@vitejs/plugin-legacy";

// Loading environment variables
const require = createRequire(import.meta.url);
const env = loadEnv(process.env.NODE_ENV || "development", process.cwd());
// Loads environment variables based on mode
const cMapsDir = path.join(path.dirname(require.resolve("pdfjs-dist/package.json")), "cmaps");

export default defineConfig({
  optimizeDeps: {
    include: ["@mui/material", "@mui/icons-material", "@emotion/react", "@emotion/styled"],
  },
  plugins: [
    react({
      jsxImportSource: "@emotion/react", // Add this for MUI
      babel: {
        plugins: ["@emotion/babel-plugin"],
      },
    }),
    viteStaticCopy({
      targets: [
        {
          src: cMapsDir,
          dest: "",
        },
      ],
    }),
    legacy({
      targets: ["defaults", "IE 11"],
    }),
    // Example of integrating other plugins (if needed)
    // sentryVitePlugin({
    //   org: 'your-org',
    //   project: 'your-project',
    //   include: './dist',
    //   authToken: env.VITE_SENTRY_AUTH_TOKEN,
    //   release: env.VITE_BUILD_ID,
    //   telemetry: env.NODE_ENV === 'production',
    // }),
  ],
  resolve: {
    alias: {
      "@apis": path.resolve(__dirname, "./src/apis"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@interface": path.resolve(__dirname, "./src/interface"),
      "@configs": path.resolve(__dirname, "./src/configs"),
      "@appConfigs": path.resolve(__dirname, "./src/appConfigs"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@constants": path.resolve(__dirname, "./src/constants"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@mocks": path.resolve(__dirname, "./src/mocks"),
      "~": path.resolve(__dirname, "node_modules"), // Alias for node_modules
      "@": path.resolve(__dirname, "src"), // General alias for src
    },
  },
  server: {
    host: true,
    port: 5173,
  },
  build: {
    sourcemap: env.NODE_ENV === "production", // Enable sourcemaps only in production
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true, // Optional, to silence warnings for certain dependencies
      },
    },
  },
});
