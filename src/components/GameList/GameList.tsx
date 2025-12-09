import { ReactElement } from "react";
import { gamesList } from "src/mocks/gamesList";
import GameCard from "../GameCard/GameCard";
import { Plus } from "lucide-react";

const GameList = (): ReactElement => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Моя коллекция</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Найдено игр: <span className="font-medium">{gamesList.total}</span>
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-500 px-5 py-2.5 rounded-lg transition-color shadow-lg shadow-blue-900/20 active:scale-95">
          <Plus size={20} />
          <span>Добавить игру</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[1800px]:grid-cols-6 gap-6">
        {gamesList.games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </>
  );
};

export default GameList;
