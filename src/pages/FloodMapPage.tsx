import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { FloodMap } from "@/components/FloodMap";

import {
  ArrowLeft,
  MapPin,
  Home,
  Shield,
  Navigation,
  Layers,
  Satellite,
} from "lucide-react";

import { Feature, Polygon } from "geojson";

interface FloodProperties {
  issued_on: string;
  peak_step: number;
  peak_day: string;
  peak_timing: string;
  max_median_dis: number;
  min_median_dis: number;
  control_dis: number;
  max_max_dis: number;
  min_min_dis: number;
  tendency: string;
  max_p_above_20y: number;
  max_p_above_5y: number;
  max_p_above_2y: number;
  intensity: string;
}

interface UserShelter {
  name: string;
  latitude: string;
  longitude: string;
  capacity: string;
}

type FloodFeature = Feature<Polygon, FloodProperties>;

const FloodMapPage = () => {
  const navigate = useNavigate();
  const [isSatelliteView, setIsSatelliteView] = useState(false);
  const [floodZones, setFloodZones] = useState<FloodFeature[]>([]);
  const [debugMode, setDebugMode] = useState(false);

  const simulatedFloodZones: FloodFeature[] = [
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [8.65, 9.05],
            [8.65, 9.1],
            [8.7, 9.1],
            [8.7, 9.05],
            [8.65, 9.05],
          ],
        ],
      },
      properties: {
        issued_on: "2025-07-15",
        peak_step: 1,
        peak_day: "2025-07-18",
        peak_timing: "AM",
        max_median_dis: 350,
        min_median_dis: 200,
        control_dis: 300,
        max_max_dis: 420,
        min_min_dis: 120,
        tendency: "U",
        max_p_above_20y: 1,
        max_p_above_5y: 1,
        max_p_above_2y: 1,
        intensity: "H",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [8.72, 9.08],
            [8.72, 9.13],
            [8.77, 9.13],
            [8.77, 9.08],
            [8.72, 9.08],
          ],
        ],
      },
      properties: {
        issued_on: "2025-07-15",
        peak_step: 2,
        peak_day: "2025-07-19",
        peak_timing: "PM",
        max_median_dis: 260,
        min_median_dis: 180,
        control_dis: 240,
        max_max_dis: 310,
        min_min_dis: 100,
        tendency: "S",
        max_p_above_20y: 0,
        max_p_above_5y: 1,
        max_p_above_2y: 1,
        intensity: "P",
      },
    },
  ];
  const storedShelters = JSON.parse(
    localStorage.getItem("userShelters") || "[]"
  );
  const shelters = [
    {
      id: 1,
      name: "Community Center",
      distance: "0.5 km",
      capacity: "500 people",
    },
    {
      id: 2,
      name: "School Building",
      distance: "1.2 km",
      capacity: "300 people",
    },
    { id: 3, name: "Hospital", distance: "2.1 km", capacity: "200 people" },

    ...storedShelters.map((shelter: UserShelter, idx: number) => ({
      id: 100 + idx,
      name: shelter.name,
      distance: `${Math.random().toFixed(2)} km`, // You can calculate using coordinates later
      capacity: `${shelter.capacity} people`,
    })),
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500";
      case "moderate":
        return "bg-amber-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const fetchFloodZones = async () => {
    if (debugMode) return;
    try {
      const response = await axios.get("https://api.openepi.io/flood/summary", {
        params: {
          min_lon: 33.5,
          max_lon: 34.55,
          min_lat: -1.4,
          max_lat: -1.3,

          /* min_lon: 2.683588,
          max_lon: 14.677982,
          min_lat: 4.272259,
          max_lat: 13.892006, */

          /* min_lon: 11.0,
          max_lon: 30.0,
          min_lat: -7.0,
          max_lat: 5.0, */
        },
      });
      const features = response.data?.queried_location?.features || [];
      setFloodZones(features);
    } catch (err) {
      console.error("Failed to fetch flood zones:", err);
      setFloodZones([]);
    }
  };

  console.log("Flood Zones:", floodZones);

  useEffect(() => {
    if (debugMode) {
      setFloodZones(simulatedFloodZones);
    } else {
      fetchFloodZones();
    }
  }, [debugMode]);

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate("/")}>
          {" "}
          <ArrowLeft className="h-6 w-6 mr-2" /> Back{" "}
        </Button>
        <h1 className="text-2xl font-bold">Live Flood Map</h1>
        <div className="w-20" />
      </div>

      {/* Toggle Debug Mode */}
      <Card className="mb-4">
        <CardContent className="p-4 flex items-center justify-between">
          <span className="font-medium">Simulate Flood Zones (Debug)</span>
          <Switch
            checked={debugMode}
            onCheckedChange={(checked) => setDebugMode(checked)}
          />
        </CardContent>
      </Card>

      {/* Map View Toggle */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {" "}
              <Layers className="h-5 w-5 mr-2" />{" "}
              <span className="font-medium">Map View</span>{" "}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Regular</span>
              <Switch
                checked={isSatelliteView}
                onCheckedChange={setIsSatelliteView}
              />
              <span className="text-sm">Satellite</span>
              <Satellite className="h-4 w-4 ml-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="mb-6 h-96">
        <CardContent className="p-0 h-full overflow-hidden">
          <FloodMap isSatellite={isSatelliteView} floodZones={floodZones} />
        </CardContent>
      </Card>

      {/* Current Location */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center">
            <div className="bg-blue-500 p-2 rounded-full mr-3">
              <Navigation className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="font-semibold">Your Location</p>
              <p className="text-sm text-muted-foreground">
                Nigeria, Safe Zone
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flood Zones */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Shield className="h-6 w-6 mr-2 text-red-500" /> Flood Affected Areas
        </h2>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {floodZones.length === 0 ? (
            <div className="text-center text-muted-foreground text-sm italic">
              No flood zones currently forecasted in Nigeria.
            </div>
          ) : (
            floodZones.map((zone, idx) => {
              const severityCode = zone.properties.intensity;
              const severity =
                severityCode === "H"
                  ? "high"
                  : severityCode === "P"
                  ? "moderate"
                  : "low";

              return (
                <Card key={idx}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-4 h-4 rounded-full ${getSeverityColor(
                            severity
                          )} mr-3`}
                        />
                        <div>
                          <p className="font-semibold">Zone {idx + 1}</p>
                          <p className="text-sm text-muted-foreground">
                            Peak Day: {zone.properties.peak_day}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-muted rounded capitalize">
                        {severity} Risk
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Nearby Shelters */}
      <div className="mb-20">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Home className="h-6 w-6 mr-2 text-green-500" /> Nearby Shelters
        </h2>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {shelters.map((shelter) => (
            <Card key={shelter.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{shelter.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {shelter.distance} • {shelter.capacity}
                    </p>
                  </div>
                  <Button size="sm" onClick={() => navigate("/safe-route")}>
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloodMapPage;
