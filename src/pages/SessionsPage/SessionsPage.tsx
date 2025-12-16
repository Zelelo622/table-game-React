import { ReactElement, useMemo, useState } from "react";
import { SessionCard } from "src/components/SessionCard/SessionCard";
import { AddSessionModal } from "src/components/AddSessionModal/AddSessionModal";
import { ClipboardList, Plus } from "lucide-react";
import { ISession } from "src/shared/types/types";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { addSession } from "src/store/slices/sessionSlice";

const SessionsPage = (): ReactElement => {
  const sessions = useAppSelector((state) => state.session.sessions);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sortedSessions = useMemo(
    () =>
      [...sessions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [sessions]
  );

  const handleSaveSession = (newSession: ISession) => {
    dispatch(addSession(newSession));
    setIsModalOpen(false);
  };

  return (
    <div className="py-8 px-4 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <ClipboardList className="text-blue-500" size={32} />
            История партий
          </h1>
          <p className="text-gray-400 mt-1">Всего сыграно: {sessions.length}</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold transition-transform active:scale-95 shadow-lg">
          <Plus size={20} />
          <span className="hidden sm:inline">Записать партию</span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        {sortedSessions.length > 0 ? (
          sortedSessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">История пуста</p>
            <p className="text-sm mt-2">
              Сыграйте в первую игру и запишите результат!
            </p>
          </div>
        )}
      </div>

      <AddSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSession}
      />
    </div>
  );
};

export default SessionsPage;
