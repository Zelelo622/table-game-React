import { lazy, Suspense } from "react";
import Spinner from "src/components/Spinner/Spinner";
import Layout from "../provider/Layout";
import {
  createRootRoute,
  createRoute,
  createRouter
} from "@tanstack/react-router";
import { ROUTES } from "./routes";

const HomePage = lazy(() => import("src/pages/Home/HomePage"));
const GameDetailsPage = lazy(
  () => import("src/pages/GameDetailsPage/GameDetailsPage")
);
const SessionPage = lazy(() => import("src/pages/SessionsPage/SessionsPage"));
const SpinnerPage = lazy(
  () => import("src/pages/RandomGamePage/RandomGamePage")
);
const WishlistPage = lazy(() => import("src/pages/WishlistPage/WishlistPage"));
const NotFoundPage = lazy(() => import("src/pages/NotFoundPage/NotFoundPage"));

export const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: () => (
    <Suspense fallback={<Spinner />}>
      <NotFoundPage />
    </Suspense>
  )
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.HOME,
  component: () => (
    <Suspense fallback={<Spinner />}>
      <HomePage />
    </Suspense>
  )
});

const gameDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.GAME_DETAILS,
  component: () => (
    <Suspense fallback={<Spinner />}>
      <GameDetailsPage />
    </Suspense>
  )
});

const sessionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.SESSIONS,
  component: () => (
    <Suspense fallback={<Spinner />}>
      <SessionPage />
    </Suspense>
  )
});

const wishlistRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.WISHLIST,
  component: () => (
    <Suspense fallback={<Spinner />}>
      <WishlistPage />
    </Suspense>
  )
});

const randomGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.RANDOM_GAME,
  component: () => (
    <Suspense fallback={<Spinner />}>
      <SpinnerPage />
    </Suspense>
  )
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  sessionsRoute,
  wishlistRoute,
  randomGameRoute,
  gameDetailRoute
]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true // <-- Включаем автоматическое управление скроллом
});
