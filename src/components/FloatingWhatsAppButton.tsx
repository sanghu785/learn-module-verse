
import { MessageSquare } from "lucide-react";

interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const FloatingWhatsAppButton = ({
  phoneNumber,
  message = "Hello, I would like to know more about your courses!",
}: FloatingWhatsAppButtonProps) => {
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
      aria-label="Contact on WhatsApp"
    >
      <MessageSquare className="h-6 w-6" />
    </button>
  );
};

export default FloatingWhatsAppButton;
