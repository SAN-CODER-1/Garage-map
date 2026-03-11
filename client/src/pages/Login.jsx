import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        {
          email: email,
          password: password
        },
        {
          withCredentials: true
        }
      );

      const user = response.data;

      if (user.role === "ADMIN") {
        window.location.href = "/admin";
      } else if (user.role === "GARAGE_OWNER") {
        window.location.href = "/garage-dashboard";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (error) {
      setMessage("Invalid login credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <form
        onSubmit={handleSubmit}
        className="w-80 p-8 border rounded-lg shadow"
      >
        <h2 className="text-xl font-bold mb-4">WheelConnect Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
          className="w-full p-2 border mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
          className="w-full p-2 border mb-3"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Login
        </button>
        <a href="/register" className="w-full bg-blue-600 text-white p-2 rounded">register</a>

        <p className="text-red-500 mt-3">{message}</p>

      </form>

    </div>
  );
}

export default Login;