import { ReactElement, useState } from "react";
import { gamesList } from "src/mocks/gamesList";
import GameCard from "../GameCard/GameCard";
import { Plus } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";
import { useDebounce } from "src/hooks/useDebounce";

const GameList = (): ReactElement => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedTerm = useDebounce(searchTerm, 400);

  const filteredGames = gamesList.games.filter((game) =>
    game.title.toLowerCase().includes(debouncedTerm.trim().toLowerCase())
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Моя коллекция</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Найдено игр: <span className="font-medium">{gamesList.total}</span>
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Каркассон, алиби, страшные сказки"
        />
        <button className="flex items-center justify-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-500 px-5 py-[11px] rounded-lg transition-color shadow-lg shadow-blue-900/20 active:scale-95">
          <Plus size={20} />
          <span>Добавить игру</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[1800px]:grid-cols-6 gap-6">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {filteredGames.length === 0 && debouncedTerm.length > 0 && (
        <div className="text-center p-12 text-gray-500 text-xl border border-dashed border-gray-700 rounded-lg">
          Игры по запросу "
          <span className="font-semibold text-white">{debouncedTerm}</span>" не
          найдены.
        </div>
      )}
    </>
  );
};

export default GameList;
