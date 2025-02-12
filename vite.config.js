import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    define: {
      __APP_ENV__: process.env.VITE_APP_ENV,
    },
    css: {
      postcss: "./postcss.config.js"
    },
    build: {
      outDir: 'dist', 
    },
  });
};
