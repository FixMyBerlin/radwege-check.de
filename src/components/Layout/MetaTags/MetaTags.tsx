import React from 'react';
import { Helmet } from 'react-helmet';
import SocialSharingImage from './assets/social-sharing-default.png';

// FYI, https://www.gatsbyjs.com/docs/add-seo-component/ suggest to use useStaticQuery but I don't see why, yet
const seoDefaultValues = {
  defaultTitle: 'TODO seoDefaultValues.defaultTitle',
  defaultDescription: 'TODO seoDefaultValues.defaultDescription',
  baseUrl: 'https://radwege-check.de',
};

type Props = {
  noindex?: boolean;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  article?: boolean | null;
};

export const MetaTags: React.FC<Props> = ({
  noindex = false,
  title,
  description,
  image,
  article,
}) => {
  const { defaultTitle, defaultDescription, baseUrl } = seoDefaultValues;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${baseUrl}${image || SocialSharingImage}`,
  };

  if (noindex === true) {
    return (
      <Helmet>
        <title>{seo.title}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
    );
  }

  // FYI, we do not inlcude the url meta tags since there was an issue with specs and `useLocation`.
  //  Since we do not need this field, its OK to remove it.
  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta property="og:title" content={seo.title} />
      <meta name="twitter:title" content={seo.title} />

      <meta name="description" content={seo.description} />
      <meta property="og:description" content={seo.description} />
      <meta name="twitter:description" content={seo.description} />

      <meta name="image" content={seo.image} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:image" content={seo.image} />

      {(article ? true : null) && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};
