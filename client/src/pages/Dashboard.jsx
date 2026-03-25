import React, { useEffect, useState } from "react";

function Dashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/auth/users/me", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading user data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-black text-white px-8 py-4 flex justify-between">
        <h1 className="text-2xl font-bold">WheelConnect</h1>
        <div className="flex gap-6">
          <a href="/garages" className="hover:text-gray-300">Garages</a>
          <a href="/bookings" className="hover:text-gray-300">Bookings</a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto py-12 px-6">

        {/* Welcome */}
        <h2 className="text-3xl font-bold mb-8">
          Welcome, {user.username}
        </h2>

        {/* User Details */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow">

            <h3 className="text-xl font-semibold mb-4">
              User Profile
            </h3>

            <div className="space-y-3 text-gray-700">

              <p><b>ID:</b> {user.id}</p>

              <p><b>Username:</b> {user.username}</p>

              <p><b>Email:</b> {user.email}</p>

              <p><b>Phone Number:</b> {user.phoneNumber}</p>

              <p>
                <b>Role:</b>
                <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {user.role}
                </span>
              </p>

              <p>
                <b>Status:</b>
                <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded">
                  {user.accountStatus}
                </span>
              </p>

              <p><b>Created At:</b> {user.createdAt}</p>

              <p><b>Updated At:</b> {user.updatedAt}</p>

            </div>

          </div>

          {/* Account Info */}
          <div className="bg-white p-6 rounded-lg shadow">

            <h3 className="text-xl font-semibold mb-4">
              Account Information
            </h3>

            <div className="space-y-4 text-gray-700">

              <div className="flex justify-between border-b pb-2">
                <span>Subscription Plan</span>
                <span className="font-semibold">
                  {user.subscriptionPlan}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Total Services Taken</span>
                <span className="font-semibold">
                  {user.totalServicesTaken}
                </span>
              </div>

              <div className="flex justify-between border-b pb-2">
                <span>Account Role</span>
                <span className="font-semibold">
                  {user.role}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-12">

          <h3 className="text-2xl font-bold mb-6">
            Quick Services
          </h3>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              "Puncture Repair",
              "Battery Jumpstart",
              "Oil Change",
              "Emergency Tow"
            ].map((service, index) => (

              <div
                key={index}
                className="bg-white p-6 rounded shadow hover:shadow-lg transition"
              >
                <h4 className="text-lg font-semibold">
                  {service}
                </h4>

                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Request
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-12">
        © 2026 WheelConnect
      </footer>

    </div>
  );
}

export default Dashboard;