import React, { useState, useEffect } from "react";
import axios from "axios";

function CreateGarage() {

  const [garage, setGarage] = useState({
    garageName: "",
    address: "",
    garageType: "",
    yearsOfService: "",
    serviceQualityScore: "",
    trustScore: "",
    documentsVerified: false,
    locationLat: "",
    locationLng: ""
  });

  const [loading, setLoading] = useState(true);

  // CHECK USER ROLE
  useEffect(() => {

    axios.get(
      "http://localhost:8080/auth/users/me",
      { withCredentials: true }
    )
    .then(res => {

      if (res.data.role !== "GARAGE_OWNER") {
        alert("Only garage owners can access this page");
        window.location.href = "/";
      }

      setLoading(false);

    })
    .catch(() => {
      window.location.href = "/login";
    });

  }, []);

  const change = (e) => {
    const { name, value, type, checked } = e.target;

    setGarage({
      ...garage,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/api/garages",
        garage,
        { withCredentials: true }
      );

      alert("Garage created successfully");

    } catch (err) {

      if (err.response) {
        alert(err.response.data.message || "Error creating garage");
      } else {
        alert("Server error");
      }

    }
  };

  if (loading) return <div>Checking permissions...</div>;

  return (

    <div className="flex justify-center items-center h-screen">

      <form onSubmit={submit} className="w-96 p-8 border shadow">

        <h2 className="text-xl font-bold mb-4">
          Register Garage
        </h2>

        <input
          name="garageName"
          placeholder="Garage Name"
          onChange={change}
          className="border p-2 w-full mb-3"
        />

        <input
          name="address"
          placeholder="Address"
          onChange={change}
          className="border p-2 w-full mb-3"
        />

        <input
          name="garageType"
          placeholder="Garage Type"
          onChange={change}
          className="border p-2 w-full mb-3"
        />

        <input
          name="yearsOfService"
          placeholder="Years of Service"
          onChange={change}
          className="border p-2 w-full mb-3"
        />

        <input
          name="serviceQualityScore"
          placeholder="Service Quality Score"
          onChange={change}
          className="border p-2 w-full mb-3"
        />

        <input
          name="trustScore"
          placeholder="Trust Score"
          onChange={change}
          className="border p-2 w-full mb-3"
        />

        <input
          name="locationLat"
          placeholder="Latitude"
          onChange={change}
          className="border p-2 w-full mb-3"
        />

        <input
          name="locationLng"
          placeholder="Longitude"
          onChange={change}
          className="border p-2 w-full mb-3"
        />

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="documentsVerified"
            onChange={change}
            className="mr-2"
          />
          Documents Verified
        </label>

        <button className="bg-blue-600 text-white w-full p-2">
          Create Garage
        </button>

      </form>

    </div>
  );
}

export default CreateGarage;