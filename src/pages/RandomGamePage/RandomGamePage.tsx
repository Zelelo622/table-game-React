import { ReactElement, useState, useMemo, useEffect } from "react";
import { Dices, Sparkles } from "lucide-react";
import GameCard from "src/components/GameCard/GameCard";
import { WheelVisual } from "src/components/WheelVisual/WheelVisual";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { fetchGames } from "src/store/slices/gameSlice";
import {
  getWheelBackground,
  getWinnerIndex
} from "src/shared/utils/wheelUtils";
import { IGameData } from "src/shared/types/types";

const SPIN_DURATION_MS = 4000;

const RandomGamePage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { games, loading } = useAppSelector((state) => state.game);

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<IGameData | null>(null);

  useEffect(() => {
    if (games.length === 0) {
      dispatch(fetchGames());
    }
  }, [dispatch, games.length]);

  const wheelBackground = useMemo(
    () => getWheelBackground(games.length),
    [games.length]
  );

  const handleSpin = () => {
    if (isSpinning || games.length === 0) return;

    setIsSpinning(true);
    setWinner(null);

    const sliceSize = 360 / games.length;
    const randomSector = Math.floor(Math.random() * games.length);
    const randomOffset = Math.random() * (sliceSize * 0.8) + sliceSize * 0.1;

    const targetRotation =
      rotation +
      360 * 5 +
      (360 - (rotation % 360)) +
      randomSector * sliceSize +
      randomOffset;

    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const winnerIndex = getWinnerIndex(targetRotation, games.length);
      setWinner(games[winnerIndex]);
    }, SPIN_DURATION_MS);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white flex justify-center gap-3 mb-2">
          <Dices className="text-blue-500" size={32} />
          Колесо Выбора
        </h1>
        <p className="text-gray-400">Игр в рулетке: {games.length}</p>
      </div>

      {loading && <p className="text-gray-400 mt-2">Загрузка игр...</p>}

      {!loading && games.length > 0 && (
        <>
          <WheelVisual
            rotation={rotation}
            background={wheelBackground}
            duration={SPIN_DURATION_MS}
            items={games}
            showLabels={games.length <= 10}
          />

          <button
            onClick={handleSpin}
            disabled={isSpinning || games.length === 0}
            className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95">
            {isSpinning ? (
              "Крутим..."
            ) : (
              <>
                <Sparkles size={20} /> Испытать удачу
              </>
            )}
          </button>
        </>
      )}

      {winner && !isSpinning && (
        <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Выпало: {winner.title}
          </h2>
          <div className="hover:scale-105 transition-transform duration-300 inline-block text-left">
            <GameCard game={winner} />
          </div>
        </div>
      )}

      {!loading && games.length === 0 && (
        <p className="text-gray-400 mt-4">Список игр пуст.</p>
      )}
    </div>
  );
};

export default RandomGamePage;
