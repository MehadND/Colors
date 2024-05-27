import axios from "axios";
import { Copy, XSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { copyToClipboard } from "../redux/features/clipboard/clipboardSlice";

const Display = ({ colors, setColors }) => {
  const enabled = useSelector((state) => state.enabled.value);
  const dispatch = useDispatch();

  const deleteColor = async (colorID) => {
    axios
      .delete(`http://localhost:5100/api/colors/${colorID}`)
      .then((response) =>
        // handle success
        setColors(response.data)
      )
      .catch((error) =>
        // handle error
        console.log(error)
      );
  };

  return (
    <>
      {enabled && (
        <div id="result" className="place-items-center w-full">
          {colors.map((color, index) => {
            return (
              <p
                key={index}
                className={`rounded-md flex flex-col w-48 h-24 px-8 py-6 m-4 items-center justify-center place-content-center place-items-center 
                bg-transparent scale-90 transition-all duration-300 hover:scale-100`}
                style={{
                  border: `8px ridge #${color.value}`,
                }}
              >
                <span>{color.color}</span>
                <span>{color.value}</span>

                <button
                  className="absolute -right-2 top-0 w-0 h-0"
                  onClick={() => deleteColor(color.id)}
                >
                  <XSquare />
                </button>
                <button
                  className="absolute -right-2 top-8 w-0 h-0"
                  // onClick={() => deleteColor(color.id)}
                  onClick={() =>
                    dispatch(
                      copyToClipboard({
                        idCopy: color.id,
                        colorCopy: color.color,
                        hexCopy: color.value,
                      })
                    )
                  }
                >
                  <Copy />
                </button>
              </p>
            );
          })}
        </div>
      )}
      {!enabled && (
        <div id="result" className="place-items-center w-full">
          {colors.map((color, index) => {
            return (
              <p
                key={index}
                className={`rounded-md flex flex-col w-48 h-24 px-8 py-6 m-4 items-center justify-center place-content-center place-items-center 
                  bg-transparent scale-90 transition-all duration-300 hover:scale-100`}
                style={{
                  border: `8px ridge #${color.value}`,
                }}
              >
                <span>{color.color}</span>
                <span>{color.value}</span>
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Display;
