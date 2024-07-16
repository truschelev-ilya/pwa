import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

const vitePWA = VitePWA({
  registerType: "autoUpdate",
  outDir: "dist",
  devOptions: {
    enabled: true
  },
  includeAssets: ["**/*"],
  manifest: {
    display: "standalone",
    scope: "/",
    start_url: "/",
    name: "Vite PWA project",
    short_name: "VitePWA",
    description: "Test PWA project on Vite",
    theme_color: "#FFFFFF",
    icons: [
        {
        src: "assets/images/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "assets/images/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "assets/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png"
      },
      {
        src: "assets/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png"
      },
      {
        src: "assets/images/favicon.ico",
        sizes: "48x48",
        type: "ico"
      },
    ],
    screenshots: [
      {
        src: "assets/images/pwa_preview_desktop.png",
        sizes: "685x481",
        type: "image/png",
        form_factor: "wide",
        label: "Wonder PWA"
      },
      {
        src: "assets/images/pwa_preview_mobile.png",
        sizes: "331x480",
        type: "image/png",
        form_factor: "narrow",
        label: "Wonder PWA"
      }
    ]
  }
})
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePWA],
})
