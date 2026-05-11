import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const SCHOOL_LAT = 10.30043;
const SCHOOL_LNG = 123.87942;

type LayerKey = "light" | "satellite";

const TILE_URLS: Record<LayerKey, string> = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  satellite:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
};

const SchoolMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const lineRef = useRef<L.Polyline | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [layer, setLayer] = useState<LayerKey>("light");

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [SCHOOL_LAT, SCHOOL_LNG],
      zoom: 17,
      scrollWheelZoom: false,
    });
    mapInstance.current = map;

    tileLayerRef.current = L.tileLayer(TILE_URLS.light, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    const goldIcon = L.divIcon({
      className: "",
      html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:#FFD700;border:3px solid #0a1628;transform:rotate(-45deg);box-shadow:0 4px 12px rgba(255,215,0,0.6);"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });

    L.marker([SCHOOL_LAT, SCHOOL_LNG], { icon: goldIcon })
      .addTo(map)
      .bindPopup(
        "📍 <b>Cebu City National Science High School</b><br/>Salvador Street, Labangon, Cebu City 6000"
      )
      .openPopup();

    return () => {
      map.remove();
      mapInstance.current = null;
      tileLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    if (!map) return;
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }
    tileLayerRef.current = L.tileLayer(TILE_URLS[layer], {
      attribution:
        layer === "satellite"
          ? "Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics"
          : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);
  }, [layer]);

  const findMyLocation = () => {
    if (!navigator.geolocation || !mapInstance.current) {
      setInfo("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const map = mapInstance.current!;
        const userLat = pos.coords.latitude;
        const userLng = pos.coords.longitude;

        const blueIcon = L.divIcon({
          className: "",
          html: `<div style="width:22px;height:22px;border-radius:50%;background:#3b82f6;border:3px solid #fff;box-shadow:0 0 0 4px rgba(59,130,246,0.3);"></div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        if (userMarkerRef.current) userMarkerRef.current.remove();
        if (lineRef.current) lineRef.current.remove();

        userMarkerRef.current = L.marker([userLat, userLng], { icon: blueIcon })
          .addTo(map)
          .bindPopup("📍 You are here");

        lineRef.current = L.polyline(
          [
            [userLat, userLng],
            [SCHOOL_LAT, SCHOOL_LNG],
          ],
          { color: "#FFD700", weight: 3, dashArray: "8, 8" }
        ).addTo(map);

        const distMeters = map.distance([userLat, userLng], [SCHOOL_LAT, SCHOOL_LNG]);
        const km = distMeters / 1000;
        const walkMin = Math.round((km / 5) * 60);
        const driveMin = Math.round((km / 40) * 60);

        setInfo(
          `Distance: ${km.toFixed(2)} km · 🚶 ~${walkMin} min walking · 🚗 ~${driveMin} min driving`
        );

        map.fitBounds(
          [
            [userLat, userLng],
            [SCHOOL_LAT, SCHOOL_LNG],
          ],
          { padding: [50, 50] }
        );
        setLoading(false);
      },
      (err) => {
        setInfo(`Unable to get location: ${err.message}`);
        setLoading(false);
      }
    );
  };

  const getDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${SCHOOL_LAT},${SCHOOL_LNG}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="mt-12">
      <h4 className="font-heading font-bold text-gold text-2xl mb-4">📍 Find Us</h4>
      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={findMyLocation}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a1628]/60 border-2 border-gold text-gold font-medium text-sm transition-all duration-200 hover:bg-gold hover:text-[#0a1628] disabled:opacity-60"
        >
          {loading ? "Locating..." : "📍 Find My Location"}
        </button>
        <button
          onClick={getDirections}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-[#0a1628] font-medium text-sm transition-all duration-200 hover:bg-gold/90"
        >
          🗺️ Get Directions
        </button>
      </div>
      {info && (
        <p className="text-white/80 text-sm mb-3 bg-[#0a1628]/60 border border-gold/30 rounded-lg px-4 py-2">
          {info}
        </p>
      )}
      <div className="relative">
        <div className="absolute top-3 right-3 z-[400] flex gap-1 p-1 rounded-full bg-[#0a1628]/80 border border-gold/40 backdrop-blur-sm">
          {(["light", "satellite"] as LayerKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setLayer(key)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                layer === key
                  ? "bg-gold text-[#0a1628]"
                  : "border border-gold text-gold hover:bg-gold/10"
              }`}
            >
              {key === "light" ? "Light" : "Satellite"}
            </button>
          ))}
        </div>
        <div
          ref={mapRef}
          className="w-full rounded-xl border border-gold/30 overflow-hidden"
          style={{ height: "400px" }}
        />
      </div>
    </div>
  );
};

export default SchoolMap;