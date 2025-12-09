export type RoundedType = "none" | "sm" | "md" | "lg" | "full";

export interface ISkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  rounded?: RoundedType;
}
