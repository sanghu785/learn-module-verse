
import { useEffect } from "react";
import { useCourse } from "@/contexts/CourseContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, CircleDashed, PlayCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const VideoPlayer = () => {
  const { 
    currentVideo, 
    markVideoCompleted, 
    isVideoCompleted,
  } = useCourse();

  // Mark video as completed when it ends
  const handleVideoCompleted = () => {
    if (currentVideo) {
      markVideoCompleted(currentVideo.id);
      toast.success("Video completed!");
    }
  };

  if (!currentVideo) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-muted rounded-lg">
        <PlayCircle className="h-16 w-16 text-muted-foreground" />
        <p className="mt-4 text-lg text-muted-foreground">No video selected</p>
        <p className="text-sm text-muted-foreground">Select a video from the list to start learning</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="video-responsive rounded-md overflow-hidden border shadow">
        <iframe
          src={currentVideo.videoUrl}
          title={currentVideo.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-medium">{currentVideo.title}</h2>
          <p className="text-sm text-muted-foreground">{currentVideo.duration}</p>
        </div>

        <Button 
          onClick={handleVideoCompleted}
          variant={isVideoCompleted(currentVideo.id) ? "outline" : "default"}
          className="flex items-center gap-2"
        >
          {isVideoCompleted(currentVideo.id) ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <span>Completed</span>
            </>
          ) : (
            <>
              <CircleDashed className="h-4 w-4" />
              <span>Mark as Completed</span>
            </>
          )}
        </Button>
      </div>

      <div className="mt-4">
        <h3 className="font-medium mb-2">Description</h3>
        <p className="text-muted-foreground">{currentVideo.description}</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
