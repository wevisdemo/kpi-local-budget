export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  ogImage: string;
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
    title: "ลานชุมชน คนปั้นเมือง เทศบาลเมืองบางคูวัด",
    description:
      "แพลตฟอร์มดิจิทัลของ ‘เทศบาลเมืองบางคูวัด’ ที่ให้ประชาชนเข้าถึง ติดตาม และส่วนร่วมในการกำหนดทิศ 'งบประมาณท้องถิ่น’ พัฒนาร่วมกันโดยสถาบันพระปกเกล้าและ WeVis",
    ogImage: "/og/og-ปทุมธานี.png",
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
    date: "ตุลาคม 2564",
    acion_date: "ตุลาคม 2568",
  },
  suwankhuha: {
    name: "ลานชุมชน คนปั้นเมือง",
    title: "ลานชุมชน คนปั้นเมือง เทศบาลตำบลสุวรรณคูหา",
    description:
      "แพลตฟอร์มดิจิทัลของ ‘เทศบาลตำบลสุวรรณคูหา’ ที่ให้ประชาชนเข้าถึง ติดตาม และส่วนร่วมในการกำหนดทิศ 'งบประมาณท้องถิ่น’ พัฒนาร่วมกันโดยสถาบันพระปกเกล้าและ WeVis",
    ogImage: "/og/og-หนองบัวลำภู.png",
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
    date: "12 ตุลาคม 2568",
    acion_date: "15 ตุลาคม 2568",
  },
  cherngtalay: {
    name: "ลานชุมชน คนปั้นเมือง",
    title: "ลานชุมชน คนปั้นเมือง อบต.เชิงทะเล",
    description:
      "แพลตฟอร์มดิจิทัลของ ‘อบต.เชิงทะเล’ ที่ให้ประชาชนเข้าถึง ติดตาม และส่วนร่วมในการกำหนดทิศ 'งบประมาณท้องถิ่น’ พัฒนาร่วมกันโดยสถาบันพระปกเกล้าและ WeVis",
    ogImage: "/og/og-ภูเก็ต.png",
    subtitle: "อบต.เชิงทะเล จ.ภูเก็ต",
    subtext: "อบต.เชิงทะเล",
    link: "https://drive.google.com/file/d/1yYeuWEvbXqeUqy2TiCC6-h8pREuL7OH4/view?usp=sharing",
    planLink: "",
    nocoDb: "Cherngtalay",
    sheetId_1y: "1UD9yZUSn0T0LmnxalpibFxLlHEFeFXYI",
    sheetName_1y: "แผนพัฒนาท้องถิ่น 66-70",
    sheetId_1y_5: "15Z0gGvmAEya6hePFWvAxKaYP1AUAcCQj",
    sheetName_1y_5: "2569",
    date: "15 ตุลาคม 2564",
    acion_date: "ตุลาคม 2568",
  },
  lamphun: {
    name: "ลานชุมชน คนปั้นเมือง",
    title: "ลานชุมชน คนปั้นเมือง อบจ.ลำพูน",
    description:
      "แพลตฟอร์มดิจิทัลของ ‘อบจ.ลำพูน’ ที่ให้ประชาชนเข้าถึง ติดตาม และส่วนร่วมในการกำหนดทิศ 'งบประมาณท้องถิ่น’ พัฒนาร่วมกันโดยสถาบันพระปกเกล้าและ WeVis",
    ogImage: "/og/og-ลำพูน.png",
    subtitle: "อบจ.ลำพูน จ.ลำพูน",
    subtext: "อบจ.ลำพูน",
    link: "https://drive.google.com/file/d/1MHbUm6z3F1EM63isbam_cVumHFhcc6KW/view?usp=sharing",
    planLink:
      "https://drive.google.com/file/d/1iCTUg8Sg7oF2IHTs2bK1pdK8_E0m2Mj-/view?usp=sharing",
    nocoDb: "Lamphun",
    sheetId_1y: "1oXhTTkxYhLt9eaE4aFtqgRuNgQqCBkzw",
    sheetName_1y: "แผนพัฒนาท้องถิ่น 66-70",
    sheetId_1y_5: "1BHjS8UWpE_Z5zd0P0625llEn41Iw75Ey",
    sheetName_1y_5: "2569",
    date: "ตุลาคม 2568",
    acion_date: "15 ตุลาคม 2568",
  },
  bangrakphatthana: {
    name: "ลานชุมชน คนปั้นเมือง",
    title: "ลานชุมชน คนปั้นเมือง เทศบาลเมืองบางรักพัฒนา",
    description:
      "แพลตฟอร์มดิจิทัลของ ‘เทศบาลเมืองบางรักพัฒนา’ ที่ให้ประชาชนเข้าถึง ติดตาม และส่วนร่วมในการกำหนดทิศ 'งบประมาณท้องถิ่น’ พัฒนาร่วมกันโดยสถาบันพระปกเกล้าและ WeVis",
    ogImage: "/og/og-นนทบุรี.png",
    subtitle: "เทศบาลบางรักพัฒนา จ.นนทบุรี",
    subtext: "เทศบาลบางรักพัฒนา",
    link: "https://drive.google.com/file/d/108dDiUCQOM32KBVhZBLbUnL6aOxOZ5PC/view?usp=sharing",
    planLink: "",
    nocoDb: "Bangrakphatthana",
    sheetId_1y: "1kYZjgEAOQPm2lnN0AKsB6yfxbH0i_VOw",
    sheetName_1y: "แผนพัฒนาท้องถิ่น 66-70",
    sheetId_1y_5: "133H1i8jgn2xuSnliSksNiEvkFGbKFDQ7",
    sheetName_1y_5: "2569",
    date: "20 ตุลาคม 2568",
    acion_date: "ตุลาคม 2568",
  },
};

const siteKey = process.env.NEXT_PUBLIC_SITE ?? "bangkhuwat";

export const currentSite: SiteConfig = sites[siteKey] ?? sites["bangkhuwat"]!;
