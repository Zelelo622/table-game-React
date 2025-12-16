import { ReactElement, useEffect } from "react";
import GameCard from "../GameCard/GameCard";
import { Plus } from "lucide-react";
import SearchBar from "../SearchBar/SearchBar";
import { useDebounce } from "src/shared/hooks/useDebounce";
import Pagination from "../Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { fetchGames } from "src/store/slices/gameSlice";
import Skeleton from "../Skeleton/Skeleton";
import { useNavigate, useSearch } from "@tanstack/react-router";

const PAGE_SIZE = 12;

interface IGameListSearch {
  page: number;
  search: string;
}

const GameList = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { games, loading } = useAppSelector((state) => state.game);

  const { page: currentPage, search: searchTerm } = useSearch({
    from: "/"
  });

  const navigate = useNavigate({ from: "/" });

  const debouncedTerm = useDebounce(searchTerm, 400);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(debouncedTerm.trim().toLowerCase())
  );

  const totalPages = Math.ceil(filteredGames.length / PAGE_SIZE);
  const paginated = filteredGames.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const onSearchChange = (value: string) => {
    navigate({
      search: (old: IGameListSearch) => ({
        ...old,
        search: value,
        page: 1
      })
    });
  };

  const onPageChange = (newPage: number) => {
    navigate({
      search: (old: IGameListSearch) => ({
        ...old,
        page: newPage
      })
    });
  };

  useEffect(() => {
    if (currentPage !== 1 && debouncedTerm === searchTerm) {
      if (currentPage > totalPages && totalPages > 0) {
        navigate({
          search: (old: IGameListSearch) => ({ ...old, page: 1 }),
          replace: true
        });
      }
    }
  }, [debouncedTerm, searchTerm, currentPage, totalPages, navigate]);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Моя коллекция</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Найдено игр:{" "}
            <span className="font-medium">{filteredGames.length}</span>
          </p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          placeholder="Каркассон, алиби, страшные сказки"
        />

        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-[11px] rounded-lg transition-color shadow-lg shadow-blue-900/20 active:scale-95">
          <Plus size={20} />
          <span>Добавить игру</span>
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(PAGE_SIZE)].map((_, i) => (
            <Skeleton key={i} height="300px" rounded="lg" />
          ))}
        </div>
      ) : (
        paginated.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 min-[1800px]:grid-cols-6 gap-6">
            {paginated.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        )
      )}

      {filteredGames.length === 0 && debouncedTerm.length > 0 && (
        <div className="text-center p-12 text-gray-500 text-xl border border-dashed border-gray-700 rounded-lg">
          Игры по запросу "
          <span className="font-semibold text-white">{debouncedTerm}</span>" не
          найдены.
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChange={onPageChange}
      />
    </>
  );
};

export default GameList;
