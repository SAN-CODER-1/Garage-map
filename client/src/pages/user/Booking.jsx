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
import { motion } from "framer-motion";
import { Car, Wrench, FileText, CheckCircle, Info, MapPin } from "lucide-react";

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

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

function Booking() {
  const [garages, setGarages] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const [bookingCreated, setBookingCreated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
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
    } catch (err) {
      console.error("Error loading data", err);
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!booking.garageId) {
      alert("Please select a garage from the map");
      return;
    }
    if (!booking.bookingLocationLat) {
      alert("Please ensure your location is pinned on the map");
      return;
    }

    setIsSubmitting(true);
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

    try {
      const res = await axios.post(
        "http://localhost:8080/bookings",
        payload,
        { withCredentials: true }
      );
      setBooking(res.data);
      setBookingCreated(true);
    } catch (err) {
      console.error(err);
      alert("Failed to create booking.");
    } finally {
      setIsSubmitting(false);
    }
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

  // If the booking is created, we transition fully into the LiveTracking view for this specific file,
  // making it much cleaner than splitting the page weirdly.
  if (bookingCreated && booking.id) {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center shadow-sm"
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-900 mb-2">Booking Confirmed!</h2>
          <p className="text-emerald-700">Your mechanic has been requested. Connecting to live tracker...</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 overflow-hidden"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" /> Live Mechanic Tracking
          </h3>
          <LiveTracking booking={booking} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Book Garage Service
          </h1>
          <p className="text-slate-500 mt-2">Fill out your vehicle details and select a garage near you.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Service Details Form */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-600" /> Vehicle Details
              </h3>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : (
                <form id="booking-form" onSubmit={submit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase">Make / Brand</label>
                      <input
                        required
                        value={booking.vehicleName}
                        onChange={(e) => setBooking({ ...booking, vehicleName: e.target.value })}
                        placeholder="e.g. Honda"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 uppercase">Model</label>
                      <input
                        required
                        value={booking.vehicleModel}
                        onChange={(e) => setBooking({ ...booking, vehicleModel: e.target.value })}
                        placeholder="e.g. Civic"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase">Vehicle Type</label>
                    <select
                      required
                      value={booking.vehicleType}
                      onChange={(e) => setBooking({ ...booking, vehicleType: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm appearance-none"
                    >
                      <option value="" disabled>Select Vehicle Type</option>
                      <option value="Car">Car</option>
                      <option value="Bike">Bike</option>
                      <option value="Truck">Truck</option>
                    </select>
                  </div>

                  <div className="pt-4 pb-2 border-t border-slate-100">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Wrench className="w-5 h-5 text-blue-600" /> Issue Info
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 uppercase">Issue Type</label>
                    <input
                      required
                      value={booking.issueType}
                      onChange={(e) => setBooking({ ...booking, issueType: e.target.value })}
                      placeholder="e.g. Flat Tire, Battery Dead"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm"
                    />
                  </div>

                  <div className="space-y-1.5 pb-2">
                    <label className="text-xs font-semibold text-slate-700 uppercase">Detailed Description</label>
                    <textarea
                      required
                      value={booking.issueDescription}
                      onChange={(e) => setBooking({ ...booking, issueDescription: e.target.value })}
                      rows="3"
                      placeholder="Elaborate exactly what went wrong..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition text-sm resize-none"
                    />
                  </div>
                </form>
              )}
            </motion.div>

            {/* Garage Selected Sub-Card */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`p-6 rounded-3xl border transition-all ${
                selectedGarage 
                  ? "bg-blue-50 border-blue-200 shadow-sm" 
                  : "bg-slate-50 border-slate-200 border-dashed"
              }`}
            >
              {selectedGarage ? (
                <div>
                  <h4 className="text-xs font-bold text-blue-600 uppercase mb-2 flex items-center gap-1"><CheckCircle className="w-4 h-4"/> SELECTED GARAGE</h4>
                  <p className="text-lg font-bold text-slate-900">{selectedGarage.garageName}</p>
                  <p className="text-sm text-slate-600 mt-1">{selectedGarage.address}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center opacity-60 py-2">
                  <Info className="w-6 h-6 text-slate-400 mb-2" />
                  <p className="text-sm font-semibold text-slate-600">No Garage Selected</p>
                  <p className="text-xs text-slate-500 mt-1">Please select an available garage from the map.</p>
                </div>
              )}
            </motion.div>

            <button
              form="booking-form"
              type="submit"
              disabled={isSubmitting || loading}
              className="w-full bg-slate-900 text-white font-bold text-lg py-4 rounded-2xl hover:bg-slate-800 disabled:opacity-70 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98]"
            >
              {isSubmitting ? "Processing..." : "Confirm Booking"}
            </button>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-3">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-2 rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative h-[600px] lg:h-full z-0"
            >
              {loading ? (
                 <Skeleton className="w-full h-full rounded-2xl" />
              ) : (
                <div className="rounded-2xl overflow-hidden h-full">
                  <MapContainer
                    center={[11.0168, 76.9558]}
                    zoom={13}
                    style={{ height: "100%", width: "100%", zIndex: 0 }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <LocationPicker />

                    {booking.bookingLocationLat && (
                      <Marker position={[booking.bookingLocationLat, booking.bookingLocationLng]}>
                        <Popup><b className="text-slate-900">Your Location</b></Popup>
                      </Marker>
                    )}

                    {garages.map(g => {
                      const lat = Number(g.locationLat);
                      const lng = Number(g.locationLng);
                      if (isNaN(lat) || isNaN(lng)) return null;

                      return (
                        <Marker key={g.id} position={[lat, lng]}>
                          <Popup className="rounded-xl overflow-hidden shadow-none border-0">
                            <div className="p-1 min-w-[140px] text-center">
                              <h3 className="font-bold text-slate-900 mb-1">{g.garageName}</h3>
                              <p className="text-xs text-slate-500 mb-3">{g.address?.substring(0, 30)}...</p>
                              <button
                                onClick={() => {
                                  setSelectedGarage(g);
                                  setBooking(prev => ({ ...prev, garageId: g.id }));
                                }}
                                className="w-full bg-blue-600 text-white text-xs px-3 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                              >
                                Select Garage
                              </button>
                            </div>
                          </Popup>
                        </Marker>
                      );
                    })}
                  </MapContainer>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;