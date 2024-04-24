export function validatePath(str: string) {
  try {
    new URL(str);
  } catch (err) {
    return true;
  }
  const whiteListedOrigins =
    process.env["WHITE_LISTED_DOMAINS"]?.split(",")?.map((str) => str.trim()) ||
    [];

  const url = new URL(str);
  const origin = url.origin;
  if (whiteListedOrigins.includes(origin)) {
    return true;
  }
  return false;
}

export function resolvePath(path: string, defaultPath: string = "/"): URL {
  try {
    const url = new URL(path);
    // Valid url
    return url;
  } catch (err) {
    // A path
    const origin =
      typeof window === "undefined"
        ? process.env.NEXT_PUBLIC_BASE_URL
        : window.location.origin;
    try {
      const url = new URL(path, origin);
      return url;
    } catch (err) {
      const url = new URL(defaultPath, origin);
      return url;
    }
  }
}
