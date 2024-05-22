import axios from "axios";
import { useSelector } from "react-redux";

const Display = ({ colors, setColors }) => {
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

  const enabled = useSelector((state) => state.enabled.value);

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
                  ❌
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
