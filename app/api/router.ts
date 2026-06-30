import { authRouter } from "./auth-router";
import { contactRouter } from "./routers/contact";
import { newsletterRouter } from "./routers/newsletter";
import { newsRouter } from "./routers/news";
import { teamRouter } from "./routers/team";
import { galleryRouter } from "./routers/gallery";
import { portfolioRouter } from "./routers/portfolio";
import { cropRouter } from "./routers/crop";
import { inventoryRouter } from "./routers/inventory";
import { weatherRouter } from "./routers/weather";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  contact: contactRouter,
  newsletter: newsletterRouter,
  news: newsRouter,
  team: teamRouter,
  gallery: galleryRouter,
  portfolio: portfolioRouter,
  crop: cropRouter,
  inventory: inventoryRouter,
  weather: weatherRouter,
});

export type AppRouter = typeof appRouter;
