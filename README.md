# courses-mcp-site

Documentation website for [courses-mcp](https://github.com/mahmutmft/courses-mcp), an MCP server for accessing course materials. The site is built with Astro and Starlight, with Pagefind for search.

[Open the documentation](https://courses-mcp.mahmutmft.dev)

## Local development

Use Node.js 24 and npm. From the repository root, run:

```sh
npm ci
npm run dev
```

Open [localhost:4321](http://localhost:4321/). Documentation pages and the release blog live in [src/content/docs](src/content/docs/).

To build and preview the production site with search enabled:

```sh
npm run build
npm run preview
```

## Contributing

Start with an [issue](https://github.com/mahmutmft/courses-mcp-site/issues) and create a branch from `master`. Keep commits focused and include the issue number, for example `docs: clarify local setup (#21)`. Open a pull request linked to the issue and list the checks you ran. See [CONTRIBUTING.md](CONTRIBUTING.md).

GitHub Actions deploys changes merged into `master` to GitHub Pages.
