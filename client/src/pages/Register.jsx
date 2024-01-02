import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../utils/chitchat.avif";

function Register() {
  const [formData, setFormData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-3">
      <div className="flex items-center justify-center my-7">
        <img className="h-24 w-24 object-cover" src={Logo} alt="" />
        <h1 className="text-2xl">Chit Chat</h1>
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
          already have an account?{" "}
          <Link className="text-zinc-600 hover:underline" to="/login">
            Login now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
