import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../utils/chitchat.avif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/ApiRoutes";
import { useSelector } from "react-redux";
import DarkMode from "../components/DarkMode";

function Register() {
  const [formData, setFormData] = useState([]);
  const { darkMode } = useSelector((state) => state.theme);
  const toastTheme = darkMode ? "dark" : "light";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        const res = await fetch(registerRoute, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.status === true) {
          console.log(data);
        }
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data, {
          theme: toastTheme,
        });
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
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!!", {
        theme: toastTheme,
      });
      return false;
    } else if (formData.username.length <= 3) {
      toast.error("Username should be at least 4 characters long!!", {
        theme: toastTheme,
      });
      return false;
    } else if (formData.password.length <= 5) {
      toast.error("Password should be at least 6 characters long!!", {
        theme: toastTheme,
      });
      return false;
    } else if (
      !(formData.email.includes("@") && formData.email.includes("."))
    ) {
      toast.error("Invalid Email format!!", {
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
      <DarkMode />
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
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
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
        <input
          className="p-3 border rounded-lg"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
        />
        <button className="bg-zinc-800 text-white p-3 rounded-lg uppercase">
          Register
        </button>
        <p>
          <span className={`${darkMode ? "text-white" : "text-black"}`}>
            already have an account?{" "}
          </span>
          <Link
            className={` hover:underline ${
              darkMode ? "text-white" : "text-zinc-600"
            }`}
            to="/login"
          >
            Login now
          </Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
