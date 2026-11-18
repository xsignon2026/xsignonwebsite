import { about } from "./about";
import { home } from "./home";
import { insightsPage } from "./insightsPage";
import { navigation } from "./navigation";
import { productsPage } from "./productsPage";
import { siteSettings } from "./siteSettings";

// S-13 / T-090: documents that exist exactly once. Their ids are fixed so there can never be a second copy.
export const singletonTypes = [home, about, productsPage, insightsPage, siteSettings, navigation];
export const singletonNames: string[] = singletonTypes.map((type) => type.name);
