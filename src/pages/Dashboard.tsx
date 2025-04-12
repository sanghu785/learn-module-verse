
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCourse } from "@/contexts/CourseContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import VideoPlayer from "@/components/VideoPlayer";
import ModuleSidebar from "@/components/ModuleSidebar";
import WhatsAppContact from "@/components/WhatsAppContact";
import { BarChart, Bookmark, GraduationCap, LogOut, Menu, MessageSquare, User, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { course, calculateCourseProgress } = useCourse();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  
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

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {showMobileSidebar && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileSidebar(false)}></div>
          <div className="absolute top-0 left-0 z-10 h-full w-72 bg-background p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-heading font-bold">Course Modules</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowMobileSidebar(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <ModuleSidebar />
          </div>
        </div>
      )}

      {/* Left sidebar navigation */}
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
              <AvatarImage src={currentUser.photoURL} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
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

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="border-b bg-white px-4 py-2 lg:py-3 flex items-center">
          <div className="flex lg:hidden">
            <Button variant="ghost" size="icon" onClick={() => setShowMobileSidebar(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex-1 lg:px-4">
            <h1 className="text-lg lg:text-xl font-heading font-medium">{course?.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>Your progress:</span>
              <div className="ml-2 flex items-center gap-2">
                <Progress value={calculateCourseProgress()} className="w-20 h-2" />
                <span className="font-medium">{calculateCourseProgress()}%</span>
              </div>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate("/dashboard/profile")}
            >
              <User className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar toggle for desktop */}
          <div className={`${sidebarOpen ? 'w-80' : 'w-0'} border-r hidden lg:block overflow-hidden transition-all duration-300`}>
            <ModuleSidebar />
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-auto p-4 lg:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="lg:hidden mb-4 inline-flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMobileSidebar(true)}
                >
                  <Menu className="mr-2 h-4 w-4" /> View Course Modules
                </Button>
              </div>

              <div className="hidden lg:block mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? (
                    <>
                      <ChevronRight className="mr-2 h-4 w-4" /> Hide Modules
                    </>
                  ) : (
                    <>
                      <Menu className="mr-2 h-4 w-4" /> Show Modules
                    </>
                  )}
                </Button>
              </div>

              <Tabs defaultValue="learning">
                <TabsList className="mb-6">
                  <TabsTrigger value="learning">Learning</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                <TabsContent value="learning">
                  <div className="space-y-6">
                    <VideoPlayer />
                  </div>
                </TabsContent>
                <TabsContent value="contact">
                  <WhatsAppContact />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
