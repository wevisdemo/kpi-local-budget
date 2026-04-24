export function normalizeCategoryName(value: string | undefined | null): string {
  if (!value) return "";
  return value.replace(/\s*\([^)]*\)\s*$/, "").trim();
}
