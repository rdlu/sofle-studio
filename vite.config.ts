import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

function htmlEnvVarReplacePlugin(env: Record<string, string>): Plugin {
  return {
    name: "html-transform",
    transformIndexHtml: {
      order: "pre",
      handler: (html: string): string =>
        html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      svgr(),
      htmlEnvVarReplacePlugin({
        VITE_GOOGLE_ANALYTICS_ID:
          env.VITE_GOOGLE_ANALYTICS_ID || "G-32NGG9Y4BQ",
      }),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        workbox: {
          // Precache every build asset so the app fully boots offline.
          globPatterns: [
            "**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp,woff,woff2,wasm}",
          ],
          // App bundle is ~1.3 MB; raise above Workbox's 2 MiB default.
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          // SPA: serve index.html for client-side routes when offline.
          navigateFallback: "index.html",
          cleanupOutdatedCaches: true,
        },
        manifest: {
          name: "Sofle Studio",
          short_name: "Sofle Studio",
          description:
            "Offline-capable ZMK Studio keymap editor for the Eyelash Sofle keyboard",
          start_url: "/",
          scope: "/",
          display: "standalone",
          theme_color: "#0b0b0b",
          background_color: "#0b0b0b",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any",
            },
            {
              src: "maskable-icon-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
      }),
    ],
  };
});
