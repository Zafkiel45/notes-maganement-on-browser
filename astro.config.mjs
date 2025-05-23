// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

import markdoc from '@astrojs/markdoc';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc()],
  vite: {plugins: [tailwindcss()]},
  
  adapter: node({
    mode: 'standalone'
  })
});