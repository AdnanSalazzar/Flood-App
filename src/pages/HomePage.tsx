import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FloodStatusCard } from "@/components/FloodStatusCard";
import { Image } from "lucide-react";

import {
  MapPin,
  LifeBuoy,
  Navigation,
  BookOpen,
  Phone,
  AlertTriangle,
  Settings,
  MessageCircle,
  Camera,
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const floodRiskLevel = "moderate"; // This would come from API in real app

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "flood-low";
      case "moderate":
        return "flood-moderate";
      case "high":
        return "flood-high";
      default:
        return "flood-low";
    }
  };

  const getRiskText = (level: string) => {
    switch (level) {
      case "low":
        return "Low Risk";
      case "moderate":
        return "Moderate Risk";
      case "high":
        return "High Risk";
      default:
        return "Unknown";
    }
  };

  const mainActions = [
    {
      title: "Live Map",
      icon: MapPin,
      path: "/map",
      gradient: "gradient-water",
    },
    {
      title: "Get Help",
      icon: LifeBuoy,
      path: "/chat",
      gradient: "gradient-safe",
    },
    {
      title: "Safe Routes",
      icon: Navigation,
      path: "/safe-route",
      gradient: "gradient-water",
    },
    {
      title: "Flood Guide",
      icon: BookOpen,
      path: "/guide",
      gradient: "gradient-safe",
    },
  ];

  const quickActions = [
    {
      title: "Report Flood",
      icon: Camera,
      path: "/report",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
    {
      title: "Add Safe Route",
      icon: Navigation,
      path: "/add-shelter",
    },
    {
      title: "Flood Gallery",
      icon: Image,
      path: "/gallery",
    },
    {
      title: "Register as Volunteer",
      icon: LifeBuoy, // or choose another icon
      path: "/register-volunteer",
    },
    {
      title: "Offline Chat",
      icon: MessageCircle,
      path: "/offline-chat",
    },
  ];

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* Header */}
      <div className="text-center mb-8 mt-6">
        <h1 className="text-3xl font-bold text-primary mb-2 animate-slide-down">
          Flood Guardian
        </h1>
        <p className="text-muted-foreground text-lg">
          Stay safe, stay informed
        </p>
      </div>

      {/* Flood Risk Status */}
      <FloodStatusCard />

      {/* Main Action Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {mainActions.map((action, index) => (
          <Card
            key={action.title}
            className="cursor-pointer transform transition-all duration-200 hover:scale-105 active:scale-95"
            onClick={() => navigate(action.path)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent
              className={`p-6 ${action.gradient} text-white rounded-lg h-32 flex flex-col items-center justify-center`}
            >
              <action.icon className="h-10 w-10 mb-2" />
              <span className="text-lg font-semibold text-center">
                {action.title}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {quickActions.map((action, index) => (
          <Button
            key={action.title}
            variant="outline"
            size="lg"
            className="h-16 text-lg font-medium"
            onClick={() => navigate(action.path)}
          >
            <action.icon className="h-6 w-6 mr-2" />
            {action.title}
          </Button>
        ))}
      </div>

      {/* Emergency SOS Button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Button
          size="lg"
          className="bg-red-500 hover:bg-red-600 text-white rounded-full px-8 py-4 text-xl font-bold shadow-2xl animate-pulse-slow"
          onClick={() => navigate("/emergency-sos")}
        >
          <Phone className="h-8 w-8 mr-2" />
          EMERGENCY SOS
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
