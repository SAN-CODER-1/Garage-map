import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LiveTracking from "./LiveTracking";

/* Fix leaflet marker icon */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function Booking() {

  const [garages, setGarages] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedGarage, setSelectedGarage] = useState(null);

  const [booking, setBooking] = useState({
    garageId: "",
    vehicleName: "",
    vehicleModel: "",
    vehicleType: "",
    issueType: "",
    issueDescription: "",
    bookingLocationLat: null,
    bookingLocationLng: null
  });

  const [bookingCreated, setBookingCreated] = useState(false); // ✅ control tracking

  useEffect(() => {
    loadData();

    navigator.geolocation.getCurrentPosition((pos) => {
      setBooking(prev => ({
        ...prev,
        bookingLocationLat: pos.coords.latitude,
        bookingLocationLng: pos.coords.longitude
      }));
    });

  }, []);

  const loadData = async () => {

    const userRes = await axios.get(
      "http://localhost:8080/auth/users/me",
      { withCredentials: true }
    );

    setUser(userRes.data);

    const garageRes = await axios.get(
      "http://localhost:8080/api/garages",
      { withCredentials: true }
    );

    setGarages(garageRes.data);
  };

  const validateForm = () => {

    if (!booking.vehicleName.trim()) return "Vehicle name required";
    if (!booking.vehicleModel.trim()) return "Vehicle model required";
    if (!booking.vehicleType.trim()) return "Vehicle type required";
    if (!booking.issueType.trim()) return "Issue type required";
    if (!booking.issueDescription.trim()) return "Issue description required";
    if (!booking.garageId) return "Select a garage from the map";
    if (!booking.bookingLocationLat) return "Select your location on map";

    return null;
  };

  const submit = async () => {

    const error = validateForm();

    if (error) {
      alert(error);
      return;
    }

    const payload = {
      userId: user.id,
      garageId: booking.garageId,
      vehicleName: booking.vehicleName,
      vehicleModel: booking.vehicleModel,
      vehicleType: booking.vehicleType,
      issueType: booking.issueType,
      issueDescription: booking.issueDescription,
      bookingStatus: "PENDING",
      bookingLocationLat: booking.bookingLocationLat,
      bookingLocationLng: booking.bookingLocationLng
    };

    const res = await axios.post(
      "http://localhost:8080/bookings",
      payload,
      { withCredentials: true }
    );

    // ✅ Save full response (includes id)
    setBooking(res.data);

    // ✅ enable tracking
    setBookingCreated(true);

    alert("Booking created successfully");
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {

    const R = 6371;

    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2);
  };

  function LocationPicker() {

    useMapEvents({
      click(e) {
        setBooking(prev => ({
          ...prev,
          bookingLocationLat: e.latlng.lat,
          bookingLocationLng: e.latlng.lng
        }));
      }
    });

    return null;
  }

  return (

    <div className="max-w-5xl mx-auto p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        Book Garage Service
      </h1>

      {/* Form */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">

        <input
          value={booking.vehicleName}
          onChange={(e) =>
            setBooking({ ...booking, vehicleName: e.target.value })
          }
          placeholder="Vehicle Name"
          className="border rounded w-full p-2"
        />

        <input
          value={booking.vehicleModel}
          onChange={(e) =>
            setBooking({ ...booking, vehicleModel: e.target.value })
          }
          placeholder="Vehicle Model"
          className="border rounded w-full p-2"
        />

        <select
          value={booking.vehicleType}
          onChange={(e) =>
            setBooking({ ...booking, vehicleType: e.target.value })
          }
          className="border rounded w-full p-2"
        >
          <option value="">Select Vehicle Type</option>
          <option value="Car">Car</option>
          <option value="Bike">Bike</option>
        </select>

        <input
          value={booking.issueType}
          onChange={(e) =>
            setBooking({ ...booking, issueType: e.target.value })
          }
          placeholder="Issue Type"
          className="border rounded w-full p-2"
        />

        <textarea
          value={booking.issueDescription}
          onChange={(e) =>
            setBooking({
              ...booking,
              issueDescription: e.target.value
            })
          }
          rows="3"
          placeholder="Issue Description"
          className="border rounded w-full p-2"
        />

        {selectedGarage && (
          <div className="bg-green-50 border p-3 rounded">
            <p className="font-semibold">Selected Garage</p>
            <p>{selectedGarage.garageName}</p>
            <p>{selectedGarage.address}</p>
          </div>
        )}

      </div>

      {/* Map */}
      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={13}
        style={{ height: "400px" }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <LocationPicker />

        {booking.bookingLocationLat && (
          <Marker position={[
            booking.bookingLocationLat,
            booking.bookingLocationLng
          ]}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        {garages.map(g => {

          const lat = Number(g.locationLat);
          const lng = Number(g.locationLng);

          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker key={g.id} position={[lat, lng]}>
              <Popup>
                <button
                  onClick={() => {
                    setSelectedGarage(g);
                    setBooking(prev => ({
                      ...prev,
                      garageId: g.id
                    }));
                  }}
                  className="bg-green-600 text-white px-3 py-2 rounded"
                >
                  Select Garage
                </button>
              </Popup>
            </Marker>
          );
        })}

      </MapContainer>

      <button
        onClick={submit}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Confirm Booking
      </button>

      {/* ✅ Show tracking ONLY after booking created */}
      {bookingCreated && booking.id && (
        <LiveTracking booking={booking} />
      )}

    </div>
  );
}

export default Booking;