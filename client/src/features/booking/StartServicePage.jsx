import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";
import { motion } from "framer-motion";
import { ScanLine, Wrench } from "lucide-react";

function StartServicePage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const qrData = JSON.stringify({
    bookingId,
    token: "217e4a96-f20c-4feb-80c6-780e462ee1a7"
  });

  // ✅ Simulate scan (same as mechanic scanning QR)
  const simulateScan = async () => {
    setIsScanning(true);
    try {
      await axios.put(
        `http://localhost:8080/service-history/${bookingId}/start-secure?token=217e4a96-f20c-4feb-80c6-780e462ee1a7`,
        {},
        { withCredentials: true }
      );

      alert("✅ Simulated Scan → Service Started");

      // 👉 redirect to mechanic work page
      navigate(`/mechanic/${bookingId}`);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 500) {
         alert("❌ Server Error: Service not found. Make sure the mechanic has accepted this booking and the backend has generated a Service History record before scanning!");
      } else {
         alert("❌ Scan failed (check console for data)");
      }
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 pb-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl border border-slate-100 text-center"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
          <ScanLine className="w-8 h-8 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Start Service
        </h1>
        <p className="text-slate-500 text-sm mt-2 mb-8">
          The mechanic will scan this QR code to formally initiate your service session.
        </p>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl inline-block mb-8">
          <QRCode value={qrData} size={200} />
        </div>

        {/* ✅ Simulate button */}
        <button
          onClick={simulateScan}
          disabled={isScanning}
          className="w-full flex justify-center items-center gap-2 bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 disabled:opacity-75"
        >
          {isScanning ? "Scanning..." : "Simulate Mechanics Scan"}
          {!isScanning && <Wrench className="w-4 h-4 text-slate-400" />}
        </button>
      </motion.div>
    </div>
  );
}

export default StartServicePage;
