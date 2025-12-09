import { ReactElement } from "react";
import { ISkeletonProps } from "./types";

const Skeleton = ({
  width = "100%",
  height = "1rem",
  className,
  rounded = "md"
}: ISkeletonProps): ReactElement => {
  const roundedClass =
    {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full"
    }[rounded] || "rounded-md";

  return (
    <div
      className={`bg-gray-200 animate-pulse ${roundedClass} ${className}`}
      style={{ width, height }}
    />
  );
};

export default Skeleton;
