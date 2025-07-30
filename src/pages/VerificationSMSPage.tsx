import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  BluetoothConnected,
  Bluetooth,
  Settings,
  WifiOff,
  MessageCircle,
  Send,
  UserPlus,
} from 'lucide-react';

const VerificationSMSPage = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSendSMS = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Message sent to ${phone}: "${message}"`);
    setPhone('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <BluetoothConnected className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-lg">Offline Message</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              <WifiOff className="h-3 w-3 mr-1" />
              Offline Mode
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Message Form */}
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Send an SMS</h2>
          <p className="text-sm text-muted-foreground">
            Enter the recipient's phone number and your message.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSendSMS}>
          <Input
            type="tel"
            placeholder="Phone Number (e.g., 08012345678)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </form>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          onClick={() => navigate('/register-volunteer')}
        >
          <UserPlus className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default VerificationSMSPage;
