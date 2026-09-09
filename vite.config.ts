import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain Vite + React SPA. `vite build` emits a static bundle to dist/.
// appType "spa" (Vite's default) serves index.html for unknown routes in dev,
// so client-side deep links like /app resolve. Static hosts use the SPA
// fallback in vercel.json.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist",
  },
});
