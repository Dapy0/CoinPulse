import { MainLayout } from "@/components/MainLayout";
import { CoinDetailPage } from "@/pages/CoinDetailPage";
import { MarketPage } from "@/pages/MarketPage";
import { PortfolioPage } from "@/pages/PortfolioPage";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";

type CoinSearch = {
  page: number;
};
const rootRoute = createRootRoute({
  component: MainLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MarketPage,
  validateSearch: (search: Record<string, unknown>): CoinSearch => {
    return {
      page: Number(search?.page == 0 ? 1 : (search?.page ?? 1)),
    };
  },
});
const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: PortfolioPage,
});
const coinDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/coin/$coinId",
  component: CoinDetailPage,
});

const routeTree = rootRoute.addChildren([indexRoute, portfolioRoute, coinDetailRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
export { router };
