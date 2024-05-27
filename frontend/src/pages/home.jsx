import { useSelector } from "react-redux";
import Navbar from "../components/navbar";

const HomePage = () => {
  const theme = useSelector((state) => state.theme.value);

  return (
    <>
      <Navbar />
      <div
        className={`grid place-items-center w-full h-screen ${
          theme === "Dark"
            ? "bg-black/50 text-white"
            : "bg-slate-200 text-black"
        }`}
      >
        <h1 className="text-4xl font-extrabold tracking-wider capitalize">
          Welcome
        </h1>
        <p className="text-lg underline underline-offset-8">
          Project By: Mehad Nadeem
        </p>
      </div>
    </>
  );
};

export default HomePage;
