/**
 * Global settings adapter (2026-07-26) -- generalized from the pattern
 * proven on balcones-family-dental and validated in WP2Astro-codex's
 * `labs/global-settings-contract` lab. `practice.json` is the single
 * source of truth for NAP (name/address/phone) facts; this file merges
 * those facts into the `mainNav.json`/`footer.json` shapes the nav/footer
 * components already expect, so the phone number, address, hours, and
 * social links only ever have to be edited in one place ("Practice Info"
 * in CloudCannon) instead of being independently baked into the header,
 * footer, and schema.org markup.
 */
import footerData from "@data/footer.json";
import mainNavData from "@data/mainNav.json";
import practiceData from "@data/practice.json";

type JsonObject = Record<string, any>;

/**
 * Explicit shape for practice.json, matching WP2Astro's `PracticeSettings`/
 * `PracticeLocation` (packages/core/src/types.ts). Deliberately NOT inferred
 * from the imported JSON module directly -- a specific site's practice.json
 * only includes `maps`/`booking`/`email` when real evidence was found for
 * that field (see settings.ts), so relying on structural inference here would
 * make this file's own type-safety depend on which fields one particular
 * site's data happened to have, and break `astro check` on any site whose
 * evidence was thinner than whichever site's JSON TypeScript last saw.
 */
interface PracticeLocationShape {
  id: string;
  name: string;
  phone: string;
  phoneHref: string;
  email?: string;
  address: { street: string; city: string; state: string; postalCode: string };
  hours: { days: string; display: string }[];
  maps?: { listingUrl?: string; image?: string; imageAlt?: string };
  booking?: { label: string; url: string };
  geo?: { latitude?: number; longitude?: number };
}

interface PracticeShape {
  name: string;
  shortName: string;
  tagline: string;
  domain: string;
  copyrightYear: number;
  primaryLocation: PracticeLocationShape;
  social: { platform: string; label: string; url: string; icon?: string; customIcon?: string }[];
}

export const practice: PracticeShape = practiceData;
export const primaryLocation: PracticeLocationShape = practiceData.primaryLocation;

const SOCIAL_ICON_BY_PLATFORM: Record<string, string> = {
  google: "social/google",
  facebook: "social/facebook",
  instagram: "social/instagram",
  linkedin: "social/linkedin",
  youtube: "social/youtube",
  tiktok: "social/tiktok",
  x: "social/x",
  yelp: "social/yelp",
  pinterest: "social/pinterest",
  bluesky: "social/bluesky",
  reddit: "social/reddit",
  twitch: "social/twitch",
};

function fullAddress(): string {
  const address = primaryLocation.address;
  return [address?.street, address?.city, address?.state, address?.postalCode].filter(Boolean).join(", ");
}

function compactAddress(): string {
  const address = primaryLocation.address;
  if (!address?.street && !address?.city) return "";
  return `${address?.street ?? ""} ${address?.city ?? ""}, ${address?.state ?? ""} ${address?.postalCode ?? ""}`.replace(
    /\s+/g,
    " "
  ).trim();
}

function formattedHours(): string {
  return (primaryLocation.hours || [])
    .map((row: { days: string; display: string }) => `${row.days}: ${row.display}`)
    .join("; ");
}

/**
 * Merges practice.json's primary-location facts into mainNav.json's
 * preHeader (utility bar above the main nav) -- has no effect if the site
 * has no preHeader (classic-shell-only feature) or no recovered facts.
 */
export function getMainNav(): JsonObject {
  const existing = mainNavData as JsonObject;
  if (!existing.preHeader) return existing;

  const address = fullAddress();
  const existingItems = existing.preHeader.items ?? [];
  const items = existingItems.map((item: JsonObject, index: number) => {
    if (index === 0 && address) {
      return { ...item, text: address, href: primaryLocation.maps?.listingUrl || item.href };
    }
    if (index === 1 && primaryLocation.phone) {
      return { ...item, text: primaryLocation.phone, href: primaryLocation.phoneHref || item.href };
    }
    return item;
  });

  return {
    ...existing,
    logoAlt: practice.name || existing.logoAlt,
    preHeader: {
      ...existing.preHeader,
      logoAlt: practice.name || existing.preHeader.logoAlt,
      items,
      buttons: primaryLocation.booking?.url
        ? [{ text: primaryLocation.booking.label || "Schedule Appointment", href: primaryLocation.booking.url }]
        : existing.preHeader.buttons,
    },
  };
}

/**
 * Merges practice.json's primary-location + social facts into
 * footer.json's shape (facts/buttons/socials/mapSource/footerText).
 */
export function getFooter(): JsonObject {
  const existing = footerData as JsonObject;
  const address = compactAddress();
  const hours = formattedHours();

  const facts = [
    address ? { label: "ADDRESS", text: address, href: primaryLocation.maps?.listingUrl } : undefined,
    primaryLocation.phone ? { label: "PHONE", text: primaryLocation.phone, href: primaryLocation.phoneHref } : undefined,
    hours ? { label: "HOURS", text: hours } : undefined,
  ].filter(Boolean);

  const socials = (practice.social || [])
    .filter((social: JsonObject) => Boolean(social.url))
    .map((social: JsonObject) => ({
      icon: social.icon || SOCIAL_ICON_BY_PLATFORM[social.platform] || "globe-alt",
      customIcon: social.customIcon,
      label: social.label || social.platform || "Social profile",
      link: social.url,
    }));

  return {
    ...existing,
    logoAlt: practice.name || existing.logoAlt,
    // Only override with derived facts/socials when practice.json actually
    // has evidence -- otherwise keep whatever the base template shipped
    // (never replace real content with an empty array).
    facts: facts.length ? facts : existing.facts,
    buttons: primaryLocation.booking?.url
      ? [{ text: primaryLocation.booking.label || "Schedule Appointment", iconSource: existing.buttons?.[0]?.iconSource, href: primaryLocation.booking.url }]
      : existing.buttons,
    socials: socials.length ? socials : existing.socials,
    mapSource: primaryLocation.maps?.image || existing.mapSource,
    mapAlt: primaryLocation.maps?.imageAlt || existing.mapAlt,
    mapHref: primaryLocation.maps?.listingUrl || existing.mapHref,
    footerText: practice.name
      ? `\u00A9 ${practice.copyrightYear || new Date().getFullYear()} ${practice.name}`
      : existing.footerText,
  };
}
