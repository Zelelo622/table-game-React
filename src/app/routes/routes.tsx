import { lazy, Suspense } from "react";
import Spinner from "src/components/Spinner/Spinner";
import Layout from "../provider/Layout";
import { createRootRoute, createRoute, createRouter } from "@tanstack/react-router";

const HomePage = lazy(() => import("src/pages/Home/HomePage"));
const NotFoundPage = lazy(() => import("src/pages/NotFoundPage/NotFoundPage"));

export const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => (
    <Suspense fallback={<Spinner />}>
      <NotFoundPage />
    </Suspense>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<Spinner />}>
      <HomePage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([homeRoute]);

export const router = createRouter({ routeTree });
