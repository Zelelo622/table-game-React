import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Clock, Star, Users } from "lucide-react";
import { ReactElement, useMemo } from "react";
import { ROUTES } from "src/app/routes/routes";
import { gamesList } from "src/mocks/gamesList";
import { DetailStat } from "./components/DetailStat";

const GameDetailsPage = (): ReactElement => {
  const { gameId } = useParams({ strict: false });

  const game = useMemo(() => {
    const idToFind = Number(gameId);
    return gamesList.games.find((g) => g.id === idToFind);
  }, [gameId]);

  if (!game) {
    return (
      <div className="p-12 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Игра не найдена</h1>
        <Link
          to={ROUTES.HOME}
          className="mt-6 flex items-center justify-center gap-2 mx-auto text-blue-400 cursor-pointer hover:text-blue-300 transition-colors">
          <ArrowLeft size={20} /> Вернуться
        </Link>
      </div>
    );
  }

  return (
    <div className="h-auto mt-5">
      <Link
        to={ROUTES.HOME}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-6 text-lg">
        <ArrowLeft size={20} />
        Назад в коллекцию
      </Link>

      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-auto object-cover rounded-lg mb-6"
            />

            <h2 className="text-2xl font-bold text-white mb-4">{game.title}</h2>

            <div className="flex flex-col gap-3 p-4 bg-gray-900 rounded-lg">
              <DetailStat
                icon={Star}
                label="Рейтинг"
                value={`${game.rating} / 10`}
                color="text-yellow-400"
              />
              <DetailStat
                icon={Users}
                label="Игроки"
                value={game.players}
                color="text-blue-400"
              />
              <DetailStat
                icon={Clock}
                label="Время партии"
                value={game.time}
                color="text-green-400"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-300 mb-4 border-b border-gray-700 pb-2">
              Обзор и Геймплей
            </h3>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap mb-8">
              {game.description}
            </p>

            <div className="space-y-4">
              <button className="cursor-pointer w-full text-center bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors">
                Записать партию
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
