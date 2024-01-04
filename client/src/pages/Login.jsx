import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../utils/chitchat.avif";
import Light from "../utils/light.png";
import Dark from "../utils/dark.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/ApiRoutes";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../redux/user/userSlice";
import { toggleTheme } from "../redux/theme/themeSlice";

function Login() {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);
  const toastTheme = darkMode ? "dark" : "light";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const res = await fetch(loginRoute, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.success === false) {
          toast.error(data.message, {
            theme: toastTheme,
          });
          return;
        }
        dispatch(signIn(data));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidation = () => {
    if (formData.password === undefined || formData.email === undefined) {
      toast.error("Valid email and password are required", {
        theme: toastTheme,
      });
      return false;
    }
    return true;
  };

  return (
    <div
      className={`p-3 ${darkMode ? "bg-zinc-900" : "bg-white"} min-h-screen`}
    >
      <div className="flex gap-2 justify-end">
        <img
          className="h-10 w-10 object-cover rounded-full cursor-pointer"
          onClick={() => dispatch(toggleTheme(true))}
          src={Dark}
          alt=""
        />
        <img
          className="h-10 w-10 object-cover rounded-full cursor-pointer"
          onClick={() => dispatch(toggleTheme(false))}
          src={Light}
          alt=""
        />
      </div>
      <div className="flex items-center justify-center my-7 gap-4">
        <img
          className="h-24 w-24 object-cover rounded-full"
          src={Logo}
          alt=""
        />
        <h1 className={`text-2xl ${darkMode && "text-white"}`}>Chit Chat</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg flex flex-col gap-4 mx-auto"
      >
        <input
          className="p-3 border rounded-lg"
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
        />
        <input
          className="p-3 border rounded-lg"
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button className="bg-zinc-800 text-white p-3 rounded-lg uppercase">
          Login
        </button>
        <p>
          <span className={`${darkMode ? "text-white" : "text-black"}`}>
            Don&apos;t have an account?{" "}
          </span>
          <Link
            className={` hover:underline ${
              darkMode ? "text-white" : "text-zinc-600"
            }`}
            to="/register"
          >
            Register now
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
