import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setColor,
  setHex,
} from "../redux/features/color_generator/colorGeneratorSlice";

const Generator = () => {
  const [randomColorList, setRandomColorList] = useState([]);
  // const [color, setColor] = useState("");
  // const [hex, setHex] = useState("");

  const fetchAllColors = () => {
    axios
      .get("https://www.csscolorsapi.com/api/colors/")
      .then((response) => setRandomColorList(response.data.colors))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllColors();
  }, []);

  const theme = useSelector((state) => state.theme.value);
  const color = useSelector((state) => state.random.color);
  const hex = useSelector((state) => state.random.hex);

  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div
        className={`flex flex-col w-full h-screen items-center justify-center gap-6 ${
          theme === "Dark"
            ? "bg-black/50 text-white"
            : "bg-slate-200 text-black"
        }`}
      >
        {randomColorList && (
          <div
            style={{ color: `${color}` }}
            className="text-3xl font-extrabold"
          >
            {color && hex && (
              <p className="flex gap-4 items-center justify-center">
                <span>{color}</span>
                <span>{hex}</span>
              </p>
            )}
          </div>
        )}
        <button
          onClick={() => {
            let random = Math.floor(Math.random() * randomColorList.length);
            dispatch(setColor(randomColorList[random].name));
            dispatch(setHex(randomColorList[random].hex));
            // setColor(randomColorList[random].name);
            // setHex(randomColorList[random].hex);
          }}
          className={`border px-4 py-2 bg-transparent ${
            theme === "Dark"
              ? "text-white border-white hover:bg-white hover:text-black"
              : "text-black border-black hover:bg-black hover:text-white"
          } rounded-lg transition-colors duration-300 `}
        >
          Try Now
        </button>
      </div>
    </>
  );
};

export default Generator;
