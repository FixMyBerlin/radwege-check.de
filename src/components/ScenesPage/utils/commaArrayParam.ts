// Comma-separated list in one query value (legacy `sceneIds=a,b,c` URLs).
export const CommaArrayParam = {
  encode: (array: string[] | null | undefined): string | undefined =>
    array?.length ? array.join(",") : undefined,

  decode: (arrayStr: string | string[] | null | undefined): string[] | undefined => {
    if (arrayStr == null || arrayStr === "") return undefined;
    if (Array.isArray(arrayStr)) return arrayStr;
    return String(arrayStr)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  },
};
