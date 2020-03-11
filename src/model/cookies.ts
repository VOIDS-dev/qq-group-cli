import { CookieJar, Cookie } from "tough-cookie";
import FileCookieStore from "tough-cookie-file-store";

export const store = new FileCookieStore("./cookie.json");
export const jar = new CookieJar(store);

export const cleanCookies = () => {
  const tasks = [] as Promise<void>[];
  for (const [domain, paths] of Object.entries(store.idx)) {
    for (const path of Object.keys(paths)) {
      store.removeCookies(domain, path, err => {});
    }
  }
};
