import type { ReactElement } from "react";
import GameList from "src/components/GameList/GameList";

const HomePage = (): ReactElement => {
  return (
    <div className="font-sans h-full flex flex-col gap-6">
      <GameList />
    </div>
  );
};

export default HomePage;
