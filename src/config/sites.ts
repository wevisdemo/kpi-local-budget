export interface SiteConfig {
  name: string;
  subtitle: string;
  subtext: string;
}

export const sites: Record<string, SiteConfig> = {
  bangkhuwat: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาลบางคูวัด จังหวัดปทุมธานี",
    subtext: "เทศบาลบางคูวัด",
  },
  site2: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
  },
  site3: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
  },
  site4: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
  },
  site5: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
  },
};

const siteKey = process.env.NEXT_PUBLIC_SITE ?? "bangkhuwat";

export const currentSite: SiteConfig = sites[siteKey] ?? sites["bangkhuwat"]!;
