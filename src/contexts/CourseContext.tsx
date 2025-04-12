
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

// Types for course data
export interface Video {
  id: string;
  title: string;
  description: string;
  duration: string;
  videoUrl: string;
  thumbnail?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  videos: Video[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  modules: Module[];
}

interface Progress {
  userId: string;
  courseId: string;
  completedVideos: string[]; // Video IDs
}

interface CourseContextProps {
  course: Course | null;
  currentModule: Module | null;
  currentVideo: Video | null;
  loading: boolean;
  completedVideos: string[];
  setCurrentModule: (moduleId: string) => void;
  setCurrentVideo: (videoId: string) => void;
  markVideoCompleted: (videoId: string) => void;
  calculateModuleProgress: (moduleId: string) => number;
  calculateCourseProgress: () => number;
  isVideoCompleted: (videoId: string) => boolean;
}

const CourseContext = createContext<CourseContextProps | undefined>(undefined);

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}

// Sample course data
const sampleCourse: Course = {
  id: "course-1",
  title: "Complete Web Development Bootcamp",
  description: "Learn web development from scratch with this comprehensive course covering HTML, CSS, JavaScript, React, and more.",
  instructor: "John Smith",
  thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
  modules: [
    {
      id: "module-1",
      title: "HTML Fundamentals",
      description: "Learn the basics of HTML, the building blocks of web pages.",
      videos: [
        {
          id: "video-1-1",
          title: "Introduction to HTML",
          description: "Learn what HTML is and why it's important for web development.",
          duration: "10:15",
          videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
          thumbnail: "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg"
        },
        {
          id: "video-1-2",
          title: "HTML Elements & Tags",
          description: "Learn about different HTML elements and how to use them properly.",
          duration: "12:30",
          videoUrl: "https://www.youtube.com/embed/salY_Sm6mv4",
          thumbnail: "https://img.youtube.com/vi/salY_Sm6mv4/maxresdefault.jpg"
        },
        {
          id: "video-1-3",
          title: "HTML Forms & Inputs",
          description: "Learn how to create forms and work with different input types in HTML.",
          duration: "15:45",
          videoUrl: "https://www.youtube.com/embed/fNcJuPIZ2WE",
          thumbnail: "https://img.youtube.com/vi/fNcJuPIZ2WE/maxresdefault.jpg"
        }
      ]
    },
    {
      id: "module-2",
      title: "CSS Styling",
      description: "Master CSS to style your web pages beautifully.",
      videos: [
        {
          id: "video-2-1",
          title: "CSS Basics",
          description: "Learn the basics of CSS and how to apply styles to HTML elements.",
          duration: "14:20",
          videoUrl: "https://www.youtube.com/embed/yfoY53QXEnI",
          thumbnail: "https://img.youtube.com/vi/yfoY53QXEnI/maxresdefault.jpg"
        },
        {
          id: "video-2-2",
          title: "CSS Layout & Positioning",
          description: "Master different CSS layout techniques including flexbox and grid.",
          duration: "18:10",
          videoUrl: "https://www.youtube.com/embed/jV8B24rSN5o",
          thumbnail: "https://img.youtube.com/vi/jV8B24rSN5o/maxresdefault.jpg"
        }
      ]
    },
    {
      id: "module-3",
      title: "JavaScript Essentials",
      description: "Learn the fundamentals of JavaScript programming.",
      videos: [
        {
          id: "video-3-1",
          title: "JavaScript Basics",
          description: "Get started with JavaScript basics including variables, functions, and control flow.",
          duration: "20:15",
          videoUrl: "https://www.youtube.com/embed/hdI2bqOjy3c",
          thumbnail: "https://img.youtube.com/vi/hdI2bqOjy3c/maxresdefault.jpg"
        },
        {
          id: "video-3-2",
          title: "DOM Manipulation",
          description: "Learn how to manipulate the DOM using JavaScript.",
          duration: "16:40",
          videoUrl: "https://www.youtube.com/embed/0ik6X4DJKCc",
          thumbnail: "https://img.youtube.com/vi/0ik6X4DJKCc/maxresdefault.jpg"
        },
        {
          id: "video-3-3",
          title: "JavaScript Events",
          description: "Master event handling in JavaScript applications.",
          duration: "14:50",
          videoUrl: "https://www.youtube.com/embed/e57ReoUn6kM",
          thumbnail: "https://img.youtube.com/vi/e57ReoUn6kM/maxresdefault.jpg"
        }
      ]
    }
  ]
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider = ({ children }: CourseProviderProps) => {
  const { currentUser } = useAuth();
  const [course, setCourse] = useState<Course | null>(sampleCourse);
  const [currentModule, setCurrentModuleState] = useState<Module | null>(null);
  const [currentVideo, setCurrentVideoState] = useState<Video | null>(null);
  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load progress on user change or initial load
  useEffect(() => {
    if (!currentUser || !course) {
      setCompletedVideos([]);
      return;
    }

    // Load progress from localStorage
    const progressKey = `course_progress_${currentUser.id}_${course.id}`;
    const savedProgress = localStorage.getItem(progressKey);
    
    if (savedProgress) {
      try {
        const progress: Progress = JSON.parse(savedProgress);
        setCompletedVideos(progress.completedVideos || []);
      } catch (error) {
        console.error("Failed to load progress", error);
      }
    } else {
      setCompletedVideos([]);
    }
    
    setLoading(false);
  }, [currentUser, course]);

  // Initialize with first module and video if none selected
  useEffect(() => {
    if (course && !currentModule && course.modules.length > 0) {
      setCurrentModuleState(course.modules[0]);
    }
  }, [course, currentModule]);

  useEffect(() => {
    if (currentModule && !currentVideo && currentModule.videos.length > 0) {
      setCurrentVideoState(currentModule.videos[0]);
    }
  }, [currentModule, currentVideo]);

  // Set current module by ID
  const setCurrentModule = (moduleId: string) => {
    if (!course) return;
    
    const module = course.modules.find(m => m.id === moduleId);
    if (module) {
      setCurrentModuleState(module);
      
      // Set first video of the module if available
      if (module.videos.length > 0) {
        setCurrentVideoState(module.videos[0]);
      } else {
        setCurrentVideoState(null);
      }
    }
  };

  // Set current video by ID
  const setCurrentVideo = (videoId: string) => {
    if (!course) return;
    
    // Find the video and its module
    let foundVideo: Video | null = null;
    let foundModule: Module | null = null;
    
    for (const module of course.modules) {
      const video = module.videos.find(v => v.id === videoId);
      if (video) {
        foundVideo = video;
        foundModule = module;
        break;
      }
    }
    
    if (foundVideo && foundModule) {
      setCurrentModuleState(foundModule);
      setCurrentVideoState(foundVideo);
    }
  };

  // Mark a video as completed
  const markVideoCompleted = (videoId: string) => {
    if (!currentUser || !course) return;
    
    // Don't add duplicates
    if (completedVideos.includes(videoId)) return;
    
    const updatedCompletedVideos = [...completedVideos, videoId];
    setCompletedVideos(updatedCompletedVideos);
    
    // Save progress to localStorage
    const progressKey = `course_progress_${currentUser.id}_${course.id}`;
    const progress: Progress = {
      userId: currentUser.id,
      courseId: course.id,
      completedVideos: updatedCompletedVideos
    };
    
    localStorage.setItem(progressKey, JSON.stringify(progress));
  };

  // Calculate progress percentage for a specific module
  const calculateModuleProgress = (moduleId: string): number => {
    if (!course) return 0;
    
    const module = course.modules.find(m => m.id === moduleId);
    if (!module || module.videos.length === 0) return 0;
    
    const moduleVideoIds = module.videos.map(v => v.id);
    const completedModuleVideos = completedVideos.filter(id => moduleVideoIds.includes(id));
    
    return Math.round((completedModuleVideos.length / moduleVideoIds.length) * 100);
  };

  // Calculate overall course progress
  const calculateCourseProgress = (): number => {
    if (!course) return 0;
    
    const totalVideos = course.modules.reduce(
      (count, module) => count + module.videos.length, 
      0
    );
    
    if (totalVideos === 0) return 0;
    
    return Math.round((completedVideos.length / totalVideos) * 100);
  };

  // Check if a video is completed
  const isVideoCompleted = (videoId: string): boolean => {
    return completedVideos.includes(videoId);
  };

  const value = {
    course,
    currentModule,
    currentVideo,
    loading,
    completedVideos,
    setCurrentModule,
    setCurrentVideo,
    markVideoCompleted,
    calculateModuleProgress,
    calculateCourseProgress,
    isVideoCompleted
  };

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>;
};
