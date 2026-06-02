import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Activity, Clock, Wrench, Settings, ArrowRight, ShieldCheck, MapPin, Search } from "lucide-react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("http://localhost:8080/auth/users/me", {
          withCredentials: true
        });
        setUser(userRes.data);

        // Fetch bookings using standard REST endpoint prediction
        // If the backend has a different endpoint, this try-catch will fall back gracefully
        try {
          const bookingsRes = await axios.get(`http://localhost:8080/bookings/user`, {
            withCredentials: true
          });
          if (Array.isArray(bookingsRes.data)) {
            setBookings(bookingsRes.data);
          } else {
             // Fallback attempt
             const specificRes = await axios.get(`http://localhost:8080/bookings/user/${userRes.data.id}`, {
               withCredentials: true
             });
             setBookings(Array.isArray(specificRes.data) ? specificRes.data : []);
          }
        } catch (err) {
          console.warn("Could not fetch user bookings, endpoint might differ.");
        }
      } catch (err) {
        console.error("Failed to load user profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-12">

      <div className="max-w-7xl mx-auto py-10 px-6">
        
        {/* Welcome Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {loading ? (
            <Skeleton className="h-10 w-64 mb-2" />
          ) : (
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              Hello, {user?.username} <span className="text-2xl">👋</span>
            </h1>
          )}
          <p className="text-slate-500">Manage your vehicle services and track active bookings.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Profile & Stats */}
          <div className="space-y-8 lg:col-span-1">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
            >
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-blue-600" /> Account Details
              </h3>
              
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-6 w-5/6" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              ) : (
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Account ID</span>
                    <span className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded text-xs">{user?.id}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Email</span>
                    <span className="font-medium text-slate-900">{user?.email}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Phone</span>
                    <span className="font-medium text-slate-900">{user?.phoneNumber || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-slate-500">Role</span>
                    <span className="bg-indigo-50 text-indigo-700 font-semibold px-2 py-1 rounded-md text-xs">{user?.role}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500">Status</span>
                    <span className="bg-emerald-50 text-emerald-600 font-semibold flex items-center gap-1 px-2 py-1 rounded-md text-xs">
                      <ShieldCheck className="w-3 h-3" /> {user?.accountStatus || 'ACTIVE'}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl"
            >
              <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
                <Activity className="w-5 h-5 text-blue-400" /> Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/garages" className="bg-white/10 hover:bg-white/20 transition p-4 rounded-2xl flex flex-col items-center justify-center text-center group">
                  <Search className="w-6 h-6 text-blue-300 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Find Garage</span>
                </Link>
                <Link to="/garages" className="bg-white/10 hover:bg-white/20 transition p-4 rounded-2xl flex flex-col items-center justify-center text-center group">
                  <Wrench className="w-6 h-6 text-orange-300 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Tow / Rescue</span>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Booking History & Activity */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" /> Recent Bookings
                </h3>
                <Link to="/garages" className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  New Booking <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <MapPin className="w-8 h-8 text-slate-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-700 mb-1">No Bookings Yet</h4>
                  <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
                    You haven't booked any garage services yet. Book your first service today!
                  </p>
                  <Link to="/garages" className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition">
                    Explore Garages
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b) => (
                    <div key={b.id} className="group border border-slate-100 rounded-2xl p-5 hover:border-blue-100 hover:shadow-md transition-all bg-slate-50/50">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold tracking-wider text-slate-400 mb-1">BOOKING #{b.id}</span>
                          <span className="text-lg font-bold text-slate-900">{b.vehicleName || b.vehicleType || "General Service"}</span>
                          <span className="text-sm text-slate-500">{b.issueType || b.problemDescription || "Assistance required"}</span>
                        </div>
                        <div className="flex flex-col items-start md:items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                            ${b.bookingStatus === 'PENDING' ? 'bg-amber-100 text-amber-700' : 
                              b.bookingStatus === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
                              b.bookingStatus === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' :
                              'bg-slate-200 text-slate-700'}`}
                          >
                            {b.bookingStatus || 'PENDING'}
                          </span>
                          
                          {/* Navigate based on status if needed */}
                          {(b.bookingStatus === 'IN_PROGRESS' || b.bookingStatus === 'PENDING') && (
                            <Link to={`/service/${b.id}`} className="text-blue-600 hover:text-blue-800 text-sm font-semibold flex items-center gap-1">
                              Track Service <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
