import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/web_project_around_auth/",
  plugins: [react()],
  server: {
    port: 3000, // Cambia el número de puerto a 3000.
    open: true, // abre el navegador al iniciar
  },
});
