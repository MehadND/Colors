import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Generator from "./pages/generator";
import MyColor from "./pages/colorBackend";
import Home from "./pages/home";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme.value);
  console.log(theme);

  return (
    <div
      className={`${
        theme === "Dark" ? "bg-black text-white" : "bg-slate-200 text-black"
      }`}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-colors" element={<MyColor />} />
          <Route path="/generator" element={<Generator />} />
        </Routes>
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
