import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Wrench, CheckCircle, Car, Calendar, AlertTriangle, Play, FileText, IndianRupee } from "lucide-react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

function MechanicWorkPage() {
  const { bookingId } = useParams();

  const [problem, setProblem] = useState("");
  const [cost, setCost] = useState("");
  const [finalCost, setFinalCost] = useState("");
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/service-history/booking/${bookingId}`,
        { withCredentials: true }
      );
      setService(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch service", err);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔧 Submit problem (Transitions status from IN_PROGRESS -> PENDING_APPROVAL)
  const submit = async () => {
    if (!problem || !cost) {
      alert("Please provide both a description and estimated cost.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/service-history/booking/${bookingId}/identify`,
        {
          problemDescription: problem,
          estimatedCost: Number(cost)
        },
        { withCredentials: true }
      );

      alert("✅ Problem identified & estimation submitted! The state is now PENDING_APPROVAL. The user can now approve it.");
      fetchService();
    } catch (err) {
      console.error(err);
      alert("❌ Submission failed. Make sure the status is currently IN_PROGRESS.");
    }
  };

  // 🚗 Tow case
  const tow = async () => {
    try {
      await axios.put(
        `http://localhost:8080/service-history/booking/${bookingId}/tow`,
        {},
        { withCredentials: true }
      );
      alert("🚗 Towing flag set!");
      fetchService();
    } catch (e) {
      alert("Action failed.");
    }
  };

  // 📅 Multi-day
  const multiDay = async () => {
    try {
      await axios.put(
        `http://localhost:8080/service-history/booking/${bookingId}/multi-day?days=2`,
        {},
        { withCredentials: true }
      );
      alert("📅 Multi-day requirement flagged!");
      fetchService();
    } catch (e) {
      alert("Action failed.");
    }
  };

  // ▶️ Start work after approval (PENDING_APPROVAL -> APPROVED -> then backend starts work)
  const startWork = async () => {
    try {
      await axios.put(
        `http://localhost:8080/service-history/booking/${bookingId}/start-work`,
        {},
        { withCredentials: true }
      );
      alert("🛠 Actual Work officially started in system.");
      fetchService();
    } catch (err) {
      console.error(err);
      alert("❌ Start work failed.");
    }
  };

  // ✅ Complete work
  const completeWork = async () => {
    if (!finalCost) return alert("Final cost required to complete.");
    try {
      await axios.put(
        `http://localhost:8080/service-history/booking/${bookingId}/complete`,
        { finalCost: Number(finalCost) },
        { withCredentials: true }
      );
      alert("✅ Work marked as completed! User will now be requested for Payment.");
      fetchService();
    } catch (err) {
      console.error(err);
      alert("❌ Cannot complete right now. Verify it is Approved.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <div className="bg-slate-900 p-3 rounded-2xl">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Mechanic Workspace</h1>
            <p className="text-slate-500 font-medium mt-1">Booking #{bookingId}</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT COL: STATUS OVERVIEW */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Current Status</h3>
              {isLoading ? (
                <div className="space-y-2"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-4 w-1/3" /></div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide
                      ${service?.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-700' :
                        service?.status === 'PENDING_APPROVAL' ? 'bg-blue-100 text-blue-700' :
                          service?.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' :
                            service?.status === 'COMPLETED' ? 'bg-slate-800 text-white' :
                              'bg-slate-200 text-slate-700'}`}
                    >
                      {service?.status || 'UNKNOWN'}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Customer Approved: </span>
                    <span className={service?.approved ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                      {service?.approved ? "YES" : "NO"}
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Special Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
            >
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Flags</h3>
              <div className="space-y-3">
                <button onClick={tow} className="w-full flex items-center gap-3 bg-red-50 text-red-700 hover:bg-red-100 font-semibold p-3 rounded-xl transition">
                  <Car className="w-5 h-5" /> Flag Tow Needed
                </button>
                <button onClick={multiDay} className="w-full flex items-center gap-3 bg-amber-50 text-amber-700 hover:bg-amber-100 font-semibold p-3 rounded-xl transition">
                  <Calendar className="w-5 h-5" /> Flag Multi-Day
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT COL: MAIN ACTIONS */}
          <div className="lg:col-span-2 space-y-6">

            {/* STEP 1: IDENTIFY PROBLEM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm border ${service?.status === 'IN_PROGRESS' ? 'border-blue-300 ring-4 ring-blue-50' : 'border-slate-100 opacity-60'}`}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex justify-center items-center font-bold text-sm">1</div>
                <h3 className="text-xl font-bold text-slate-900">Identify & Estimate</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6">You must submit this to transition the booking to PENDING_APPROVAL. The user cannot approve until you provide this.</p>

              <div className="space-y-4">
                <div className="relative">
                  <FileText className="absolute top-3.5 left-3 w-5 h-5 text-slate-400" />
                  <textarea
                    placeholder="Describe the mechanical problem clearly..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                    rows="3"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <IndianRupee className="absolute top-3 left-3 w-5 h-5 text-slate-400" />
                  <input
                    type="number"
                    placeholder="Estimated Cost (e.g. 1500)"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                  />
                </div>
                <button
                  onClick={submit}
                  disabled={service?.status !== 'IN_PROGRESS'}
                  className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-500/30 disabled:opacity-50"
                >
                  Send Estimate to User
                </button>
              </div>
            </motion.div>

            {/* STEP 2: FINISH WORK */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`bg-white rounded-3xl p-6 md:p-8 shadow-sm border ${service?.status === 'APPROVED' ? 'border-emerald-300 ring-4 ring-emerald-50' : 'border-slate-100 opacity-60'}`}
            >
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex justify-center items-center font-bold text-sm">2</div>
                <h3 className="text-xl font-bold text-slate-900">Execute & Complete Work</h3>
              </div>
              <p className="text-sm text-slate-500 mb-6">Once the user has APPROVED your estimate, you may start and finish the work here.</p>

              <div className="space-y-4">
                <button
                  onClick={startWork}
                  disabled={service?.status !== "APPROVED"}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-white" /> Start Job Timer
                </button>

                <div className="pt-4 border-t border-slate-100 relative">
                  <label className="text-xs font-bold text-slate-700 uppercase mb-2 block">Final Invoice Cost</label>
                  <div className="relative mb-3">
                    <IndianRupee className="absolute top-3.5 left-3 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      placeholder="Calculate final cost"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      onChange={(e) => setFinalCost(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={completeWork}
                    disabled={service?.status !== "APPROVED"}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30 disabled:opacity-50"
                  >
                    <CheckCircle className="w-5 h-5" /> Mark Job Complete
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default MechanicWorkPage;