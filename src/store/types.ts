import { IGameData, ISession } from "src/shared/types/types";

export interface IGameState {
  games: IGameData[];
}

export interface ISessionState {
  sessions: ISession[];
}
