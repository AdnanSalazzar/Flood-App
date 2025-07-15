import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useFloodRisk } from '@/hooks/useFloodRisk';

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low': return 'bg-green-200 text-green-800';
    case 'moderate': return 'bg-yellow-200 text-yellow-800';
    case 'high': return 'bg-red-200 text-red-800';
    default: return 'bg-gray-200 text-gray-800';
  }
};

const getRiskText = (level: string) => {
  switch (level) {
    case 'low': return 'Low Risk';
    case 'moderate': return 'Moderate Risk';
    case 'high': return 'High Risk';
    default: return 'Unknown';
  }
};

export const FloodStatusCard = () => {
  const floodRiskLevel = useFloodRisk();

  return (
    <Card className="mb-8 animate-slide-up">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-amber-500 mr-2" />
            <h2 className="text-xl font-semibold">Current Flood Risk</h2>
          </div>
          {floodRiskLevel === 'loading' ? (
            <span className="text-muted-foreground">Loading...</span>
          ) : (
            <div className={`inline-block px-6 py-3 rounded-full text-xl font-bold ${getRiskColor(floodRiskLevel)} animate-pulse-slow`}>
              {getRiskText(floodRiskLevel)}
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-3">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
