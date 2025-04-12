
import { useNavigate } from "react-router-dom";
import { useCourse } from "@/contexts/CourseContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Menu, User } from "lucide-react";

interface DashboardHeaderProps {
  onOpenMobileSidebar: () => void;
}

const DashboardHeader = ({ onOpenMobileSidebar }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { course, calculateCourseProgress } = useCourse();

  return (
    <header className="border-b bg-white px-4 py-2 lg:py-3 flex items-center">
      <div className="flex lg:hidden">
        <Button variant="ghost" size="icon" onClick={onOpenMobileSidebar}>
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
  );
};

export default DashboardHeader;
