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
    <div className="h-screen flex flex-col bg-gray-900 overflow-hidden">
      <Header />

      <main className="flex-1 w-full p-8 text-white overflow-y-auto font-sans">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
