import { ReactElement, useMemo } from "react";
import { Calendar, Users, Trophy, Quote } from "lucide-react";
import { gamesList } from "src/mocks/gamesList";
import { ISessionCardProps } from "./types";

export const SessionCard = ({ session }: ISessionCardProps): ReactElement => {
  const game = useMemo(
    () => gamesList.games.find((g) => g.id === session.gameId),
    [session.gameId]
  );

  const formattedDate = new Date(session.date).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (!game) return <></>;

  return (
    <div className="bg-gray-800 rounded-xl p-5 shadow-lg border border-gray-700 hover:border-gray-600 transition-colors flex flex-col md:flex-row gap-6">
      <div className="shrink-0">
        <div className="w-full h-48 md:w-32 md:h-32 rounded-lg overflow-hidden relative">
          <img
            src={game.image}
            alt={game.title}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        </div>
      </div>

      <div className="grow flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-700 pb-3">
          <h3 className="text-xl font-bold text-white">{game.title}</h3>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Calendar size={16} />
            {formattedDate}
          </div>
        </div>

        <div className="flex items-start gap-2 text-gray-300">
          <Users size={18} className="mt-1 text-blue-400" />
          <div className="flex flex-wrap gap-2">
            {session.players.map((player, idx) => (
              <span
                key={idx}
                className={`px-2 py-0.5 rounded text-sm font-medium ${
                  player === session.winner
                    ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                    : "bg-gray-700 text-gray-300"
                }`}>
                {player}
                {player === session.winner && (
                  <Trophy size={12} className="inline ml-1 -mt-0.5" />
                )}
              </span>
            ))}
          </div>
        </div>

        {session.notes && (
          <div className="flex gap-2 mt-1">
            <Quote size={18} className="text-gray-500 shrink-0 rotate-180" />
            <p className="text-gray-400 italic text-sm leading-relaxed">
              {session.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
