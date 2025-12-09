import { Link } from "@tanstack/react-router";
import { ReactElement } from "react";
import { Dice5, LayoutGrid, Calendar, Heart, Dices } from "lucide-react";

const Header = (): ReactElement => {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between px-8 w-full">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-white hover:text-blue-400 transition-colors">
          <Dice5 className="text-blue-500" size={28} />
          <span>BoardGeek</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors [&.active]:text-blue-400">
            <LayoutGrid size={18} />
            <span className="hidden sm:inline">Коллекция</span>
          </Link>

          <Link
            to="/sessions"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors [&.active]:text-blue-400">
            <Calendar size={18} />
            <span className="hidden sm:inline">Партии</span>
          </Link>

          <Link
            to="/wishlist"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors [&.active]:text-blue-400">
            <Heart size={18} />
            <span className="hidden sm:inline">Хотелки</span>
          </Link>

          <Link
            to="/random-game"
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors [&.active]:text-blue-400">
            <Dices size={18} />
            <span className="hidden sm:inline">Колесо Выбора</span>
          </Link>
        </nav>

        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:bg-blue-500">
          ME
        </div>
      </div>
    </header>
  );
};

export default Header;
