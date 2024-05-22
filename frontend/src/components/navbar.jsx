import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTheme } from "../redux/features/theme/themeSlice";
import { Moon, Sun } from "lucide-react";

const Navbar = () => {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  return (
    <nav
      className={`flex flex-row w-full items-center justify-evenly p-4 font-bold text-xl mb-12 ${
        theme === "Dark"
          ? "bg-black/50 text-white"
          : "bg-slate-200 text-black/600"
      }`}
    >
      <Link
        to="/"
        className="underline underline-offset-8 decoration-transparent transition-all duration-300 hover:decoration-white"
      >
        Home
      </Link>

      <Link
        to="/my-colors"
        className="underline underline-offset-8 decoration-transparent transition-all duration-300 hover:decoration-white"
      >
        My Colors API
      </Link>

      <Link
        to="/generator"
        className="underline underline-offset-8 decoration-transparent transition-all duration-300 hover:decoration-white"
      >
        Color Generator
      </Link>

      {theme === "Dark" ? (
        <Moon
          className="hover:cursor-pointer"
          onClick={() =>
            dispatch(setTheme(theme === "Dark" ? "Light" : "Dark"))
          }
        />
      ) : (
        <Sun
          className="hover:cursor-pointer"
          onClick={() =>
            dispatch(setTheme(theme === "Dark" ? "Light" : "Dark"))
          }
        />
      )}
    </nav>
  );
};

export default Navbar;
