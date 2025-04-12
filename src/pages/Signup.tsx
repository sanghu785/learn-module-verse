
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, googleLogin } = useAuth();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const validatePassword = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    
    setPasswordError("");
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsSigningUp(true);
    
    try {
      const success = await signup(name, email, password);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSigningUp(true);
    
    try {
      const success = await googleLogin();
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-600 to-brand-800 p-4 sm:p-6 lg:p-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Sign up to access our course platform</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="John Doe" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (confirmPassword) validatePassword();
                }}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (password) validatePassword();
                }}
                required
              />
              {passwordError && <p className="text-sm font-medium text-destructive">{passwordError}</p>}
            </div>
            
            <Button type="submit" className="w-full" disabled={isSigningUp}>
              {isSigningUp ? "Creating account..." : "Create account"}
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            type="button" 
            className="w-full" 
            onClick={handleGoogleSignup}
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              "Please wait..."
            ) : (
              <>
                <Icons.google className="mr-2 h-4 w-4" /> Google
              </>
            )}
          </Button>
        </CardContent>
        
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full mt-2">
            Already have an account?{" "}
            <Button 
              variant="link" 
              className="p-0 font-normal h-auto"
              onClick={() => navigate("/login")}
            >
              Sign in
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
