export interface SiteConfig {
  name: string;
  subtitle: string;
  subtext: string;
  link: string;
  planLink: string;
  nocoDb: string;
  sheetId_1y: string;
  sheetName_1y: string;
  sheetId_1y_5: string;
  sheetName_1y_5: string;
  date: string;
  acion_date: string;
}

export const sites: Record<string, SiteConfig> = {
  bangkhuwat: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาลบางคูวัด จ.ปทุมธานี",
    subtext: "เทศบาลบางคูวัด",
    link: "https://bangkhuwat.kpi-local.com",
    planLink: "https://bangkhuwat.kpi-local.com/plan",
    nocoDb: "Bangkhuwat",
    sheetId_1y: "1n-z7KJ1L1pvFNopvr5WgqezWFiPRnzOE",
    sheetName_1y: "แผนพัฒนาท้องถิ่น 66-70",
    sheetId_1y_5: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y_5: "แผนดำเนินงาน",
    date: "12 ตุลาคม 2564",
    acion_date: "12 ตุลาคม 2564",
  },
  suwankhuha: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาลสุวรรณคูหา จ.หนองบัวลำภู",
    subtext: "เทศบาลสุวรรณคูหา",
    link: "https://drive.google.com/file/d/1Zu1nUyzVZw2EHjC-SIDGd5n-qu1fVDxC/view?usp=sharing",
    planLink:
      "https://drive.google.com/file/d/1v9Yb5bQXMzGnDxs1QlHCSlk05OG6GBoO/view?usp=sharing",
    nocoDb: "Suwankhuha",
    sheetId_1y: "1XQvFG7nYAxjhie6jIvkEE3_p2If8CUga",
    sheetName_1y: "แผนพัฒนาท้องถิ่น 66-70",
    sheetId_1y_5: "14wpljGB5w-x_FoCkuRtVcIOnYN1jDsll",
    sheetName_1y_5: "2569",
    date: "12 ตุลาคม 2564",
    acion_date: "15 ตุลาคม 2568",
  },
  site3: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
    link: "https://site3.kpi-local.com",
    planLink: "https://site3.kpi-local.com/plan",
    nocoDb: "Site3",
    sheetId_1y: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y: "แผนดำเนินงาน",
    sheetId_1y_5: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y_5: "แผนดำเนินงาน",
    date: "12 ตุลาคม 2564",
    acion_date: "12 ตุลาคม 2564",
  },
  site4: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
    link: "https://site4.kpi-local.com",
    planLink: "https://site4.kpi-local.com/plan",
    nocoDb: "Site4",
    sheetId_1y: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y: "แผนดำเนินงาน",
    sheetId_1y_5: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y_5: "แผนดำเนินงาน",
    date: "12 ตุลาคม 2564",
    acion_date: "12 ตุลาคม 2564",
  },
  site5: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาล________ จังหวัด________",
    subtext: "คุณอยากเห็นเทศบาล________ พัฒนาในเรื่องไหน ?",
    link: "https://site5.kpi-local.com",
    planLink: "https://site5.kpi-local.com/plan",
    nocoDb: "Site5",
    sheetId_1y: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y: "แผนดำเนินงาน",
    sheetId_1y_5: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y_5: "แผนดำเนินงาน",
    date: "12 ตุลาคม 2564",
    acion_date: "12 ตุลาคม 2564",
  },
};

const siteKey = process.env.NEXT_PUBLIC_SITE ?? "bangkhuwat";

export const currentSite: SiteConfig = sites[siteKey] ?? sites["bangkhuwat"]!;
