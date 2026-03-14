export const LANDING_STYLES = [
  "cosmetic",
  "count-on-us",
  "custom",
  "dental-implants",
  "emergency",
  "new-patient-emergency-combo",
] as const;

export type LandingStyle = (typeof LANDING_STYLES)[number];

const LANDING_STYLE_SET = new Set<string>(LANDING_STYLES);

export const DEFAULT_LANDING_STYLE: LandingStyle = "custom";

export function normalizeLandingStyle(value?: string | null): LandingStyle {
  const normalized = (value || "").trim().toLowerCase();

  if (LANDING_STYLE_SET.has(normalized)) {
    return normalized as LandingStyle;
  }

  return DEFAULT_LANDING_STYLE;
}

export function getLandingStyleFromPageId(pageId: string): LandingStyle {
  const [firstSegment = ""] = pageId.split("/");

  return normalizeLandingStyle(firstSegment);
}
