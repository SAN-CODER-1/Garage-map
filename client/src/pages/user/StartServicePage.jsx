import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import axios from "axios";

function StartServicePage() {

  const { bookingId } = useParams();
  const navigate = useNavigate();

  const qrData = JSON.stringify({
    bookingId,
    token: "test-token" // ⚠️ must match backend qrToken
  });

  // ✅ Simulate scan (same as mechanic scanning QR)
  const simulateScan = async () => {
    try {

      await axios.put(
        `http://localhost:8080/service-history/${bookingId}/start-secure?token=test-token`,
        {},
        { withCredentials: true }
      );

      alert("✅ Simulated Scan → Service Started");

      // 👉 redirect to mechanic work page
      navigate(`/mechanic-work/${bookingId}`);

    } catch (err) {
      console.error(err);
      alert("❌ Scan failed (check token / backend)");
    }
  };

  return (
    <div className="p-10 text-center space-y-6">

      <h1 className="text-2xl font-bold">
        Scan to Start Service
      </h1>

      <div className="flex justify-center">
        <QRCode value={qrData} size={220} />
      </div>

      <p>
        Mechanic scan this QR to start
      </p>

      {/* ✅ Simulate button */}
      <button
        onClick={simulateScan}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Simulate Scan (Testing)
      </button>

    </div>
  );
}

export default StartServicePage;