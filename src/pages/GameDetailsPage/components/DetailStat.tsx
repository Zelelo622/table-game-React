import { ComponentType, ReactElement } from "react";

export const DetailStat = ({
  icon: Icon,
  label,
  value,
  color
}: {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string | number;
  color: string;
}): ReactElement => (
  <div className="flex items-center justify-between text-gray-300">
    <div className="flex items-center gap-2">
      <Icon size={20} className={color} />
      <span className="text-md font-medium">{label}:</span>
    </div>
    <span className="text-lg font-bold text-white">{value}</span>
  </div>
);
