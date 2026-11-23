# RampCheck Website

The official landing page for [RampCheck](https://rampcheck.com).

## About

RampCheck helps pilots, crews, and aviation teams simplify ramp inspections and improve safety. This repository contains the Next.js website that introduces the product and its capabilities.

## Tech Stack

- [Next.js 16](https://nextjs.org/)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
cd rampcheck
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```text
rampcheck/
├── app/          # Next.js App Router pages and styles
├── public/       # Static assets
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Deployment

Build the application before deploying:

```bash
npm run build
npm run start
```

The site can also be deployed directly to a platform that supports Next.js, such as [Vercel](https://vercel.com/new).
