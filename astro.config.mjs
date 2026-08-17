// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Gitee Pages 部署：站点托管在 https://leon4055.gitee.io/resume/ 子路径下
  site: 'https://leon4055.gitee.io',
  base: '/resume/',

  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()]
  }
});