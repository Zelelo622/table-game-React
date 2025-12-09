import { ReactElement } from "react";
import { ISearchBarProps } from "./types";
import { Search } from "lucide-react";

const SearchBar = ({
  searchTerm,
  onSearchChange,
  placeholder
}: ISearchBarProps): ReactElement => {
  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-[8px] pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors 
                   placeholder:text-gray-500 text-lg"
      />

      <Search
        size={22}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default SearchBar;
