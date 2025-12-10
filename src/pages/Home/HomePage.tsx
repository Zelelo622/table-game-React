import type { ReactElement } from "react";
import GameList from "src/components/GameList/GameList";

const HomePage = (): ReactElement => {
  return (
    <div className="h-auto flex flex-col gap-6 mt-5">
      <GameList />
    </div>
  );
};

export default HomePage;
