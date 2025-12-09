import { Clock, Star, Users } from "lucide-react";
import { ReactElement } from "react";
import { IGameData } from "src/types/types";

const GameCard = ({
  game
}: {
  game: Omit<IGameData, "description">;
}): ReactElement => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-700 group cursor-pointer flex flex-col">
      <div className="relative h-60 overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-yellow-500 text-gray-900 font-bold px-2 py-1 rounded-md flex items-center gap-1 text-sm shadow-md">
          <Star size={14} fill="currentColor" />
          {game.rating}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-white mb-1 truncate">
          {game.title}
        </h3>

        <div className="flex gap-2 mb-4 flex-wrap">
          {!!game.tags &&
            game.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="text-xs text-gray-400 bg-gray-900 px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-gray-700 pt-4">
          <div className="flex flex-col items-center text-gray-300">
            <Users size={18} className="text-blue-400 mb-1" />
            <span className="text-xs font-medium">{game.players}</span>
          </div>
          <div className="flex flex-col items-center text-gray-300">
            <Clock size={18} className="text-green-400 mb-1" />
            <span className="text-xs font-medium">{game.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
