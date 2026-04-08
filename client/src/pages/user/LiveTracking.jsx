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
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
function Routing({ mechanicLocation, userLocation, onReached }) {

  const map = useMap();
  const routingRef = useRef(null);
  const reachedRef = useRef(false); // ✅ prevent multiple triggers

  useEffect(() => {

    if (!mechanicLocation || !userLocation) return;

    // ✅ Validate coords
    if (
      isNaN(mechanicLocation.lat) ||
      isNaN(mechanicLocation.lng) ||
      isNaN(userLocation.lat) ||
      isNaN(userLocation.lng)
    ) return;

    // 📏 Distance check
    const distance =
      Math.abs(mechanicLocation.lat - userLocation.lat) +
      Math.abs(mechanicLocation.lng - userLocation.lng);

    // ✅ ARRIVAL LOGIC
    if (distance < 0.0001 && !reachedRef.current) {
      reachedRef.current = true;
      console.log("✅ Mechanic reached destination");

      if (onReached) onReached();
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
        const bounds = e.routes[0].bounds;
        if (bounds?.isValid()) {
          map.fitBounds(bounds);
        }
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
  const navigate = useNavigate();

  const userLocation = booking?.bookingLocationLat
    ? {
        lat: booking.bookingLocationLat,
        lng: booking.bookingLocationLng
      }
    : null;

  // ✅ Handle arrival
  const handleReached = async () => {
    try {

      await axios.put(
        `http://localhost:8080/bookings/${booking.id}/status?status=REACHED`,
        {},
        { withCredentials: true }
      );

      // 👉 redirect to QR page
      navigate(`/start-service/${booking.id}`);

    } catch (err) {
      console.error("❌ Failed to update status", err);
    }
  };

  useEffect(() => {

    if (!booking?.id) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000
    });

    client.onConnect = () => {

      client.subscribe(`/topic/booking/${booking.id}`, (message) => {

        try {
          const data = JSON.parse(message.body);

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

    return () => client.deactivate();

  }, [booking]);

  return (

    <div className="h-[400px] w-full mt-6">

      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={13}
        style={{ height: "100%" }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

        {mechanicLocation && (
          <Marker position={[mechanicLocation.lat, mechanicLocation.lng]}>
            <Popup>🚗 Mechanic</Popup>
          </Marker>
        )}

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup>📍 You</Popup>
          </Marker>
        )}

        <Routing
          mechanicLocation={mechanicLocation}
          userLocation={userLocation}
          onReached={handleReached}
        />

      </MapContainer>

    </div>
  );
}

export default LiveTracking;