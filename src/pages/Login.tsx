
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "@/components/ui/icons";

const Login = () => {
  const navigate = useNavigate();
  const { login, googleLogin, phoneLogin } = useAuth();
  
  // Email login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Phone login state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isPhoneVerifying, setIsPhoneVerifying] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const success = await googleLogin();
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSendVerification = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPhoneVerifying(true);
    
    // Simulate sending verification code
    setTimeout(() => {
      setShowVerificationInput(true);
      setIsPhoneVerifying(false);
    }, 1500);
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPhoneVerifying(true);
    
    try {
      const success = await phoneLogin(phoneNumber, verificationCode);
      if (success) {
        navigate("/dashboard");
      }
    } finally {
      setIsPhoneVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-brand-600 to-brand-800 p-4 sm:p-6 lg:p-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to access your course</CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email">
            <CardContent className="space-y-4">
              <form onSubmit={handleEmailLogin} className="space-y-4">
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Button type="button" variant="link" className="px-0 font-normal h-auto">
                      Forgot password?
                    </Button>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? "Signing in..." : "Sign in"}
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
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  "Please wait..."
                ) : (
                  <>
                    <Icons.google className="mr-2 h-4 w-4" /> Google
                  </>
                )}
              </Button>
            </CardContent>
          </TabsContent>
          
          <TabsContent value="phone">
            <CardContent className="space-y-4">
              {!showVerificationInput ? (
                <form onSubmit={handleSendVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="+1 (555) 000-0000" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isPhoneVerifying}>
                    {isPhoneVerifying ? "Sending code..." : "Send verification code"}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handlePhoneLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <p className="text-xs text-muted-foreground">
                      We've sent a 6-digit code to {phoneNumber}
                    </p>
                    <Input 
                      id="code" 
                      type="text" 
                      placeholder="123456" 
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Use code "123456" for demo login
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isPhoneVerifying}>
                    {isPhoneVerifying ? "Verifying..." : "Verify & Sign in"}
                  </Button>
                </form>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
        
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full mt-4">
            Don't have an account?{" "}
            <Button 
              variant="link" 
              className="p-0 font-normal h-auto"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
