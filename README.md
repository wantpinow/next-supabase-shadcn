# next-supabase-shadcn

A fullstack template using Next.js, Supabase, Tailwind CSS (shadcn/ui), and TypeScript.

## Features

- 🚀 [Next.js 14](https://nextjs.org/docs) with `/app` router and SSR
- 🔐 [Supabase](https://supabase.io/docs) for auth and database
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs) with [shadcn/ui](https://ui.shadcn.com/docs)
- 📘 [TypeScript](https://www.typescriptlang.org/docs) support throughout, including auto-generated types for Supabase tables
- ✉️ Email signup and login using PKCE flow with [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/email-based-auth-with-pkce-flow-for-ssr)
- 🌗 Dark/light mode using [next-themes](https://github.com/pacocoursey/next-themes)
- 🔒 Protected routes via Next.js [middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- 🛡️ Protected CRUD operations via [row level security](https://supabase.com/docs/guides/auth/row-level-security)
- 🍞 Toast notifications
- 📱 Responsive layouts
- 📄 Example pages with metadata and React context providers

_Coming soon (please make a PR if you want to contribute)..._

- 📚 `/docs` pages
- 🔑 OAuth logins
- 🧪 Database tests for RLS policies

## Setup

Clone the repo, then install all dependencies using `yarn`:

```bash
yarn install
```

Start a local supabase instance. This will download the latest docker image and start a local instance of supabase.

```bash
yarn supabase start
```

Create a `.env.local` file with the enviroment variables defined in `.env.local.example`. The `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` defined in `.env.local.example` should work for all local supabase instances. If you wish to use a remote supabase instance, the public Supabase URL and API key can be found in your dashboard.

## Devlopment

Start the local next.js server:

```bash
yarn dev
```

If you wish to reset your local supabase database, run the command below. This will run any migrations in `supabase/migrations` and reset the database to the initial state defined in `supabase/seed.sql`.

```bash
yarn supabase db reset
```

Note that signups will require email confirmation by default. If you are running Supabase locally, you can find an [Inbucket](https://inbucket.org/) server at http://localhost:54324/ that will store all emails sent by your local Supabase instance.

<!--
## Supabase Cloud Setup

- Add the the appropriate /auth/callback to additonal redirect URLs in the Supabase dashboard -->
