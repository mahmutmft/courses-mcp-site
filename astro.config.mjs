import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'courses-mcp',
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        ThemeProvider: './src/components/DarkThemeOnly.astro',
        ThemeSelect: './src/components/DarkThemeOnly.astro',
      },
      customCss: ['./src/styles/brand.css'],
      logo: { src: './src/assets/courses-mcp-logo.webp', replacesTitle: true, alt: 'courses-mcp' },
    }),
  ],
});
