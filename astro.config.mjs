// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // EdgeOne Pages 部署在根路径；site 待部署后填分配到的域名
  base: '/',

  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()]
  }
});