
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoPlayer from "@/components/VideoPlayer";
import WhatsAppContact from "@/components/WhatsAppContact";
import ModuleSidebar from "@/components/ModuleSidebar";
import { ChevronRight, Menu } from "lucide-react";

interface ContentAreaProps {
  onOpenMobileSidebar: () => void;
}

const ContentArea = ({ onOpenMobileSidebar }: ContentAreaProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
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
              onClick={onOpenMobileSidebar}
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
  );
};

export default ContentArea;
