import { ReactElement } from "react";

const Spinner = (): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-10 gap-4">
      <span className="text-lg font-medium text-gray-600 animate-pulse">
        Loading...
      </span>

      <div className="w-48 h-1.5 rounded-full bg-gray-200 overflow-hidden">
        <div className="h-full w-1/3 bg-blue-500 animate-[progress_1.2s_ease-in-out_infinite]"></div>
      </div>

      <style>
        {`
          @keyframes progress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(50%); }
            100% { transform: translateX(200%); }
          }
        `}
      </style>
    </div>
  );
};

export default Spinner;
