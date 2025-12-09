export interface IGameData {
  id: string | number;
  title: string;
  description: string;
  image: string;
  rating: number;
  players: string;
  time: string;
  tags?: string[];
}

export interface IGamesList {
  games: IGameData[];
  total: number;
  page: number;
  pageSize: number;
}
