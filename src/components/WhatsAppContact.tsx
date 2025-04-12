
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";

const WhatsAppContact = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // Replace with your WhatsApp number
  const whatsappNumber = "1234567890";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      // Construct WhatsApp message URL
      const encodedMessage = encodeURIComponent(`Hello, my name is ${name}. ${message}`);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new window
      window.open(whatsappUrl, "_blank");
      
      // Show success toast
      toast.success("WhatsApp message prepared!");
      
      // Reset form
      setName("");
      setMessage("");
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      toast.error("Failed to open WhatsApp. Please try again.");
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-brand-800" />
          Contact our Holistic Healing Guide
        </CardTitle>
        <CardDescription>
          Have questions about your healing journey? Send us a message directly on WhatsApp.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Textarea
              placeholder="Your question about holistic healing..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSending}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {isSending ? "Preparing message..." : "Send WhatsApp Message"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-muted-foreground">
        Messages open directly in WhatsApp
      </CardFooter>
    </Card>
  );
};

export default WhatsAppContact;
