import React, { useState } from "react";
import axios from "axios";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    passwordHash: "",
    role: "USER",
    subscriptionPlan: "FREE",
    accountStatus: "ACTIVE"
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/auth/users",
        formData
      );

      setMessage("User registered successfully");

    } catch (error) {

      setMessage("Registration failed");

    }

  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>

      <form onSubmit={handleSubmit} style={{width:"400px",padding:"30px",border:"1px solid #ddd",borderRadius:"10px"}}>

        <h2>WheelConnect Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
          style={{width:"100%",padding:"10px",marginTop:"10px"}}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{width:"100%",padding:"10px",marginTop:"10px"}}
        />

        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          style={{width:"100%",padding:"10px",marginTop:"10px"}}
        />

        <input
          type="password"
          name="passwordHash"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{width:"100%",padding:"10px",marginTop:"10px"}}
        />

        <select
          name="role"
          onChange={handleChange}
          style={{width:"100%",padding:"10px",marginTop:"10px"}}
        >
          <option value="USER">User</option>
          <option value="GARAGE">Garage Owner</option>
        </select>

        <button
          type="submit"
          style={{width:"100%",padding:"10px",marginTop:"20px",background:"#2563eb",color:"white",border:"none"}}
        >
          Register
        </button>

        <p style={{color:"green",marginTop:"10px"}}>{message}</p>

      </form>

    </div>
  );
}

export default Register;