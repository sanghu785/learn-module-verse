
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BarChart, Bookmark, GraduationCap, LogOut, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Sidebar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getUserInitials = () => {
    if (!currentUser?.name) return "U";
    return currentUser.name.split(" ")
      .map(name => name[0])
      .slice(0, 2)
      .join("");
  };

  return (
    <div className="hidden lg:flex flex-col w-64 border-r bg-muted/10">
      <div className="p-4 flex items-center gap-2 border-b">
        <GraduationCap className="h-6 w-6 text-brand-800" />
        <h1 className="text-xl font-heading font-bold">LearnVerse</h1>
      </div>
      
      <div className="flex-1 py-4 px-3">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate("/dashboard")}
          >
            <BarChart className="mr-2 h-4 w-4" /> Dashboard
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-brand-800 font-medium bg-accent/20" 
          >
            <Bookmark className="mr-2 h-4 w-4" /> My Course
          </Button>
          <Button 
            variant="ghost" 
            className="w-full justify-start" 
            onClick={() => navigate("/dashboard/contact")}
          >
            <MessageSquare className="mr-2 h-4 w-4" /> Contact
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center gap-3 mb-3">
          <Avatar>
            <AvatarImage src={currentUser?.photoURL} />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{currentUser?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{currentUser?.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" /> Sign out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
