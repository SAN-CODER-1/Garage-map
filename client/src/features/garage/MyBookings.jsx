import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/bookings/garage",
        { withCredentials: true }
      );
      

      setBookings(res.data);

    } catch (err) {
      console.error("Failed to load bookings");
    }

    setLoading(false);
  };

  const updateStatus = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:8080/bookings/${id}/status?status=${status}`,
        {},
        { withCredentials: true }
      );

      loadBookings();

    } catch {
      alert("Status update failed");
    }

  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-2xl font-bold mb-6">
        My Garage Bookings
      </h1>

      {bookings.length === 0 ? (

        <div className="bg-white p-6 shadow">
          No bookings available
        </div>

      ) : (

        <table className="w-full bg-white shadow border">

          <thead className="bg-gray-200">

            <tr>
              <th className="p-2">Booking ID</th>
              <th>User</th>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Problem</th>
              <th>Employee</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((b) => (
              
              
              <tr key={b.id} className="border-t text-center">

                <td className="p-2">{b.id}</td>

                <td>
                  {b.userName}
                  <br/>
                  {b.userPhone}
                </td>

                <td>
                  {b.vehicleType}
                  <br/>
                  {b.vehicleNumber}
                </td>

                <td>{b.serviceType}</td>

                <td>{b.problemDescription}</td>

                <td>
                  {b.employeeName || "Not Assigned"}
                </td>

                <td>
                  <span className="px-2 py-1 bg-gray-200 rounded">
                    {b.bookingStatus}
                  </span>
                </td>

                <td>
                  {new Date(b.createdAt).toLocaleString()}
                </td>

                <td className="space-x-2">

                  <button
                    onClick={() => updateStatus(b.id,"ACCEPTED")}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => updateStatus(b.id,"IN_PROGRESS")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Start
                  </button>

                  <button
                    onClick={() => updateStatus(b.id,"COMPLETED")}
                    className="bg-blue-600 text-white px-2 py-1 rounded"
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

  );
}

export default MyBookings;
