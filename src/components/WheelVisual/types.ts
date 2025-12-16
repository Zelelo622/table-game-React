import { IGameData } from "src/shared/types/types";

export interface IWheelVisualProps {
  rotation: number;
  background: string;
  duration: number;
  items: Pick<IGameData, "id" | "title">[];
}
