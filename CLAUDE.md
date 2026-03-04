# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server**: `npm run dev` (starts on http://localhost:3000)
- **Build**: `npm run build`
- **Production server**: `npm run start`
- **Lint**: `npm run lint`

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4 (via @tailwindcss/postcss)
- ESLint 9 with next/core-web-vitals and next/typescript configs

## Project Structure

This is a standard Next.js App Router project. All pages and layouts live in `app/`. The path alias `@/*` maps to the project root.

## Streaming SSR Demo

The `/streaming-demo` route demonstrates HTML streaming with React Suspense:
- Uses httpbin.org `/delay/:n` endpoint to simulate slow API responses
- Multiple components with different delays stream in progressively
- `/streaming-demo/nested` shows nested Suspense boundaries and waterfall patterns
