import { ReactElement } from "react";
import { IWheelVisualProps } from "./types";

export const WheelVisual = ({
  rotation,
  background,
  duration
}: IWheelVisualProps): ReactElement => {
  return (
    <div className="relative py-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <div
          className="w-0 h-0 
          border-l-[15px] border-l-transparent 
          border-r-[15px] border-r-transparent 
          border-t-[30px] border-t-white 
          drop-shadow-lg filter"
        />
      </div>

      <div
        className="w-80 h-80 sm:w-[400px] sm:h-[400px] rounded-full border-4 border-gray-700 shadow-2xl relative transition-transform ease-[cubic-bezier(0.25,0.1,0.25,1)]"
        style={{
          background: background,
          transform: `rotate(${rotation}deg)`,
          transitionDuration: `${duration}ms`
        }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-800 rounded-full border-2 border-gray-600 shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};
