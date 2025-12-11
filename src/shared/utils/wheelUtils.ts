export const WHEEL_COLORS = [
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#84CC16",
  "#10B981",
  "#06B6D4",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#D946EF",
  "#F43F5E"
];

export interface IWheelSegment {
  title: string;
  color: string;
  rotation: number;
}

export const getWheelBackground = (totalItems: number) => {
  if (totalItems === 0) return "gray";

  const sliceSize = 360 / totalItems;
  let gradient = "conic-gradient(";

  for (let i = 0; i < totalItems; i++) {
    const color = WHEEL_COLORS[i % WHEEL_COLORS.length];
    gradient += `${color} ${i * sliceSize}deg ${(i + 1) * sliceSize}deg, `;
  }

  return gradient.slice(0, -2) + ")";
};

export const getWinnerIndex = (rotation: number, totalItems: number) => {
  const sliceSize = 360 / totalItems;
  const actualDeg = rotation % 360;

  let index = Math.floor((360 - actualDeg) / sliceSize);

  if (index >= totalItems) index = 0;

  return index;
};
