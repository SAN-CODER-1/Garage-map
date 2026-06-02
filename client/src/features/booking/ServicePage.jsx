import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, Info, CreditCard, ChevronRight } from "lucide-react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

function ServicePage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let interval;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/service-history/booking/${bookingId}`,
          { withCredentials: true }
        );

        const data = res.data;
        setService(data);
        setIsLoading(false);

        // 🔥 AUTO NAVIGATION
        if (data.status === "PENDING_APPROVAL") {
          navigate(`/approval/${bookingId}`);
        }

        if (data.status === "PAYMENT_PENDING") {
          navigate(`/payment/${bookingId}`);
        }

        if (data.status === "COMPLETED" && data.paymentStatus === "PAID") {
          navigate(`/complete/${bookingId}`);
        }
      } catch (err) {
        console.error("❌ Fetch failed", err);
      }
    };

    // initial fetch
    fetchData();

    // ✅ polling every 3 sec
    interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, [bookingId, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-blue-500 overflow-hidden">
          <div className="h-full bg-blue-300 w-1/3 animate-[slide_1.5s_ease-in-out_infinite]" style={{ animationName: 'progress' }}></div>
        </div>

        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <Settings className="w-10 h-10 text-blue-600 animate-spin-slow" />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
            <div className="bg-emerald-500 w-3 h-3 rounded-full animate-pulse"></div>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Service In Progress
        </h1>
        <p className="text-slate-500 text-sm mb-8 px-4">
          The mechanic is currently inspecting and repairing your vehicle.
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left mb-6">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Status</p>
                  <p className="text-sm font-bold text-slate-900">{service?.status || "Analyzing..."}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Cost</p>
                  <p className="text-sm font-bold text-slate-900">₹{service?.estimatedCost || "Calculating..."}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 font-medium">Auto-refreshing status every 3 seconds...</p>
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes progress {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(300%); }
          }
        `}} />
      </motion.div>
    </div>
  );
}

export default ServicePage;
