import { IGameData, ISession } from "src/shared/types/types";

export interface IGameState {
  games: IGameData[];
  total: number;
  loading: boolean;
}

export interface ISessionState {
  sessions: ISession[];
}
