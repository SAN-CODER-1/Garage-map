import React, { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

/* Fix Vite */
if (typeof global === "undefined") {
  window.global = window;
}
window.L = L;

/* ================= ROUTING ================= */
function Routing({ mechanicLocation, userLocation }) {

  const map = useMap();
  const routingRef = useRef(null);

useEffect(() => {

  if (!mechanicLocation || !userLocation) return;

  // ✅ Validate coords
  if (
    isNaN(mechanicLocation.lat) ||
    isNaN(mechanicLocation.lng) ||
    isNaN(userLocation.lat) ||
    isNaN(userLocation.lng)
  ) {
    console.log("❌ Invalid coordinates");
    return;
  }

  // ✅ Stop when reached
  const distance =
    Math.abs(mechanicLocation.lat - userLocation.lat) +
    Math.abs(mechanicLocation.lng - userLocation.lng);

  if (distance < 0.0005) {
    console.log("✅ Reached destination → stop routing");
    return;
  }

  if (!routingRef.current) {

    routingRef.current = L.Routing.control({
      waypoints: [
        L.latLng(mechanicLocation.lat, mechanicLocation.lng),
        L.latLng(userLocation.lat, userLocation.lng)
      ],
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1"
      }),
      addWaypoints: false,
      draggableWaypoints: false,
      routeWhileDragging: false,
      show: false,
      createMarker: () => null
    }).addTo(map);

    routingRef.current.on("routesfound", (e) => {
      console.log("✅ Route found");

      const bounds = e.routes[0].bounds;

      if (bounds && bounds.isValid && bounds.isValid()) {
        map.fitBounds(bounds);
      }
    });

    routingRef.current.on("routingerror", (err) => {
      console.error("❌ Routing error:", err);
    });

  } else {

    routingRef.current.setWaypoints([
      L.latLng(mechanicLocation.lat, mechanicLocation.lng),
      L.latLng(userLocation.lat, userLocation.lng)
    ]);
  }

}, [mechanicLocation, userLocation]);

  return null;
}

/* ================= MAIN ================= */
function LiveTracking({ booking }) {

  const [mechanicLocation, setMechanicLocation] = useState(null);

  const userLocation = booking?.bookingLocationLat
    ? {
        lat: booking.bookingLocationLat,
        lng: booking.bookingLocationLng
      }
    : null;

  useEffect(() => {

    if (!booking?.id) {
      console.log("❌ No booking ID");
      return;
    }

    console.log("🔌 Connecting WebSocket...");

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      debug: (str) => console.log("STOMP:", str)
    });

    client.onConnect = () => {

      console.log("✅ WebSocket Connected");

      client.subscribe(`/topic/booking/${booking.id}`, (message) => {

        console.log("📩 Message received:", message.body);

        try {
          const data = JSON.parse(message.body);

          console.log("📍 Parsed location:", data);

          setMechanicLocation({
            lat: data.lat,
            lng: data.lng
          });

        } catch (err) {
          console.error("❌ JSON parse error", err);
        }

      });

    };

    client.activate();

    return () => {
      console.log("🔌 Disconnecting...");
      client.deactivate();
    };

  }, [booking]);

  return (

    <div className="h-[400px] w-full mt-6">

      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={13}
        style={{ height: "100%" }}
      >

        {/* ✅ FIXED TILE (avoid connection error) */}
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

        {/* Mechanic */}
        {mechanicLocation && (
          <Marker position={[mechanicLocation.lat, mechanicLocation.lng]}>
            <Popup>🚗 Mechanic</Popup>
          </Marker>
        )}

        {/* User */}
        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>📍 You</Popup>
          </Marker>
        )}

        {/* Route */}
        <Routing
          mechanicLocation={mechanicLocation}
          userLocation={userLocation}
        />

      </MapContainer>

    </div>
  );
}

export default LiveTracking;