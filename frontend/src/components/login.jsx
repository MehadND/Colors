import { useState } from "react";
import { useAuth } from "./auth";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { useSelector } from "react-redux";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, { message: "Username is Required" }),
});

const Login = () => {
  const theme = useSelector((state) => state.theme.value);
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectLoginPath = location.state?.path || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [customError, setCustomError] = useState("");

  const handleLogin = () => {
    axios
      .post("http://localhost:5100/login", {
        username: user,
      })
      .then((response) => {
        console.log(response.data.success);
        if (response.data.success === true) {
          auth.login(user);
          navigate(redirectLoginPath, { replace: true });
        } else {
          setCustomError("Invalid login");
          console.log("Error: Please try again");
        }
      })
      .catch((err) => console.log(err));
  };

  const submitForm = () => {};

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
        <div className="flex flex-col gap-4">
          <form
            onSubmit={handleSubmit(submitForm)}
            className={`flex flex-col gap-4 m-4 items-center justify-center ml-auto`}
          >
            <div className="flex gap-4">
              <label>Username:</label>
              <input
                type="text"
                value={user}
                {...register("username", { required: true })}
                onChange={(e) => setUser(e.target.value)}
                className={`rounded-md bg-transparent border ${
                  theme === "Dark"
                    ? "border-white text-white"
                    : "border-black text-black"
                }`}
              />
            </div>
            {errors.username && (
              <p className="text-sm text-red-400 mt-2">
                {"* "}
                {errors.username?.message}
              </p>
            )}
            {!errors.username && customError && (
              <p className="text-sm text-red-400 mt-2">
                {"* "}
                {customError}
              </p>
            )}
            <button
              onClick={handleLogin}
              className={`w-full border px-4 py-2 bg-transparent ${
                theme === "Dark"
                  ? "text-white border-white hover:bg-white hover:text-black"
                  : "text-black border-black hover:bg-black hover:text-white"
              } rounded-lg transition-colors duration-300 `}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
