// src/pages/RegisterVolunteerPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const nigerianLocations = [
  "Lagos", "Abuja", "Kano", "Port Harcourt", "Ibadan", "Jos", "Enugu", "Maiduguri",
];

const RegisterVolunteerPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const newVolunteer = { name, phone, location };
    const stored = localStorage.getItem("volunteers");
    const volunteers = stored ? JSON.parse(stored) : [];
    volunteers.push(newVolunteer);
    localStorage.setItem("volunteers", JSON.stringify(volunteers));
    alert("Volunteer registered successfully!");
    navigate("/"); // or navigate("/safe-route")
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Register as Volunteer</h1>
      <Card>
        <CardContent className="space-y-4 p-6">
          <Input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <select
            className="w-full border rounded px-3 py-2"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {nigerianLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <Button onClick={handleRegister} disabled={!name || !phone || !location}>
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterVolunteerPage;
