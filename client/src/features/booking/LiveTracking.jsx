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
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

/* Fix Vite */
if (typeof global === "undefined") {
  window.global = window;
}
window.L = L;

/* ================= ROUTING ================= */
function Routing({ mechanicLocation, userLocation, onReached }) {
  const map = useMap();
  const routingRef = useRef(null);
  const reachedRef = useRef(false); 

  useEffect(() => {
    if (!mechanicLocation || !userLocation) return;

    if (
      isNaN(mechanicLocation.lat) ||
      isNaN(mechanicLocation.lng) ||
      isNaN(userLocation.lat) ||
      isNaN(userLocation.lng)
    ) return;

    const distance =
      Math.abs(mechanicLocation.lat - userLocation.lat) +
      Math.abs(mechanicLocation.lng - userLocation.lng);

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
        createMarker: () => null,
        lineOptions: {
          styles: [{ color: '#2563eb', opacity: 0.8, weight: 6 }]
        }
      }).addTo(map);

      routingRef.current.on("routesfound", (e) => {
        const bounds = e.routes[0].bounds;
        if (bounds?.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      });
    } else {
      routingRef.current.setWaypoints([
        L.latLng(mechanicLocation.lat, mechanicLocation.lng),
        L.latLng(userLocation.lat, userLocation.lng)
      ]);
    }
  }, [mechanicLocation, userLocation, map, onReached]);

  return null;
}

/* ================= MAIN ================= */
function LiveTracking({ booking }) {
  const [mechanicLocation, setMechanicLocation] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const navigate = useNavigate();

  const userLocation = booking?.bookingLocationLat
    ? {
        lat: booking.bookingLocationLat,
        lng: booking.bookingLocationLng
      }
    : null;

  const handleReached = async () => {
    try {
      await axios.put(
        `http://localhost:8080/bookings/${booking.id}/status?status=REACHED`,
        {},
        { withCredentials: true }
      );
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
      setConnectionStatus("Connected");
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

    client.onDisconnect = () => {
      setConnectionStatus("Disconnected");
    };

    client.activate();
    return () => client.deactivate();
  }, [booking]);

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-inner border border-slate-200">
      
      {/* Overlay Status UI */}
      <div className="absolute top-4 left-4 z-[400] flex gap-2 w-full pr-8 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur pointer-events-auto px-4 py-2.5 rounded-full shadow-lg border border-white/50 flex items-center gap-2"
        >
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${connectionStatus === 'Connected' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${connectionStatus === 'Connected' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
          </div>
          <span className="text-sm font-bold text-slate-800">{connectionStatus}</span>
        </motion.div>

        {!mechanicLocation && connectionStatus === "Connected" && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-blue-600 text-white pointer-events-auto px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2"
          >
            <Activity className="w-4 h-4 animate-spin-slow" />
            <span className="text-sm font-bold">Waiting for Mechanic Location...</span>
          </motion.div>
        )}
      </div>

      <MapContainer
        center={userLocation ? [userLocation.lat, userLocation.lng] : [11.0168, 76.9558]}
        zoom={14}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />

        {mechanicLocation && (
          <Marker position={[mechanicLocation.lat, mechanicLocation.lng]}>
            <Popup className="rounded-xl font-bold border-0 shadow-none"><div className="px-2">🚙 Mechanic Unit</div></Popup>
          </Marker>
        )}

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]}>
            <Popup className="rounded-xl font-bold border-0 shadow-none"><div className="px-2">📍 Breakdown Site</div></Popup>
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
