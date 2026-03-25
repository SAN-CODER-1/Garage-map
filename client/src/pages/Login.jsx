import React, { useState } from "react";
import axios from "axios";

function Login() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const submit = async (e) => {

    e.preventDefault();

    const res = await axios.post(
      "http://localhost:8080/auth/login",
      {email,password},
      {withCredentials:true}
    );

    const user = res.data;

    if(user.role === "ADMIN")
      window.location.href="/admin";

    if(user.role === "GARAGE_OWNER")
      window.location.href="/garage-dashboard";

    if(user.role === "USER")
      window.location.href="/dashboard";
  };

  return (

    <div className="flex justify-center items-center h-screen">

      <form onSubmit={submit} className="w-80 p-8 border shadow">

        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
          className="w-full border p-2 mb-3"
        />

        <button className="w-full bg-blue-600 text-white p-2">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;