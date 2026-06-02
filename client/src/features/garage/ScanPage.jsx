import React, { useRef } from "react";
import QrReader from "react-qr-scanner";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ScanPage() {

  const scannedRef = useRef(false);
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const handleScan = async (data) => {

    if (!data || scannedRef.current) return;

    scannedRef.current = true;

    try {

      const parsed = JSON.parse(data.text);

      await axios.put(
        `http://localhost:8080/service-history/${parsed.bookingId}/start-secure?token=${parsed.token}`,
        {},
        { withCredentials: true }
      );

      // ✅ redirect to mechanic work page
      navigate(`/mechanic-work/${parsed.bookingId}`);

    } catch (err) {
      console.error(err);
      scannedRef.current = false;
    }
  };

  return (
    <div className="p-10">
      <h1>Scan QR to Start Service</h1>

      <QrReader
        delay={300}
        onError={(err) => console.error(err)}
        onScan={handleScan}
      />
    </div>
  );
}

export default ScanPage;
