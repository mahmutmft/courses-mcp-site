import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://courses-mcp.mahmutmft.dev',
  redirects: { '/docs/': '/' },
  integrations: [
    starlight({
      title: 'courses-mcp',
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: { root: { label: 'English', lang: 'en' }, mk: { label: 'Македонски', lang: 'mk' } },
      components: {
        TableOfContents: './src/components/TableOfContents.astro',
        LanguageSelect: './src/components/LanguageSelect.astro',
        PageTitle: './src/components/PageTitle.astro',
        Search: './src/components/Search.astro',
        SiteTitle: './src/components/SiteTitle.astro',
        ThemeProvider: './src/components/DarkThemeOnly.astro',
        SocialIcons: './src/components/ProjectLinks.astro',
        ThemeSelect: './src/components/DarkThemeOnly.astro',
      },
      sidebar: [
        { label: 'Get started', translations: { mk: 'Започнете тука' }, items: [{ slug: '', label: 'What is Courses MCP?', translations: { mk: 'Што е Courses MCP?' }, attrs: { class: 'overview-link' } }] },
        {
          label: 'Tools',
          translations: { mk: 'Алатки' },
          items: [
                { slug: 'reference/tools', label: 'All tools', translations: { mk: 'Сите алатки' }, attrs: { class: 'nav-icon nav-grid' } },
                {
                  label: 'Courses and search',
                  translations: { mk: 'Предмети и пребарување' },
                  collapsed: true,
                  items: [
                    { slug: 'reference/tools/list-courses', label: 'list_courses', attrs: { class: 'nav-icon nav-list' } },
                    { slug: 'reference/tools/get-course', label: 'get_course', attrs: { class: 'nav-icon nav-book' } },
                    { slug: 'reference/tools/search-course', label: 'search_course', attrs: { class: 'nav-icon nav-search' } },
                    { slug: 'reference/tools/search-courses', label: 'search_courses', attrs: { class: 'nav-icon nav-search' } },
                  ],
                },
                {
                  label: 'Materials',
                  translations: { mk: 'Материјали' },
                  collapsed: true,
                  items: [
                    { slug: 'reference/tools/read-resource', label: 'read_resource', attrs: { class: 'nav-icon nav-book' } },
                  ],
                },
          ],
        },
      ],
      customCss: ['@fontsource-variable/geist', './src/styles/brand.css', './src/styles/sidebar.css', './src/styles/tool-catalog.css'],
      logo: { src: './src/assets/courses-mcp-logo.webp' },
    }),
  ],
});
