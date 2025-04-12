
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Video, Award, CheckCircle, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-brand-600" />
            <h1 className="text-xl font-heading font-bold">LearnVerse</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              Log in
            </Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-600 to-brand-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Master Web Development with Our Complete Course
              </h1>
              <p className="text-xl opacity-90">
                Learn HTML, CSS, JavaScript, React and more with our comprehensive curriculum designed for beginners and professionals alike.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-brand-600 hover:bg-gray-100"
                  onClick={() => navigate("/signup")}
                >
                  Start Learning Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate("/login")}
                >
                  Login to Continue
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop" 
                alt="Web Development Course"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Course Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">Why Choose Our Course?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-brand-800/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-brand-800" />
                </div>
                <h3 className="text-xl font-medium mb-2">Comprehensive Curriculum</h3>
                <p className="text-muted-foreground">
                  Our structured learning path takes you from basics to advanced concepts with clear explanations.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-brand-800/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Video className="h-6 w-6 text-brand-800" />
                </div>
                <h3 className="text-xl font-medium mb-2">Video-Based Learning</h3>
                <p className="text-muted-foreground">
                  High-quality video lessons that break down complex topics into easy-to-understand segments.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 bg-brand-800/10 p-3 rounded-full w-12 h-12 flex items-center justify-center">
                  <Award className="h-6 w-6 text-brand-800" />
                </div>
                <h3 className="text-xl font-medium mb-2">Progress Tracking</h3>
                <p className="text-muted-foreground">
                  Track your learning journey with our progress system to stay motivated and focused.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Content Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading font-bold mb-4">What You'll Learn</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
            Our course is divided into comprehensive modules that build upon each other to give you a complete understanding of web development.
          </p>
          
          <div className="grid gap-6">
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-medium flex items-center">
                <span className="bg-brand-800/10 p-2 rounded-full mr-3">
                  <span className="text-brand-800 font-bold">1</span>
                </span>
                HTML Fundamentals
              </h3>
              <div className="mt-4 pl-12 space-y-2">
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  Introduction to HTML and document structure
                </p>
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  Working with HTML elements and tags
                </p>
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  Creating forms and capturing user input
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-medium flex items-center">
                <span className="bg-brand-800/10 p-2 rounded-full mr-3">
                  <span className="text-brand-800 font-bold">2</span>
                </span>
                CSS Styling
              </h3>
              <div className="mt-4 pl-12 space-y-2">
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  CSS fundamentals and selectors
                </p>
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  Page layout techniques with Flexbox and Grid
                </p>
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  Responsive design principles
                </p>
              </div>
            </div>
            
            <div className="border rounded-lg p-6 bg-white shadow-sm">
              <h3 className="text-xl font-medium flex items-center">
                <span className="bg-brand-800/10 p-2 rounded-full mr-3">
                  <span className="text-brand-800 font-bold">3</span>
                </span>
                JavaScript Essentials
              </h3>
              <div className="mt-4 pl-12 space-y-2">
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  JavaScript syntax and basic programming concepts
                </p>
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  DOM manipulation and event handling
                </p>
                <p className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> 
                  Working with APIs and handling asynchronous operations
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              size="lg" 
              className="gap-2" 
              onClick={() => navigate("/signup")}
            >
              Explore Full Curriculum <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4">Ready to Start Your Learning Journey?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers through our comprehensive web development course.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-brand-800 hover:bg-gray-100"
            onClick={() => navigate("/signup")}
          >
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="h-6 w-6" />
                <h2 className="text-xl font-heading font-bold">LearnVerse</h2>
              </div>
              <p className="text-gray-400 max-w-md">
                Providing quality education to help you master web development skills and advance your career.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-medium mb-4">Course</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Curriculum</a></li>
                  <li><a href="#" className="hover:text-white">FAQ</a></li>
                  <li><a href="#" className="hover:text-white">Resources</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Contact</a></li>
                  <li><a href="#" className="hover:text-white">Privacy</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-4">Connect</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Twitter</a></li>
                  <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white">YouTube</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} LearnVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
