export interface SiteConfig {
  name: string;
  subtitle: string;
  subtext: string;
  link: string;
  planLink: string;
}

export const sites: Record<string, SiteConfig> = {
  bangkhuwat: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาลบางคูวัด จังหวัดปทุมธานี",
    subtext: "เทศบาลบางคูวัด",
    link: "https://bangkhuwat.kpi-local.com",
    planLink: "https://bangkhuwat.kpi-local.com/plan",
  },
  suwankhuha: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาลสุวรรณคูหา จังหวัดหนองบัวลำภู",
    subtext: "เทศบาลสุวรรณคูหา",
    link: "https://drive.google.com/file/d/1Zu1nUyzVZw2EHjC-SIDGd5n-qu1fVDxC/view?usp=sharing",
    planLink: "https://suwankhuha.kpi-local.com/plan",
  },
  site3: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
    link: "https://site3.kpi-local.com",
    planLink: "https://site3.kpi-local.com/plan",
  },
  site4: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
    link: "https://site4.kpi-local.com",
    planLink: "https://site4.kpi-local.com/plan",
  },
  site5: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
    link: "https://site5.kpi-local.com",
    planLink: "https://site5.kpi-local.com/plan",
  },
};

const siteKey = process.env.NEXT_PUBLIC_SITE ?? "bangkhuwat";

export const currentSite: SiteConfig = sites[siteKey] ?? sites["bangkhuwat"]!;
