
import { useCourse } from "@/contexts/CourseContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ChevronDown, ChevronRight, PlayCircle } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModuleSidebar = () => {
  const { 
    course, 
    currentModule, 
    currentVideo, 
    setCurrentModule, 
    setCurrentVideo, 
    calculateModuleProgress, 
    calculateCourseProgress,
    isVideoCompleted 
  } = useCourse();
  
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  if (!course) return null;

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  // Initialize current module as expanded
  const isModuleExpanded = (moduleId: string) => {
    return expandedModules[moduleId] ?? (currentModule?.id === moduleId);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-muted/20">
      <div className="p-4 border-b">
        <h2 className="text-lg font-heading font-medium">Course Content</h2>
        <div className="mt-2">
          <div className="flex items-center justify-between text-sm">
            <span>Overall progress</span>
            <span className="font-medium">{calculateCourseProgress()}%</span>
          </div>
          <Progress value={calculateCourseProgress()} className="h-2 mt-1" />
        </div>
      </div>

      <div className="flex-1 overflow-auto p-2">
        {course.modules.map((module) => (
          <div 
            key={module.id} 
            className={`mb-2 border rounded-md overflow-hidden ${
              currentModule?.id === module.id ? "border-brand-800 shadow-sm" : ""
            }`}
          >
            <div 
              className={`p-3 flex justify-between items-center cursor-pointer ${
                currentModule?.id === module.id ? "bg-brand-800/10" : ""
              }`}
              onClick={() => toggleModule(module.id)}
            >
              <div className="flex-1">
                <h3 className="font-medium truncate pr-2">{module.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <span>{module.videos.length} videos</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <Progress 
                      value={calculateModuleProgress(module.id)} 
                      className="h-1 w-16 mr-2" 
                    />
                    <span>{calculateModuleProgress(module.id)}%</span>
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground">
                {isModuleExpanded(module.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {isModuleExpanded(module.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="p-2 border-t bg-background">
                    {module.videos.map((video) => (
                      <Button
                        key={video.id}
                        variant="ghost"
                        className={`w-full justify-start text-left mb-1 h-auto py-2 ${
                          currentVideo?.id === video.id ? "bg-accent/50" : ""
                        }`}
                        onClick={() => setCurrentVideo(video.id)}
                      >
                        <div className="mr-2 flex-shrink-0">
                          {isVideoCompleted(video.id) ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <PlayCircle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="truncate">{video.title}</div>
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleSidebar;
