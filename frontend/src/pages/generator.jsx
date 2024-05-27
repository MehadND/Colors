import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setColor,
  setHex,
} from "../redux/features/color_generator/colorGeneratorSlice";
import { copyToClipboard } from "../redux/features/clipboard/clipboardSlice";
import { CircleCheckBig, Copy, Dices } from "lucide-react";

const RandomColorGenerator = () => {
  const [randomColorList, setRandomColorList] = useState(null);
  const theme = useSelector((state) => state.theme.value);
  const color = useSelector((state) => state.random.color);
  const hex = useSelector((state) => state.random.hex);
  const [isCopied, setIsCopied] = useState(false);

  const dispatch = useDispatch();

  const fetchAllColors = () => {
    axios
      .get("https://www.csscolorsapi.com/api/colors/")
      .then((response) => setRandomColorList(response.data.colors))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAllColors();
  }, []);

  let copy = {
    colorCopy: color,
    hexCopy: hex,
  };

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
            className="flex items-center gap-4"
          >
            {color && hex && (
              <>
                <p className="flex gap-4 items-center justify-center text-3xl font-extrabold ">
                  <span>{color}</span>
                  <span>{hex}</span>
                </p>
                {!isCopied && (
                  <Copy
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(copyToClipboard(copy));
                      setIsCopied(true);
                    }}
                  />
                )}
                {isCopied && <CircleCheckBig />}
              </>
            )}
          </div>
        )}

        <button
          onClick={() => {
            let random = Math.floor(Math.random() * randomColorList.length);
            dispatch(setColor(randomColorList[random].name));
            dispatch(setHex(randomColorList[random].hex));
            setIsCopied(false);
          }}
          className={`group flex items-center gap-4 border px-4 py-2 bg-transparent ${
            theme === "Dark"
              ? "text-white border-white "
              : "text-black border-black "
          } rounded-lg transition-colors duration-300 `}
        >
          <span className="transition-all duration-100 scale-100 group-hover:-scale-100">
            <Dices />
          </span>
          <span>Generate</span>
        </button>
      </div>
    </>
  );
};

export default RandomColorGenerator;
