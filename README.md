# Pre-flight

- [ ] Change the project name in the [`package.json`](./package.json)
- [ ] Install packages as needed

# The SvelteKit Template

This repository is intended to be a template for my future projects.

It automates the process of setting up a SvelteKit project; adding Tailwind, ESLint, and Prettier; and setting up code quality and deployment workflows.

It is heavily inspired by and lifts some items from [BastiDood's own template](https://github.com/BastiDood/sveltekit-tailwind-template), though it does depart in some major ways:

- Using `adapter-node` instead of `adapter-static` in the [SvelteKit config](./svelte.config.js)
- Removing the full-on `pnpm build` step in the [CI workflow](./.github/workflows/ci.yaml)
- Implementing a full deployment flow using [Docker](./Dockerfile)

Aside from this, there are a few minor changes, such as:

- In the [Prettier rules](./.prettierrc), I prefer tabs to be 4 spaces wide
