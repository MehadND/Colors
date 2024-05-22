import { useEffect, useState } from "react";
import axios from "axios";
import Create from "../components/createColor";
import Display from "../components/displayColor";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import DeleteToggle from "../components/deleteToggle";

function MyColor() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchColors = async () => {
    axios
      .get("http://localhost:5100/api/colors/")
      .then((response) =>
        // handle success
        setColors(response.data)
      )
      .catch((error) =>
        // handle error
        console.log(error)
      );
  };

  useEffect(() => {
    setTimeout(() => {
      fetchColors();
      setLoading(false);
    }, 100);
  }, []);

  const theme = useSelector((state) => state.theme.value);

  return (
    <div
      className={`flex flex-col w-full ${
        theme === "Dark" ? "bg-black/50 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <Navbar />
      <div
        className={`${
          theme === "Dark"
            ? "bg-black/50 text-white"
            : "bg-slate-200 text-black"
        }`}
      >
        <Create setColors={setColors} />
      </div>

      <div
        className={`${
          theme === "Dark"
            ? "bg-black/50 text-white"
            : "bg-slate-200 text-black"
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center w-full">
            <span className="loader"></span>
          </div>
        ) : (
          <>
            <DeleteToggle />
            <Display colors={colors} setColors={setColors} />
          </>
        )}
      </div>
    </div>
  );
}

export default MyColor;
