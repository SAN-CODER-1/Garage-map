import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/shared/GlassCard';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const customIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface MapStepProps {
  location: { lat: number; lng: number } | null;
  onLocationSelect: (lat: number, lng: number) => void;
  onNext: () => void;
  onBack: () => void;
}

const LocationMarker = ({ 
  position, 
  onLocationSelect 
}: { 
  position: LatLng | null; 
  onLocationSelect: (lat: number, lng: number) => void;
}) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} icon={customIcon} /> : null;
};

const RecenterButton = ({ onRecenter }: { onRecenter: () => void }) => {
  const map = useMap();
  
  const handleRecenter = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          map.setView([pos.coords.latitude, pos.coords.longitude], 15);
          onRecenter();
        },
        () => {
          // Default to a central location if geolocation fails
          map.setView([40.7128, -74.0060], 13);
        }
      );
    }
  };

  return (
    <button
      onClick={handleRecenter}
      className="absolute top-4 right-4 z-[1000] p-3 rounded-lg bg-card/90 backdrop-blur-sm border border-primary/30 text-primary hover:bg-primary/20 transition-all"
    >
      <Navigation className="w-5 h-5" />
    </button>
  );
};

const MapStep = ({ location, onLocationSelect, onNext, onBack }: MapStepProps) => {
  const [mapReady, setMapReady] = useState(false);
  const position = location ? new LatLng(location.lat, location.lng) : null;
  const defaultCenter: [number, number] = [40.7128, -74.0060];

  useEffect(() => {
    setMapReady(true);
  }, []);

  return (
    <GlassCard>
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold gradient-text mb-2">
          Select Location
        </h2>
        <p className="text-muted-foreground">
          Click on the map to mark where you lost the item
        </p>
      </div>

      <div className="relative map-container">
        {mapReady && (
          <MapContainer
            center={defaultCenter}
            zoom={13}
            className="w-full h-full"
            style={{ background: 'hsl(220 20% 6%)' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <LocationMarker 
              position={position} 
              onLocationSelect={onLocationSelect} 
            />
            <RecenterButton onRecenter={() => {}} />
          </MapContainer>
        )}
        
        {!location && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-4 left-4 right-4 z-[1000] p-3 rounded-lg bg-card/90 backdrop-blur-sm border border-primary/30 flex items-center gap-2"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Click anywhere on the map to mark the location
            </span>
          </motion.div>
        )}
      </div>

      {location && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center gap-2"
        >
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm">
            Selected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </span>
        </motion.div>
      )}

      <div className="flex justify-between mt-6">
        <Button variant="neon-outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="neon" 
          size="lg"
          onClick={onNext}
          disabled={!location}
        >
          Continue to Details
        </Button>
      </div>
    </GlassCard>
  );
};

export default MapStep;
