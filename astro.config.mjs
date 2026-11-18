import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://courses-mcp.mahmutmft.dev',
  redirects: { '/docs/': '/' },
  integrations: [
    starlight({
      title: 'courses-mcp',
      components: {
        Sidebar: './src/components/Sidebar.astro',
        Search: './src/components/Search.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        ThemeProvider: './src/components/DarkThemeOnly.astro',
        SocialIcons: './src/components/ProjectLinks.astro',
        ThemeSelect: './src/components/DarkThemeOnly.astro',
      },
      sidebar: [
        { label: 'Get started', items: [{ link: '/', label: 'What is Courses MCP?', attrs: { class: 'overview-link' } }] },
      ],
      customCss: ['@fontsource-variable/geist', './src/styles/brand.css'],
      logo: { src: './src/assets/courses-mcp-logo.webp' },
    }),
  ],
});
