export type SeoAlternate = { hreflang: string; href: string };

export type SeoHeadInput = {
  title?: string;
  description?: string;
  sharingTitle?: string;
  imagePath?: string;
  imageUrl?: string;
  article?: boolean;
  noindex?: boolean;
  imageSize?: { width: number; height: number };
  alternates?: SeoAlternate[];
};
