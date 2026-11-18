import type { APIRoute } from 'astro';

const documents = import.meta.glob('/src/content/docs/*.{md,mdx}', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>;

export function getStaticPaths() {
  return Object.entries(documents).map(([path, source]) => ({
    params: { page: path.split('/').at(-1)!.replace(/\.mdx?$/, '') },
    props: { source },
  }));
}

export const GET: APIRoute = ({ props }) => {
  const source = props.source as string;
  const title = source.match(/^title: (.+)$/m)?.[1] ?? '';
  const markdown = source
    .replace(/^---[\s\S]*?---\s*/, '')
    .replace(/^import .+;\s*$/gm, '')
    .replace('<ConnectionFlow />', 'Your MCP client → Courses MCP → FINKI Moodle')
    .replace(/<li>\{("(?:[^"\\]|\\.)*")\}<\/li>/g, (_, value) => '- ' + JSON.parse(value))
    .replace(/<\/?ul[^>]*>/g, '')
    .replace(/^\{("(?:[^"\\]|\\.)*")\}$/gm, (_, value) => JSON.parse(value))
    .trim();
  return new Response('# ' + title + '\n\n' + markdown + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
