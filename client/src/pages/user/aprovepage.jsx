import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle, FileText, IndianRupee, ShieldCheck } from "lucide-react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

function ApprovalPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
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

  const approve = async () => {
    if (!service || !service.id) return;
    setIsApproving(true);

    try {
      await axios.put(
        `http://localhost:8080/service-history/${service.id}/approve`,
        {},
        { withCredentials: true }
      );
      alert("✅ Estimate Approved! Mechanic will continue the job.");
      navigate(`/service/${bookingId}`); // route back to monitoring
    } catch (err) {
      console.error("❌ Approve failed", err);
      alert("Approval failed, please try again.");
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center"
      >
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-amber-600" />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Approval Required
        </h1>
        <p className="text-slate-500 text-sm mt-2 mb-8 px-4">
          The mechanic has diagnosed your vehicle and provided an estimated cost. Please review and approve to continue.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left mb-8 shadow-sm">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3 mb-2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : service ? (
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Diagnosis / Problem</p>
                  <p className="text-sm font-medium text-slate-900 leading-relaxed bg-white p-3 rounded-xl border border-slate-100">
                    {service?.problemDescription || "No detailed description provided."}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <IndianRupee className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Estimated Cost</p>
                  <p className="text-2xl font-extrabold text-slate-900">
                    ₹{service?.estimatedCost || "0"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-slate-500 text-sm">Failed to load estimate details.</div>
          )}
        </div>

        <button
          onClick={approve}
          disabled={isApproving || isLoading || !service}
          className="w-full flex justify-center items-center gap-2 bg-emerald-600 text-white font-bold py-3.5 rounded-xl hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/30 disabled:opacity-75"
        >
          {isApproving ? "Approving..." : "Approve & Continue Service"}
          {!isApproving && <CheckCircle className="w-4 h-4 ml-1" />}
        </button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-slate-300" />
          <span>Mechanic will only proceed upon your confirmation</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ApprovalPage;