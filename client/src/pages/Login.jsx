import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await axios.post(
      `http://localhost:8000/api/v1/users/login`,
      {
        email,
        password,
      }
    );

    const data = await response.data;
    console.log(data);
    navigate("/users");
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-3 shadow-md w-fit p-3 mx-auto mt-5">
        <input
          className="outline-none border rounded px-2 py-2 w-[300px] border-purple-600"
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="outline-none border rounded px-2 py-2 w-[300px] border-purple-600"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          onClick={handleLogin}
          className="border border-green-500 rounded py-2 font-bold hover:bg-green-500 hover:text-white duration-200"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
