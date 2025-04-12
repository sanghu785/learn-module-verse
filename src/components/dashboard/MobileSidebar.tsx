
import { Button } from "@/components/ui/button";
import ModuleSidebar from "@/components/ModuleSidebar";
import { X } from "lucide-react";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
      <div className="absolute top-0 left-0 z-10 h-full w-72 bg-background p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-heading font-bold">Course Modules</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <ModuleSidebar />
      </div>
    </div>
  );
};

export default MobileSidebar;
