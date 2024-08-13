export type YoastMetadata = {
  title: string;
  robots: {
    index: "noindex" | "index";
    follow: "follow";
    "max-snippet": string;
    "max-image-preview": string;
    "max-video-preview": string;
  };
  og_locale: string;
  og_type: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_site_name: string;
  article_published_time: string;
  article_modified_time: string;
  og_image: {
    width: number;
    height: number;
    url: string;
    type: string;
  }[];
  author: string;
  twitter_card: string;
  twitter_misc: {
    "Verfasst von": string;
    "Geschätzte Lesezeit": string;
  };
  schema: unknown;
};
