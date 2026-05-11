type Props = {
  category: string;
  action: string;
  label?: string;
};

export const trackEvent = ({ category, action, label = null }: Props) => {
  if (typeof window === "undefined") return;

  // It is important to use bracket notation here!
  // Otherwise Jest tests will fail since they do not recognize our global type extension.
  window["_paq"] = window["_paq"] || [];
  window["_paq"].push(["trackEvent", category, action]);

  if (window["dev"] === true) {
    console.debug({
      MATOMO: "trackEvent",
      category,
      action,
      label,
    });
  }
};
