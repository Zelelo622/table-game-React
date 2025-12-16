import { ISession } from "src/shared/types/types";

export const sessionsList: ISession[] = [
  {
    id: 1,
    gameId: 1,
    date: "2024-03-10",
    players: ["Егор", "Полина"],
    winner: "Алексей",
    notes:
      "Напряженная партия! В конце буквально одного хода не хватило до победы. Механика с кубиками в этот раз сыграла против меня."
  },
  {
    id: 2,
    gameId: 2,
    date: "2024-03-12",
    players: ["Егор", "Полина"],
    notes: "Быстрая дуэль. Попробовали новую тактику через ресурсы."
  }
];
