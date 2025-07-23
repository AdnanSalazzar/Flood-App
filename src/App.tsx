import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FloodMapPage from "./pages/FloodMapPage";
import SafeRoutePage from "./pages/SafeRoutePage";
import ChatAssistantPage from "./pages/ChatAssistantPage";
import ReportFloodPage from "./pages/ReportFloodPage";
import SettingsPage from "./pages/SettingsPage";
import FloodAlertPage from "./pages/FloodAlertPage";
import FloodGuidePage from "./pages/FloodGuidePage";
import LoginPage from './pages/LoginPage';
import AddShelterForm from './pages/AddShelterForm';
import NotFound from "./pages/NotFound";
import EmergencySosPage from "./pages/EmergencySosPage";
import GalleryPage from "@/pages/GalleryPage";





const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/map" element={<FloodMapPage />} />
            <Route path="/safe-route" element={<SafeRoutePage />} />
            <Route path="/chat" element={<ChatAssistantPage />} />
            <Route path="/report" element={<ReportFloodPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/alert" element={<FloodAlertPage />} />
            <Route path="/guide" element={<FloodGuidePage />} />
            <Route path="/add-shelter" element={<LoginPage />} />
            <Route path="/add-shelter-form" element={<AddShelterForm />} />
            <Route path="/emergency-sos" element={<EmergencySosPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
