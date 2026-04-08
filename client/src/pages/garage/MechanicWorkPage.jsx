import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function MechanicWorkPage() {

  const { bookingId } = useParams();

  const [problem, setProblem] = useState("");
  const [cost, setCost] = useState("");
  const [finalCost, setFinalCost] = useState("");
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

  // 🔧 Submit problem
  const submit = async () => {
    try {
      await axios.put(
        `http://localhost:8080/service-history/booking/${bookingId}/identify`,
        {
          problemDescription: problem,
          estimatedCost: cost
        },
        { withCredentials: true }
      );

      alert("✅ Problem submitted for approval");
      fetchService();

    } catch (err) {
      console.error(err);
      alert("❌ Start service first");
    }
  };

  // 🚗 Tow case
  const tow = async () => {
    await axios.put(
      `http://localhost:8080/service-history/booking/${bookingId}/tow`,
      {},
      { withCredentials: true }
    );
    alert("🚗 Towing required");
    fetchService();
  };

  // 📅 Multi-day
  const multiDay = async () => {
    await axios.put(
      `http://localhost:8080/service-history/booking/${bookingId}/multi-day?days=2`,
      {},
      { withCredentials: true }
    );
    alert("📅 Multi-day work");
    fetchService();
  };

  // ▶️ Start work after approval
  const startWork = async () => {
    try {
      await axios.put(
        `http://localhost:8080/service-history/booking/${bookingId}/start-work`,
        {},
        { withCredentials: true }
      );

      alert("🛠 Work started");
      fetchService();

    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Complete work
  const completeWork = async () => {
    try {
      await axios.put(
        `http://localhost:8080/service-history/booking/${bookingId}/complete`,
        {
          finalCost: finalCost
        },
        { withCredentials: true }
      );

      alert("✅ Work completed");
      fetchService();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 space-y-4">

      <h1 className="text-xl font-bold">Mechanic Work Page</h1>

      {/* 🔍 Show status */}
      {service && (
        <div className="bg-gray-100 p-4">
          <p><b>Status:</b> {service.status}</p>
          <p><b>Approved:</b> {service.approved ? "Yes" : "No"}</p>
        </div>
      )}

      {/* 🔧 Problem input */}
      <textarea
        placeholder="Describe problem"
        className="border p-2 w-full"
        onChange={(e) => setProblem(e.target.value)}
      />

      <input
        placeholder="Estimated cost"
        className="border p-2 w-full"
        onChange={(e) => setCost(e.target.value)}
      />

      <button onClick={submit} className="bg-green-600 text-white px-4 py-2">
        Submit Problem
      </button>

      {/* 🚗 Special cases */}
      <button onClick={tow} className="bg-red-500 text-white px-4 py-2">
        Tow Required
      </button>

      <button onClick={multiDay} className="bg-yellow-500 text-white px-4 py-2">
        Multi Day Work
      </button>

      {/* ▶️ Only after approval */}
      {service?.status === "APPROVED" && (
        <button
          onClick={startWork}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Start Work
        </button>
      )}

      {/* ✅ Complete */}
      {service?.status === "APPROVED" && (
        <>
          <input
            placeholder="Final cost"
            className="border p-2 w-full"
            onChange={(e) => setFinalCost(e.target.value)}
          />

          <button
            onClick={completeWork}
            className="bg-purple-700 text-white px-4 py-2"
          >
            Complete Work
          </button>
        </>
      )}

    </div>
  );
}

export default MechanicWorkPage;