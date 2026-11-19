import type { APIRoute } from 'astro';

const documents = import.meta.glob('/src/content/docs/**/*.{md,mdx}', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

export function getStaticPaths() {
  return Object.entries(documents).map(([path, source]) => ({
    params: { page: path.split('/src/content/docs/')[1].replace(/\.mdx?$/, '') },
    props: { source, isMk: path.includes('/docs/mk/') },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const source = props.source as string;
  const isMk = props.isMk;
  const title = source.match(/^title: (.+)$/m)?.[1] ?? '';
  const markdown = source
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/^import .+;\s*$/gm, '')
    .replace('<ConnectionFlow />', isMk ? 'Вашиот MCP клиент → Courses MCP → Moodle на ФИНКИ' : 'Your MCP client → Courses MCP → FINKI Moodle')
    .replace(/<li>\{("(?:[^"\\]|\\.)*")\}<\/li>/g, (_, value) => '- ' + JSON.parse(value))
    .replace(/<li>([^<{]*)<\/li>/g, (_, text) => '- ' + text)
    .replace(/<\/?ul[^>]*>/g, '')
    .replace(/<\/?div[^>]*>/g, '')
    .replace(/^\{("(?:[^"\\]|\\.)*")\}$/gm, (_, value) => JSON.parse(value))
    .trim();
  return new Response('# ' + title + '\n\n' + markdown + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
