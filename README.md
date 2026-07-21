# Personal Website

Welcome to [trains.cargill.dev](https://trains.cargill.dev)!

![Screenshot](https://raw.githubusercontent.com/dcrgll/trains/refs/heads/main/public/screenshot.png)

## 🚀 Features

- Built with modern Typescript, using tools and frameworks like [next](https://github.com/vercel/next.js), [trpc](https://github.com/trpc/trpc), [react-query](https://github.com/TanStack/query), [react-hook-form](https://github.com/react-hook-form/react-hook-form) and [tailwind](https://github.com/tailwindlabs/tailwindcss/).
- Animations via [motion](https://github.com/motiondivision/motion).
- A great developer experience with [Ultracite](https://www.ultracite.dev/), powered by [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.html) and [Oxlint](https://oxc.rs/docs/guide/usage/linter.html).

## 🔧 Dependencies

Ensure you have [node](https://nodejs.org/) >= v24 and [pnpm](https://pnpm.io/) v11.

## 🚀 Setup and Running

1. Clone the repository:

   ```bash
   git clone git@github.com:dcrgll/train-times.git
   ```

2. (Optional) Ensure you're on Node v22 or higher:

   ```bash
   node --version
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Setup environment variables:

   Rename the `.env.example` file to `.env.local` and fill in the necessary values.

There is more documentation on the environment variables in the example file.

5. Start the application:

   ```bash
   pnpm dev
   ```

By default, the application should be available at [https://trains.local](https://trains.local). To use the standard Next.js development server instead, run `pnpm dev:app`.
