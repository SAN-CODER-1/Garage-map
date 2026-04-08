import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CompletePage() {

  const { bookingId } = useParams();

  const complete = async () => {

    await axios.put(
      `http://localhost:8080/service-history/${bookingId}/complete?finalCost=500`
    );

    alert("Service Completed");
  };

  return (
    <div className="p-10">

      <h1 className="text-xl font-bold mb-4">
        Complete Service
      </h1>

      <button
        onClick={complete}
        className="bg-blue-600 text-white px-4 py-2"
      >
        Finish Service
      </button>

    </div>
  );
}

export default CompletePage;