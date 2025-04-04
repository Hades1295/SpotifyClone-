import cookie from "js-cookie";

export const setCookie = (key: string, value: string, expiresInDays = 5) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: expiresInDays,
      path: "/",
    });
  }
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    cookie.remove(key);
  }
};

export const getCookie = (key: string, req?: any): string | null => {
  return typeof window !== "undefined"
    ? getCookieFromBrowser(key)
    : req
    ? getCookieFromServer(key, req)
    : null;
};

const getCookieFromBrowser = (key: string): string | undefined => {
  return cookie.get(key);
};

const getCookieFromServer = (key: string, req: any): string | undefined => {
  if (!req.headers?.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split("; ")
    .find((c: string) => c.startsWith(`${key}=`));
  
  return rawCookie ? rawCookie.split("=")[1] : undefined;
};
