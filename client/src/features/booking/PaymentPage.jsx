import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle, ShieldCheck, IndianRupee } from "lucide-react";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isPaying, setIsPaying] = useState(false);
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

  const pay = async () => {
    if (!service) return;
    setIsPaying(true);

    try {
      // 🔥 simulate payment (later integrate Razorpay)
      const fakePaymentId = "PAY_" + Date.now();

      await axios.put(
        `http://localhost:8080/service-history/${service.id}/pay?paymentId=${fakePaymentId}`,
        {},
        { withCredentials: true }
      );

      navigate(`/complete/${bookingId}`); // ✅ Go to complete page
    } catch (err) {
      console.error(err);
      alert("❌ Payment Failed. Please try again.");
      setIsPaying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Secure Checkout
        </h1>
        <p className="text-slate-500 text-sm mt-2 mb-8">
          The service is complete. Please pay the final balance to wrap up.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-8 text-center shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Final Amount</p>
          {isLoading ? (
            <Skeleton className="h-12 w-32 mx-auto" />
          ) : (
            <div className="flex justify-center items-center gap-1">
              <IndianRupee className="w-6 h-6 text-slate-900" />
              <span className="text-4xl font-extrabold text-slate-900">
                {service?.finalCost || "0"}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={pay}
          disabled={isPaying || isLoading || !service}
          className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-slate-800 transition shadow-xl shadow-slate-900/10 disabled:opacity-75"
        >
          {isPaying ? "Processing..." : "Pay Now (Test Mode)"}
          {!isPaying && <CheckCircle className="w-5 h-5 ml-1" />}
        </button>

        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secured by WheelConnect Payments</span>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentPage;
