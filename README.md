# KPI Local (ลานชุมชน คนปั้นเมือง)

Digital participatory budgeting platform for Thai local municipalities. Residents can explore local development plans, submit project ideas, vote on goals, and follow how municipal budgets are allocated.

Built by [WeVis](https://wevis.info) and [Punch Up](https://punchup.world) under the King Prajadhipok's Institute participatory budgeting innovation project.

## Deployments

| Name       | URL                                                           | Host/Pipeline  |
| ---------- | ------------------------------------------------------------- | -------------- |
| Production | -                                                             | Client         |
| Client     |
| Staging    | [GitHub Pages](https://wevisdemo.github.io/kpi-local-budget/) | GitHub Actions |

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router, static export)
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Zustand](https://zustand.docs.pmnd.rs/) — client state
- [@wevisdemo/ui](https://www.npmjs.com/package/@wevisdemo/ui) — shared UI components
- [sheethuahua](https://www.npmjs.com/package/sheethuahua) — Google Sheets data
- [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) — bot protection on submissions
- [NocoDB](https://www.nocodb.com/) API (`tornjak.punchup.world`) — ideas, projects, votes

## Environment Variables

Create a `.env.local` file in the project root:

| Variable                         | Required   | Description                                                                                   |
| -------------------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE`               | No         | Site key: `bangkhuwat`, `suwankhuha`, `site3`, `site4`, or `site5`. Defaults to `bangkhuwat`. |
| `BASE_PATH`                      | No         | Next.js `basePath` for sub-path deployments (e.g. `/kpi-local-budget`).                       |
| `NEXT_PUBLIC_BASE_PATH`          | No         | Client-side base path for assets and links. Must match `BASE_PATH`.                           |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes (prod) | Cloudflare Turnstile site key for form submissions.                                           |

## Usage

**Requirements:** Node.js 24+, [pnpm](https://pnpm.io/) 10+

### Local dev server

Install dependencies:

```sh
pnpm install
```

Run the dev server (defaults to `bangkhuwat` site):

```sh
pnpm dev
```

Run a specific site:

```sh
pnpm dev:bangkhuwat
pnpm dev:suwankhuha
pnpm dev:site3
pnpm dev:site4
pnpm dev:site5
```

Open [http://localhost:3000](http://localhost:3000).

### Build

Build static export to `out/`:

```sh
pnpm build
```

Build for a specific site:

```sh
pnpm build:bangkhuwat
pnpm build:suwankhuha
```

Preview the production build locally:

```sh
pnpm start
```

### Other scripts

```sh
pnpm lint          # ESLint
pnpm tsc --noEmit  # Type check (used in CI)
```

## Multi-site configuration

Each municipality has its own config in `src/config/sites.ts` (display name, Google Sheet IDs, NocoDB namespace, URLs). Set `NEXT_PUBLIC_SITE` at build time to select which site to deploy.

## Related resources

- Figma https://www.figma.com/design/DkE5qJEtsJsNi1HkYl5dmE/-KPI-LocalBudget-?node-id=229-258&p=f&t=Px0SyKgrvrSmgEAk-0
- Spreadsheet / CoLab / Google Drive https://drive.google.com/drive/folders/18Uh6vb0iv4G38J6Rwa2YMMbUFWQplAA3

## License (Only public repo)

The team intends to develop every project as Open Source under the [Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/) terms. This means you can use, modify, and build upon the work, but it cannot be used for commercial purposes or to seek profit from the work. You must provide notice and credit to the work's owner, and the resulting work must be under the same Creative Commons license conditions as the original. WeVis Ltd. and Punch Up Ltd. are joint licensors.
