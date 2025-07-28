import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { UserPlus, AlertCircle } from "lucide-react";

import {
  ArrowLeft,
  Settings,
  Globe,
  Wifi,
  MessageSquare,
  Phone,
  Bell,
  User,
  Shield,
  Info,
} from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("english");
  const [offlineMode, setOfflineMode] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emergencyContact, setEmergencyContact] = useState("");
  const [isPregnant, setIsPregnant] = useState(false);
  const [hasElderly, setHasElderly] = useState(false);
  const [hasChild, setHasChild] = useState(false);

  const [emergencyContacts, setEmergencyContacts] = useState([
    { name: "", phone: "" },
    { name: "", phone: "" },
    { name: "", phone: "" },
  ]);

  const handleContactChange = (
    index: number,
    field: "name" | "phone",
    value: string
  ) => {
    const updated = [...emergencyContacts];
    updated[index][field] = value;
    setEmergencyContacts(updated);
  };

  const languages = [
    { id: "english", label: "English", flag: "🇺🇸" },
    { id: "bangla", label: "বাংলা (Bangla)", flag: "🇧🇩" },
  ];

  const settingSections = [
    {
      title: "Language & Accessibility",
      icon: Globe,
      items: [
        {
          type: "select",
          label: "App Language",
          value: language,
          onChange: setLanguage,
          options: languages,
        },
      ],
    },
    {
      title: "Connectivity",
      icon: Wifi,
      items: [
        {
          type: "toggle",
          label: "Offline Mode",
          description: "Download maps and data for offline use",
          value: offlineMode,
          onChange: setOfflineMode,
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          type: "toggle",
          label: "Push Notifications",
          description: "Receive flood alerts and updates",
          value: pushNotifications,
          onChange: setPushNotifications,
        },
        {
          type: "toggle",
          label: "SMS Alerts",
          description: "Receive emergency alerts via SMS",
          value: smsAlerts,
          onChange: setSmsAlerts,
        },
      ],
    },
    {
      title: "Vulnerable Groups",
      icon: AlertCircle, // you can also use 'UserPlus' or any relevant icon
      items: [
        {
          type: "toggle",
          label: "Pregnant Woman in Household",
          description: "Get medical shelter info and maternity support alerts",
          value: isPregnant,
          onChange: setIsPregnant,
        },
        {
          type: "toggle",
          label: "Elderly in Household",
          description:
            "Receive evacuation assistance and mobility-safe route alerts",
          value: hasElderly,
          onChange: setHasElderly,
        },
        {
          type: "toggle",
          label: "Child in Household",
          description:
            "Get alerts tailored for children's needs and safe zones",
          value: hasChild,
          onChange: setHasChild,
        },
      ],
    },

    {
      title: "Emergency Contacts",
      icon: Phone,
      items: [],
    },
  ];

  const handleSave = () => {
    localStorage.setItem(
      "emergencyContacts",
      JSON.stringify(emergencyContacts)
    );
    alert("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={() => navigate("/")}>
          <ArrowLeft className="h-6 w-6 mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold flex items-center">
          <Settings className="h-7 w-7 mr-2 text-primary" />
          Settings
        </h1>
        <div className="w-20" />
      </div>

      {/* User Profile */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="bg-primary p-3 rounded-full">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Anonymous User</h3>
              <p className="text-sm text-muted-foreground">
                Location: Downtown District
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Sections */}
      {settingSections.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="mb-6">
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <section.icon className="h-6 w-6 mr-2 text-primary" />
              {section.title}
            </h3>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {item.type === "toggle" && (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.label}</p>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                      />
                    </div>
                  )}

                  {item.type === "select" && (
                    <div>
                      <p className="font-medium mb-2">{item.label}</p>
                      <div className="grid grid-cols-1 gap-2">
                        {item.options.map((option) => (
                          <Button
                            key={option.id}
                            variant={
                              item.value === option.id ? "default" : "outline"
                            }
                            className="justify-start h-12"
                            onClick={() => item.onChange(option.id)}
                          >
                            <span className="text-2xl mr-3">{option.flag}</span>
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.type === "input" && (
                    <div>
                      <p className="font-medium mb-2">{item.label}</p>
                      <Input
                        placeholder={item.placeholder}
                        value={item.value}
                        onChange={(e) => item.onChange(e.target.value)}
                        className="text-base"
                      />
                    </div>
                  )}
                </div>
              ))}
              {section.title === "Emergency Contacts" && (
                <div className="space-y-4">
                  {emergencyContacts.map((contact, index) => (
                    <div key={index} className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder={`Name ${index + 1}`}
                        value={contact.name}
                        onChange={(e) =>
                          handleContactChange(index, "name", e.target.value)
                        }
                      />
                      <Input
                        placeholder={`Phone ${index + 1}`}
                        value={contact.phone}
                        onChange={(e) =>
                          handleContactChange(index, "phone", e.target.value)
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* App Information */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Info className="h-6 w-6 mr-2 text-primary" />
            App Information
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>App Version</span>
              <span className="text-muted-foreground">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span className="text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Data Source</span>
              <span className="text-muted-foreground">
                Local Weather Service
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Safety */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-4 flex items-center">
            <Shield className="h-6 w-6 mr-2 text-green-500" />
            Privacy & Safety
          </h3>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Data Usage
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="mb-20">
        <Button
          onClick={handleSave}
          className="w-full h-14 text-lg font-semibold gradient-safe text-white border-0"
        >
          Save Settings
        </Button>
      </div>

      {/* Emergency Notice */}
      <Card className="bg-blue-50 border-blue-200 mb-4">
        <CardContent className="p-4">
          <p className="text-blue-800 text-sm text-center">
            <strong>Note:</strong> These settings help improve your flood safety
            experience. Emergency features work even with limited connectivity.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
