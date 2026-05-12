import React, { useLayoutEffect } from "react";
import { canonicalOrigin } from "~/components/utils/domain/canonicalOrigin.const";

export type DocumentMetaSyncProps = {
  title: string;
  description?: string;
  sharingTitle?: string;
  /** Absolute URL for Open Graph / Twitter image */
  imageUrl?: string;
  /** When true, emit <meta name="robots" content="noindex" /> (deploy-preview noindex is merged from the document). */
  noindex?: boolean;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(attr: "name" | "property", key: string) {
  document.head
    .querySelectorAll<HTMLMetaElement>(`meta[${attr}="${key}"]`)
    .forEach((n) => n.remove());
}

function deployLockedNoindex(): boolean {
  return document.documentElement.getAttribute("data-seo-deploy-noindex") === "true";
}

function resolveAbsoluteImage(imageUrl: string | undefined, siteOrigin: string): string {
  if (imageUrl) return imageUrl;
  return `${siteOrigin}/social-sharing/default.jpg`;
}

/**
 * Updates `<title>` and social meta tags from client state (filters, bookmarks, etc.).
 * Initial values come from `SeoHead.astro` at build time; this keeps behaviour without react-helmet.
 */
export function DocumentMetaSync({
  title,
  description,
  sharingTitle,
  imageUrl,
  noindex = false,
}: DocumentMetaSyncProps) {
  useLayoutEffect(() => {
    const siteOrigin = (() => {
      try {
        return new URL(canonicalOrigin).origin;
      } catch {
        return canonicalOrigin;
      }
    })();

    document.title = title;

    const desc = description;
    if (desc) {
      upsertMeta("name", "description", desc);
      upsertMeta("property", "og:description", desc);
      upsertMeta("name", "twitter:description", desc);
    }

    const ogTitle = sharingTitle ?? title;
    upsertMeta("property", "og:title", ogTitle);
    upsertMeta("name", "twitter:title", ogTitle);

    const img = resolveAbsoluteImage(imageUrl, siteOrigin);
    upsertMeta("name", "image", img);
    upsertMeta("property", "og:image", img);
    upsertMeta("name", "twitter:image", img);

    const locked = deployLockedNoindex();
    const robots = locked ? "noindex, nofollow" : noindex ? "noindex" : null;
    if (robots) {
      upsertMeta("name", "robots", robots);
    } else {
      removeMeta("name", "robots");
    }
  }, [title, description, sharingTitle, imageUrl, noindex]);

  return null;
}
