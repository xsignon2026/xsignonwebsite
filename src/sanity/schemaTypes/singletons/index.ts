import { home } from "./home";
import { navigation } from "./navigation";
import { siteSettings } from "./siteSettings";

// S-13 / T-090: documents that exist exactly once. Their ids are fixed so there can never be a second copy.
export const singletonTypes = [home, siteSettings, navigation];
export const singletonNames: string[] = singletonTypes.map((type) => type.name);
