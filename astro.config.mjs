import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'courses-mcp',
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        ThemeProvider: './src/components/DarkThemeOnly.astro',
        SocialIcons: './src/components/ProjectLinks.astro',
        ThemeSelect: './src/components/DarkThemeOnly.astro',
      },
      sidebar: [
        { label: 'Get started', items: [{ slug: 'docs', label: 'Overview' }] },
      ],
      customCss: ['@fontsource-variable/geist', './src/styles/brand.css'],
      logo: { src: './src/assets/courses-mcp-logo.webp' },
    }),
  ],
});
