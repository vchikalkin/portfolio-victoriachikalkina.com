export interface BiographySectionContent {
  title: string;
  paragraphs: string[];
  listIntro?: string;
  items?: string[];
  closing?: string;
}

export interface BiographyContent {
  tagline: string;
  intro: string;
  sections: BiographySectionContent[];
}
