
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ContentArea from "@/components/dashboard/ContentArea";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <MobileSidebar 
        isOpen={showMobileSidebar} 
        onClose={() => setShowMobileSidebar(false)} 
      />

      {/* Left sidebar navigation */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <DashboardHeader 
          onOpenMobileSidebar={() => setShowMobileSidebar(true)} 
        />

        {/* Content area */}
        <ContentArea 
          onOpenMobileSidebar={() => setShowMobileSidebar(true)} 
        />
      </div>
    </div>
  );
};

export default Dashboard;
