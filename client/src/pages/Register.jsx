import React, { useState } from "react";
import axios from "axios";

function Register() {

  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: ""
  });

  const change = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };



const submit = async (e) => {
  e.preventDefault();

  try {

    const url =
      form.role === "GARAGE_OWNER"
        ? "http://localhost:8080/auth/register/garage"
        : "http://localhost:8080/auth/register/user";

    await axios.post(url, form);

    alert("Registered successfully");
    window.location.href = "/login";

  } catch {
    alert("Registration failed");
  }
};

  return (

    <div className="flex justify-center items-center h-screen">

      <form onSubmit={submit} className="w-96 p-8 border shadow">

        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input name="username" placeholder="Username"
          onChange={change} className="w-full border p-2 mb-3"/>

        <input name="email" placeholder="Email"
          onChange={change} className="w-full border p-2 mb-3"/>

        <input name="phoneNumber" placeholder="Phone"
          onChange={change} className="w-full border p-2 mb-3"/>

        <input type="password" name="password" placeholder="Password"
          onChange={change} className="w-full border p-2 mb-3"/>

        <select name="role" onChange={change}
          className="w-full border p-2 mb-4">

          <option value="USER">User</option>
          <option value="GARAGE_OWNER">Garage Owner</option>

        </select>

        <button className="w-full bg-blue-600 text-white p-2">
          Register
        </button>

      </form>

    </div>
  );
}

export default Register;