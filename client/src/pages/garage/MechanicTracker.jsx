import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function MechanicTracker({ booking }) {

  const clientRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {

    if (!booking || !booking.id || !booking.bookingLocationLat) {
      console.log("❌ Booking not ready");
      return;
    }

    // 🔥 Start FAR from user (random realistic location)
    let currentLat =
      booking.bookingLocationLat + (Math.random() * 0.1 + 0.05);

    let currentLng =
      booking.bookingLocationLng + (Math.random() * 0.1 + 0.05);

    console.log("🚗 Mechanic START:", currentLat, currentLng);
    console.log("🎯 User TARGET:", booking.bookingLocationLat, booking.bookingLocationLng);

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: (msg) => console.log("STOMP:", msg)
    });

    clientRef.current = client;

    client.onConnect = () => {

      console.log("🟢 Mechanic WebSocket Connected");

      intervalRef.current = setInterval(() => {

        if (!client.connected) return;

        // 🎯 Smooth movement toward user
        currentLat += (booking.bookingLocationLat - currentLat) * 0.02;
        currentLng += (booking.bookingLocationLng - currentLng) * 0.02;

        const payload = {
          bookingId: booking.id,
          lat: currentLat,
          lng: currentLng
        };

        console.log("📤 Sending:", payload);

        client.publish({
          destination: "/app/mechanic-location",
          body: JSON.stringify(payload)
        });

        // 🛑 Stop when close enough
        const distance =
          Math.abs(currentLat - booking.bookingLocationLat) +
          Math.abs(currentLng - booking.bookingLocationLng);

        if (distance < 0.0001) {
          console.log("✅ Mechanic reached destination");
          clearInterval(intervalRef.current);
        }

      }, 2000); // smooth updates

    };

    client.activate();

    return () => {

      console.log("🔴 Mechanic tracker stopped");

      if (intervalRef.current) clearInterval(intervalRef.current);

      if (clientRef.current) clientRef.current.deactivate();

    };

  }, [booking]);

  return null;
}

export default MechanicTracker;