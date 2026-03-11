import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 bg-black text-white shadow">
        <h1 className="text-2xl font-bold tracking-wide">WheelConnect</h1>

        <div className="space-x-6 hidden md:flex items-center">
          <a href="/home" className="hover:text-gray-300">Home</a>
          <a href="/garages" className="hover:text-gray-300">Garages</a>
          <a href="/bookings" className="hover:text-gray-300">Bookings</a>
          <a
            href="/"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </a>
        </div>
      </nav>


      {/* Hero */}
      <section className="text-center py-24 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Instant Garage Help Near You
        </h2>

        <p className="text-lg opacity-90 mb-10">
          Book nearby mechanics, emergency towing, and vehicle repair in seconds.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <button className="bg-white text-blue-700 px-6 py-3 rounded font-semibold hover:bg-gray-200 transition">
            Find Garage
          </button>

          <button className="bg-red-500 px-6 py-3 rounded font-semibold hover:bg-red-600 transition">
            Emergency Help
          </button>
        </div>
      </section>


      {/* Services */}
      <section className="px-8 py-20 max-w-7xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {[
            {
              title: "Puncture Repair",
              desc: "Quick tire repair from trusted garages."
            },
            {
              title: "Battery Jumpstart",
              desc: "Dead battery? Get instant assistance."
            },
            {
              title: "Oil Change",
              desc: "Fast oil replacement and service."
            },
            {
              title: "Emergency Tow",
              desc: "Vehicle breakdown towing support."
            }
          ].map((service, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.desc}
              </p>
            </div>

          ))}

        </div>
      </section>


      {/* Nearby Garages */}
      <section className="bg-gray-100 py-20 px-8">

        <h2 className="text-3xl font-bold text-center mb-12">
          Nearby Garages
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

          {[
            {
              name: "Speed Auto Garage",
              rating: "4.5",
              distance: "2.1 km"
            },
            {
              name: "City Wheels Service",
              rating: "4.2",
              distance: "3.4 km"
            }
          ].map((garage, index) => (

            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow flex justify-between items-center hover:shadow-lg transition"
            >

              <div>
                <h3 className="text-xl font-semibold">
                  {garage.name}
                </h3>

                <p className="text-yellow-500">
                  ⭐ {garage.rating}
                </p>

                <span className="text-sm text-gray-500">
                  {garage.distance} away
                </span>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Book
              </button>

            </div>

          ))}

        </div>
      </section>


      {/* CTA */}
      <section className="text-center py-20 bg-black text-white">

        <h2 className="text-3xl font-bold mb-6">
          Need urgent vehicle help?
        </h2>

        <p className="opacity-80 mb-8">
          Connect with nearby mechanics instantly.
        </p>

        <button className="bg-red-500 px-8 py-3 rounded text-lg hover:bg-red-600 transition">
          Request Emergency Service
        </button>

      </section>


      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-auto">
        <p>© 2026 WheelConnect. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Home;