import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ServicePage() {

  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

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

        console.log("📊 Status:", data.status);

        // 🔥 AUTO NAVIGATION
        if (data.status === "PENDING_APPROVAL") {
          navigate(`/approval/${bookingId}`);
        }

        if (res.data.status === "PAYMENT_PENDING") {
  navigate(`/payment/${bookingId}`);
}

if (res.data.status === "COMPLETED" && res.data.paymentStatus === "PAID") {
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
    <div className="p-10 text-center">

      <h1 className="text-xl font-bold mb-4">
        🔧 Mechanic is working...
      </h1>

      {service && (
        <div className="mt-4 space-y-2">
          <p><b>Status:</b> {service.status}</p>
          <p><b>Estimated Cost:</b> ₹{service.estimatedCost || "—"}</p>
        </div>
      )}

    </div>
  );
}

export default ServicePage;