import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'courses-mcp',
      logo: { src: './src/assets/courses-mcp-logo.webp' },
    }),
  ],
});
