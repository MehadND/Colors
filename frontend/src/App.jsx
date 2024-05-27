import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Generator from "./pages/generator";
import MyColorAPI from "./pages/myColor";
import Home from "./pages/home";
import { useSelector } from "react-redux";
import { AuthProvider } from "./components/auth";
import Login from "./components/login";
import RequireAuth from "./components/requireAuth";

function App() {
  const theme = useSelector((state) => state.theme.value);
  console.log(theme);

  return (
    <div
      className={`${
        theme === "Dark" ? "bg-black text-white" : "bg-slate-200 text-black"
      }`}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/my-colors"
              element={
                <RequireAuth>
                  <MyColorAPI />
                </RequireAuth>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/generator" element={<Generator />} />
          </Routes>
        </BrowserRouter>
        <Outlet />
      </AuthProvider>
    </div>
  );
}

export default App;
