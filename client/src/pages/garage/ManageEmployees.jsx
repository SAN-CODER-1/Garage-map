import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageEmployees() {

  const [employees, setEmployees] = useState([]);
  const [garageId, setGarageId] = useState(null);

  const [form, setForm] = useState({
    employeeName: "",
    experienceYears: "",
    specialization: "",
    rating: "",
    availabilityStatus: "AVAILABLE"
  });

  useEffect(() => {
    loadUser();
  }, []);

const loadUser = async () => {

  const userRes = await axios.get(
    "http://localhost:8080/auth/users/me",
    { withCredentials: true }
  );

  const gid = userRes.data.id;   // use user id as garage id

  console.log("Garage ID:", gid);

  setGarageId(gid);

  loadEmployees(gid);
};

  const loadEmployees = async (gid) => {

    const res = await axios.get(
      `http://localhost:8080/api/employees/garage/${gid}`,
      { withCredentials: true }
    );

    setEmployees(res.data);
  };

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const addEmployee = async (e) => {

    e.preventDefault();

    const payload = {
      ...form,
      garageId: garageId
    };

    await axios.post(
      "http://localhost:8080/api/employees",
      payload,
      { withCredentials: true }
    );

    loadEmployees(garageId);
  };

  const deleteEmployee = async (id) => {

    await axios.delete(
      `http://localhost:8080/api/employees/${id}`,
      { withCredentials: true }
    );

    loadEmployees(garageId);
  };

  const updateAvailability = async (id, status) => {

    await axios.put(
      `http://localhost:8080/api/employees/${id}/availability?status=${status}`,
      {},
      { withCredentials: true }
    );

    loadEmployees(garageId);
  };

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        Garage Employees
      </h1>

      <form onSubmit={addEmployee} className="space-y-3 mb-10">

        <input
          name="employeeName"
          placeholder="Employee Name"
          onChange={change}
          className="border p-2 w-full"
        />

        <input
          name="experienceYears"
          placeholder="Experience"
          onChange={change}
          className="border p-2 w-full"
        />

        <input
          name="specialization"
          placeholder="Specialization"
          onChange={change}
          className="border p-2 w-full"
        />

        <input
          name="rating"
          placeholder="Rating"
          onChange={change}
          className="border p-2 w-full"
        />

        <button className="bg-green-600 text-white px-4 py-2">
          Add Employee
        </button>

      </form>

      <table className="w-full border">

        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>Experience</th>
            <th>Specialization</th>
            <th>Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees.map(emp => (

            <tr key={emp.id} className="border">

              <td>{emp.employeeName}</td>
              <td>{emp.experienceYears} yrs</td>
              <td>{emp.specialization}</td>
              <td>{emp.rating}</td>
              <td>{emp.availabilityStatus}</td>

              <td className="space-x-2">

                <button
                  onClick={() => updateAvailability(emp.id,"AVAILABLE")}
                  className="bg-blue-500 text-white px-2 py-1"
                >
                  Available
                </button>

                <button
                  onClick={() => updateAvailability(emp.id,"BUSY")}
                  className="bg-yellow-500 text-white px-2 py-1"
                >
                  Busy
                </button>

                <button
                  onClick={() => deleteEmployee(emp.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageEmployees;