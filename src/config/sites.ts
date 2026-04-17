export interface SiteConfig {
  name: string;
  subtitle: string;
}

export const sites: Record<string, SiteConfig> = {
  bangkhuwat: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาลบางคูวัด จังหวัดปทุมธานี",
  },
  site2: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
  },
  site3: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
  },
  site4: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
  },
  site5: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
  },
};

const siteKey = process.env.NEXT_PUBLIC_SITE ?? "bangkhuwat";

export const currentSite: SiteConfig =
  sites[siteKey] ?? sites["bangkhuwat"]!;
