import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PartyPopper, CheckCircle, Star, Home, ShieldCheck } from "lucide-react";

function ServiceCompleted() {
  const { bookingId } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-white rounded-3xl p-8 md:p-10 shadow-2xl shadow-emerald-900/5 border border-slate-100 text-center relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 opacity-20 transform rotate-12">
          <PartyPopper className="w-48 h-48 text-emerald-400" />
        </div>

        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10"
        >
          <CheckCircle className="w-12 h-12 text-emerald-600" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 border-4 border-emerald-400 rounded-full"
          ></motion.div>
        </motion.div>

        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2 relative z-10">
          Service Completed!
        </h1>
        <p className="text-slate-500 text-base mb-8 px-2 relative z-10">
          Your vehicle service for Booking <span className="font-bold text-slate-900">#{bookingId}</span> has successfully wrapped up and payment was secured.
        </p>

        <div className="space-y-4 relative z-10">
          <Link
            to={`/review/${bookingId}`}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 transition-all active:scale-95"
          >
            <Star className="w-5 h-5 fill-white" />
            Leave a Review
          </Link>

          <Link
            to="/dashboard"
            className="w-full flex justify-center items-center gap-2 bg-slate-100 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium relative z-10">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Thank you for choosing WheelConnect</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ServiceCompleted;
