import React, {useState} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async () => {
        const response = await axios.post(`http://localhost:8000/api/v1/users/register`, {
            name, email, password
        }, { withCredentials : true })

        const data = await response.data;
        return data;
    }


  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-3 shadow-md w-fit p-3 mx-auto mt-5">
        <input
          className="outline-none border rounded px-2 py-2 w-[300px] border-purple-600"
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          onClick={handleSignup}
          className="border border-green-500 rounded py-2 font-bold hover:bg-green-500 hover:text-white duration-200"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
