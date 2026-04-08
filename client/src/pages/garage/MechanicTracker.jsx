import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MechanicTracker({ booking }) {

  const clientRef = useRef(null);
  const intervalRef = useRef(null);
  const reachedRef = useRef(false); // ✅ avoid duplicate calls
  const navigate = useNavigate();

  useEffect(() => {

    if (!booking || !booking.id || !booking.bookingLocationLat) {
      console.log("❌ Booking not ready");
      return;
    }

    let currentLat =
      booking.bookingLocationLat + (Math.random() * 0.1 + 0.05);

    let currentLng =
      booking.bookingLocationLng + (Math.random() * 0.1 + 0.05);

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000
    });

    clientRef.current = client;

    client.onConnect = () => {

      console.log("🟢 Mechanic tracking started");

      intervalRef.current = setInterval(async () => {

        if (!client.connected) return;

        // 🚗 Move toward user
        currentLat += (booking.bookingLocationLat - currentLat) * 0.32;
        currentLng += (booking.bookingLocationLng - currentLng) * 0.32;

        const payload = {
          bookingId: booking.id,
          lat: currentLat,
          lng: currentLng
        };

        client.publish({
          destination: "/app/mechanic-location",
          body: JSON.stringify(payload)
        });

        // 📏 Distance check
        const distance =
          Math.abs(currentLat - booking.bookingLocationLat) +
          Math.abs(currentLng - booking.bookingLocationLng);

        // ✅ ARRIVAL LOGIC
        if (distance < 0.0001 && !reachedRef.current) {

          reachedRef.current = true;

          console.log("✅ Mechanic reached destination");

          clearInterval(intervalRef.current);

          try {

            // 1️⃣ Update status → REACHED (generates QR token backend)
            await axios.put(
              `http://localhost:8080/bookings/${booking.id}/status?status=REACHED`,
              {},
              { withCredentials: true }
            );

            // 2️⃣ Navigate to scan page (mechanic scans user QR)
            navigate(`/scan/${booking.id}`);

          } catch (err) {
            console.error("❌ Failed to update status", err);
          }
        }

      }, 2000);

    };

    client.activate();

    return () => {

      console.log("🔴 Tracking stopped");

      if (intervalRef.current) clearInterval(intervalRef.current);

      if (clientRef.current) clientRef.current.deactivate();

    };

  }, [booking, navigate]);

  return null;
}

export default MechanicTracker;