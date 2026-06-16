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
    link: "https://docs.google.com/spreadsheets/d/1CwI9EYojVAuyVRI90rqouIyLvbqRReFg/edit?usp=sharing&ouid=109634311828671480416&rtpof=true&sd=true",
    planLink:
      "https://docs.google.com/spreadsheets/d/18l2qYZZGRh69MuHT32Dl2X62NxTKUWLp/edit?usp=sharing&ouid=109634311828671480416&rtpof=true&sd=true",
    nocoDb: "Bangkhuwat",
    sheetId_1y: "1n-z7KJ1L1pvFNopvr5WgqezWFiPRnzOE",
    sheetName_1y: "แผนพัฒนาท้องถิ่น 66-70",
    sheetId_1y_5: "1TLMrqReysWk2pPrBQrq9Zoz6dTNt11cM",
    sheetName_1y_5: "2569",
    date: "12 ตุลาคม 2564",
    acion_date: "ตุลาคม 2564",
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
  cherngtalay: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "อบต.เชิงทะเล จ.ภูเก็ต",
    subtext: "อบต.เชิงทะเล",
    link: "https://drive.google.com/file/d/1yYeuWEvbXqeUqy2TiCC6-h8pREuL7OH4/view?usp=sharing",
    planLink: "",
    nocoDb: "Cherngtalay",
    sheetId_1y: "1UD9yZUSn0T0LmnxalpibFxLlHEFeFXYI",
    sheetName_1y: "แผนพัฒนาท้องถิ่น 66-70_เชิงทะเล",
    sheetId_1y_5: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y_5: "แผนดำเนินงาน",
    date: "12 ตุลาคม 2564",
    acion_date: "15 ตุลาคม 2564",
  },
  lamphun: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "อบจ.ลำพูน จ.ลำพูน",
    subtext: "อบจ.ลำพูน",
    link: "https://drive.google.com/file/d/1MHbUm6z3F1EM63isbam_cVumHFhcc6KW/view?usp=sharing",
    planLink:
      "https://drive.google.com/file/d/1iCTUg8Sg7oF2IHTs2bK1pdK8_E0m2Mj-/view?usp=sharing",
    nocoDb: "Lamphun",
    sheetId_1y: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y: "แผนดำเนินงาน",
    sheetId_1y_5: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y_5: "แผนดำเนินงาน",
    date: "ตุลาคม 2564",
    acion_date: "15 ตุลาคม 2564",
  },
  bangrakphatthana: {
    name: "ลานชุมชน คนปั้นเมือง",
    subtitle: "เทศบาลบางรักพัฒนา จ.นนทบุรี",
    subtext: "เทศบาลบางรักพัฒนา",
    link: "https://drive.google.com/file/d/108dDiUCQOM32KBVhZBLbUnL6aOxOZ5PC/view?usp=sharing",
    planLink: "",
    nocoDb: "Bangrakphatthana",
    sheetId_1y: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y: "แผนดำเนินงาน",
    sheetId_1y_5: "1WHEkWHXMt2ynDs_lZ_1eziYH9bNmQ4xzldTIvC65FR4",
    sheetName_1y_5: "แผนดำเนินงาน",
    date: "20 ตุลาคม 2564",
    acion_date: "ตุลาคม 2564",
  },
};

const siteKey = process.env.NEXT_PUBLIC_SITE ?? "bangkhuwat";

export const currentSite: SiteConfig = sites[siteKey] ?? sites["bangkhuwat"]!;
