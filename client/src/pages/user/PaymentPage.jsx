import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PaymentPage() {

  const { bookingId } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetchService();
  }, []);

  const fetchService = async () => {
    const res = await axios.get(
      `http://localhost:8080/service-history/booking/${bookingId}`
    );
    setService(res.data);
  };

  const pay = async () => {
    try {

      // 🔥 simulate payment (later integrate Razorpay)
      const fakePaymentId = "PAY_" + Date.now();

      await axios.put(
        `http://localhost:8080/service-history/${service.id}/pay?paymentId=${fakePaymentId}`,
        {},
        { withCredentials: true }
      );

      alert("💰 Payment Successful");
      fetchService();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-10 text-center">

      <h1 className="text-xl font-bold mb-4">
        Payment Page
      </h1>

      {service && (
        <>
          <p><b>Final Cost:</b> ₹{service.finalCost}</p>

          <button
            onClick={pay}
            className="bg-green-600 text-white px-6 py-2 mt-4"
          >
            Pay Now
          </button>
        </>
      )}

    </div>
  );
}

export default PaymentPage;