import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateGarage from "./CreateGarage";
import MechanicTracker from "./MechanicTracker";

function GarageDashboard() {

  const [user, setUser] = useState(null);
  const [garage, setGarage] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {

      const userRes = await axios.get(
        "http://localhost:8080/auth/users/me",
        { withCredentials: true }
      );

      if (userRes.data.role !== "GARAGE_OWNER") {
        alert("Access denied");
        window.location.href = "/";
        return;
      }

      setUser(userRes.data);

      const garageId = userRes.data.id;

      loadEmployees(garageId);

      try {

        const garageRes = await axios.get(
          "http://localhost:8080/api/garages/owner",
          { withCredentials: true }
        );

        setGarage(garageRes.data);

        loadBookings();

      } catch {
        setGarage(null);
      }

    } catch {
      window.location.href = "/login";
    }

    setLoading(false);
  };

  const loadEmployees = async (garageId) => {
    try {

      const res = await axios.get(
        `http://localhost:8080/api/employees/garage/${garageId}`,
        { withCredentials: true }
      );

      setEmployees(res.data);

    } catch {
      console.error("Failed to load employees");
    }
  };

  const loadBookings = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/bookings",
        { withCredentials: true }
      );

      setBookings(res.data);

    } catch {
      console.error("Failed to load bookings");
    }
  };

  const updateStatus = async (id, status, booking) => {

    try {

      await axios.put(
        `http://localhost:8080/bookings/${id}/status?status=${status}`,
        {},
        { withCredentials: true }
      );

      if (status === "ACCEPTED" || status === "IN_PROGRESS") {
        setSelectedBooking(booking);
      }

      if (status === "COMPLETED") {
        setSelectedBooking(null);
      }

      loadBookings();

    } catch {
      alert("Status update failed");
    }

  };

  const assignEmployee = async (bookingId, employeeId) => {

    try {

      await axios.put(
        `http://localhost:8080/bookings/${bookingId}/assign?employeeId=${employeeId}`,
        {},
        { withCredentials: true }
      );

      loadBookings();

    } catch {
      alert("Employee assignment failed");
    }

  };

  if (loading) return <div className="p-10">Loading...</div>;

  if (!garage) {
    return <CreateGarage />;
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="bg-black text-white flex justify-between px-10 py-4">
        <h1 className="text-xl font-bold">Garage Dashboard</h1>
        <div>{user.username}</div>
      </div>

      <div className="p-10">

        <div className="bg-white p-6 shadow mb-10">
          <h2 className="text-xl font-bold mb-4">Garage Information</h2>
          <p><b>Garage Name:</b> {garage.garageName}</p>
          <p><b>Address:</b> {garage.address}</p>
          <p><b>Garage Type:</b> {garage.garageType}</p>
          <p><b>Years of Service:</b> {garage.yearsOfService}</p>
        </div>

        <div className="bg-white p-6 shadow mb-10">

          <h2 className="text-xl font-bold mb-4">Employees</h2>

          {employees.length === 0 ? (
            <div>No employees added</div>
          ) : (

            <table className="w-full border">

              <thead className="bg-gray-200">
                <tr>
                  <th>Name</th>
                  <th>Experience</th>
                  <th>Specialization</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {employees.map((emp) => (

                  <tr key={emp.id} className="border-t text-center">
                    <td>{emp.employeeName}</td>
                    <td>{emp.experienceYears} yrs</td>
                    <td>{emp.specialization}</td>
                    <td>{emp.availabilityStatus}</td>
                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

        <div className="bg-white p-6 shadow">

          <h2 className="text-xl font-bold mb-4">Incoming Bookings</h2>

          {bookings.length === 0 ? (
            <div>No bookings yet</div>
          ) : (

            <table className="w-full border">

              <thead className="bg-gray-200">
                <tr>
                  <th>Booking ID</th>
                  <th>User</th>
                  <th>Status</th>
                  <th>Assign Employee</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {bookings.map((b) => (

                  <tr key={b.id} className="border-t text-center">

                    <td>{b.id}</td>
                    <td>{b.userId}</td>
                    <td>{b.bookingStatus}</td>

                    <td>

                      <select
                        className="border p-1"
                        defaultValue={b.employeeId || ""}
                        onChange={(e) =>
                          assignEmployee(b.id, e.target.value)
                        }
                      >

                        <option value="">Assign Employee</option>

                        {employees.map((emp) => (

                          <option key={emp.id} value={emp.id}>
                            {emp.employeeName}
                          </option>

                        ))}

                      </select>

                    </td>

                    <td className="space-x-2">

                      <button
                        onClick={() => updateStatus(b.id, "ACCEPTED", b)}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Accept
                      </button>

                      <button
                        onClick={() => updateStatus(b.id, "IN_PROGRESS", b)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Start
                      </button>

                      <button
                        onClick={() => updateStatus(b.id, "COMPLETED", b)}
                        className="bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Complete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

      {selectedBooking && (
        <MechanicTracker booking={selectedBooking} />
      )}

    </div>

  );

}

export default GarageDashboard;