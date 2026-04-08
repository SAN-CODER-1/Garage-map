import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ApprovalPage() {

  const { bookingId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/service-history/booking/${bookingId}`
      );
      setService(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch service", err);
    }
  };

  const approve = async () => {

    if (!service || !service.id) {
      console.error("❌ Service not loaded");
      return;
    }

    try {
      await axios.put(
        `http://localhost:8080/service-history/${service.id}/approve`,
        {},
        { withCredentials: true }
      );

      alert("✅ Approved");

    } catch (err) {
      console.error("❌ Approve failed", err);
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-xl font-bold mb-4">
        Approve Service
      </h1>

      {service ? (
        <>
          <p><b>Problem:</b> {service.problemDescription}</p>
          <p><b>Cost:</b> ₹{service.estimatedCost}</p>

          <button
            onClick={approve}
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
          >
            Approve
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
}

export default ApprovalPage;