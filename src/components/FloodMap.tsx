import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

import { Feature, Polygon } from 'geojson';

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

type FloodFeature = Feature<Polygon, FloodProperties>;

interface FloodMapProps {
  isSatellite: boolean;
  floodZones: FloodFeature[];
}



export const FloodMap: React.FC<FloodMapProps> = ({ isSatellite, floodZones }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Destroy previous map instance
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Init map
    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: isSatellite
        ? 'https://tiles.stadiamaps.com/styles/alidade_satellite.json'
        : 'https://tiles.stadiamaps.com/styles/alidade_smooth.json',
      center: [8.6753, 9.082],
      zoom: 5,

    });

    mapRef.current = map;

    // Add flood zones
    map.on('load', () => {
      floodZones.forEach((zone, idx) => {
        const severityColor = {
          high: '#FF0000',
          moderate: '#FFA500',
          low: '#00FF00',
        }[zone.properties.intensity === 'H'
          ? 'high'
          : zone.properties.intensity === 'P'
          ? 'moderate'
          : 'low'];

        map.addSource(`flood-${idx}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: zone.geometry,
            properties: zone.properties,
          },
        });

        map.addLayer({
          id: `flood-layer-${idx}`,
          type: 'fill',
          source: `flood-${idx}`,
          paint: {
            'fill-color': severityColor,
            'fill-opacity': 0.4,
          },
        });

        // Add border
        map.addLayer({
          id: `flood-outline-${idx}`,
          type: 'line',
          source: `flood-${idx}`,
          paint: {
            'line-color': '#000',
            'line-width': 1,
          },
        });
      });
    });
  }, [isSatellite, floodZones]);

  return <div ref={mapContainer} className="w-full h-full rounded-lg" />;
};
