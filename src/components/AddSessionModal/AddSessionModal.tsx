import { ReactNode, useState } from "react";
import { X, Plus, Trophy, Calendar, Gamepad2, UserPlus } from "lucide-react";
import { gamesList } from "src/mocks/gamesList";
import { ISession } from "src/shared/types/types";
import { IAddSessionModalProps } from "./types";

export const AddSessionModal = ({
  isOpen,
  onClose,
  onSave
}: IAddSessionModalProps): ReactNode => {
  const [selectedGameId, setSelectedGameId] = useState<number | "">("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState<string[]>([]);
  const [winner, setWinner] = useState<string>("");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setSelectedGameId("");
    setDate(new Date().toISOString().split("T")[0]);
    setPlayers([]);
    setWinner("");
    setNotes("");
    setPlayerName("");
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const handleAddPlayer = () => {
    if (playerName.trim() && !players.includes(playerName.trim())) {
      setPlayers([...players, playerName.trim()]);
      setPlayerName("");
    }
  };

  const handleRemovePlayer = (player: string) => {
    setPlayers(players.filter((p) => p !== player));
    if (winner === player) {
      setWinner("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGameId || players.length === 0) {
      return;
    }

    const newSession: ISession = {
      id: Date.now(),
      gameId: Number(selectedGameId),
      date,
      players,
      winner: winner || undefined,
      notes: notes || undefined
    };

    onSave(newSession);

    resetForm();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-700 overflow-hidden">
        <div className="flex justify-between items-center p-5 border-b border-gray-700 bg-gray-900/50">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Plus className="text-blue-500" /> Запись партии
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 flex flex-col gap-5 overflow-y-auto max-h-[80vh]">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Gamepad2 size={16} /> Игра
            </label>
            <select
              value={selectedGameId}
              onChange={(e) => setSelectedGameId(Number(e.target.value))}
              className="cursor-pointer bg-gray-700 text-white rounded-lg p-3 border border-gray-600 hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required>
              <option value="" disabled>
                Выберите игру...
              </option>
              {gamesList.games.map((game) => (
                <option key={game.id} value={game.id}>
                  {game.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <Calendar size={16} /> Дата
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="cursor-pointer bg-gray-700 text-white rounded-lg p-3 border border-gray-600 hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
              <UserPlus size={16} /> Участники
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddPlayer())
                }
                placeholder="Имя игрока..."
                className="cursor-pointer flex-1 bg-gray-700 text-white rounded-lg p-3 border border-gray-600 hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={handleAddPlayer}
                className="cursor-pointer bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-lg transition-colors">
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-1 min-h-[30px]">
              {players.length === 0 && (
                <span className="text-gray-600 text-sm italic">
                  Добавьте игроков...
                </span>
              )}
              {players.map((p) => (
                <div
                  key={p}
                  className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-full border border-gray-600">
                  <span className="text-sm text-gray-200">{p}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePlayer(p)}
                    className="cursor-pointer text-gray-400 hover:text-red-400">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {players.length > 0 && (
            <div className="flex flex-col gap-2 animate-in slide-in-from-top-2">
              <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                <Trophy size={16} className="text-yellow-500" /> Победитель
              </label>
              <select
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
                className="cursor-pointer bg-gray-700 text-white rounded-lg p-3 border border-gray-600 hover:ring-1 hover:ring-yellow-300 focus:ring-2 focus:ring-yellow-500 outline-none">
                <option value="">Без победителя / Ничья</option>
                {players.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-400">
              Заметки / Впечатления
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Как прошла партия?"
              className="bg-gray-700 text-white rounded-lg p-3 border border-gray-600 hover:ring-1 hover:ring-blue-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedGameId || players.length === 0}
            className="cursor-pointer mt-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95">
            Сохранить партию
          </button>
        </form>
      </div>
    </div>
  );
};
