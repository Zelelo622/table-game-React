import { Outlet, useMatches } from "@tanstack/react-router";
import { ReactElement, useMemo } from "react";
import Header from "src/components/Header/Header";

const Layout = (): ReactElement => {
  const matches = useMatches();

  const isNotFound = useMemo(
    () => matches.some((match) => match.globalNotFound),
    [matches]
  );

  if (isNotFound) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Header />

      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
