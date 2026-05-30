import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const githubPagesBasepath = "/Mihir-Portfolio";

const getBasepath = () => {
  if (typeof window === "undefined") return "/";

  return window.location.pathname.startsWith(`${githubPagesBasepath}/`)
    ? githubPagesBasepath
    : "/";
};

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    basepath: getBasepath(),
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
