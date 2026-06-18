// Must mirror `basePath` in next.config.ts. The deployed sub-path includes the
// site segment (e.g. /kpi-local-budget/suwankhuha), so static assets referenced
// in `next/image` src, CSS url(), and plain <a>/window.history URLs must use the
// full prefix. next/link and the router auto-apply this, so don't add it there.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH
  ? `${process.env.NEXT_PUBLIC_BASE_PATH}/${process.env.NEXT_PUBLIC_SITE}`
  : process.env.NEXT_PUBLIC_SITE
    ? `/${process.env.NEXT_PUBLIC_SITE}`
    : "";
