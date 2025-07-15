import { useEffect, useState } from 'react';
import axios from 'axios';

export const useFloodRisk = () => {
  const [riskLevel, setRiskLevel] = useState<string>('loading');

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        const response = await axios.get('https://api.openepi.io/flood/summary', {
          params: {
            min_lon: 2.683588,
            max_lon: 14.677982,
            min_lat: 4.272259,
            max_lat: 13.892006,
          },
        });

        const features = response.data?.queried_location?.features;
        console.log('Flood API response:', response.data);

        if (!features || features.length === 0) {
          setRiskLevel('low');
          return;
        }

        const properties = features[0].properties;

        // Example simple logic using probability thresholds:
        const {
          max_p_above_20y,
          max_p_above_5y,
          max_p_above_2y,
          intensity,
        } = properties;

        let level = 'low';

        if (max_p_above_20y >= 0.75 || intensity === 'H') {
          level = 'high';
        } else if (max_p_above_5y >= 0.5 || intensity === 'P') {
          level = 'moderate';
        }

        console.log('Flood API features:', features);
        console.log('Determined flood risk level:', level);

        setRiskLevel(level);
      } catch (error) {
        console.error('Flood API error:', error);
        setRiskLevel('low');
      }
    };

    fetchRisk();
  }, []);

  return riskLevel;
};
