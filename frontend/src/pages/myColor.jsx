import { useEffect, useState } from "react";
import axios from "axios";
import Create from "../components/createColor";
import Display from "../components/displayColor";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";
import { useAuth } from "../components/auth";
import { useNavigate } from "react-router-dom";
import Edit from "../components/editColor";
import EditModeToggle from "../components/editToggle";

function MyColorAPI() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useSelector((state) => state.theme.value);
  const enabled = useSelector((state) => state.enabled.value);

  const auth = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = () => {
    auth.logout();
    navigate("/", { replace: false });
  };

  return (
    <div
      className={`flex flex-col w-full gap-4 ${
        theme === "Dark" ? "bg-black/50 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <Navbar />
      <div className="flex items-center justify-center gap-4 mb-12">
        <h1 className="text-4xl font-bold">Welcome {auth.user}</h1>
        <button
          onClick={handleLogout}
          className={`border px-4 py-2 bg-transparent ${
            theme === "Dark"
              ? "text-white border-white hover:bg-white hover:text-black"
              : "text-black border-black hover:bg-black hover:text-white"
          } rounded-lg transition-colors duration-300 `}
        >
          Logout
        </button>
      </div>
      <div
        className={`${
          theme === "Dark"
            ? "bg-black/50 text-white"
            : "bg-slate-200 text-black"
        }`}
      >
        {!enabled && <Create setColors={setColors} />}
        {enabled && <Edit setColors={setColors} />}
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
            <EditModeToggle />
            <Display colors={colors} setColors={setColors} />
          </>
        )}
      </div>
    </div>
  );
}

export default MyColorAPI;
