// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Cloudflare Pages 部署：https://resume.yl4055.top（根路径）
  site: 'https://resume.yl4055.top',
  base: '/',

  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()]
  }
});