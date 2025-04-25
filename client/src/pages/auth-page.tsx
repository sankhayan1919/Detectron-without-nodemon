import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  orgCode: z.string().min(1, "Organization code is required"),
  captcha: z.string().min(1, "CAPTCHA is required"),
});

const signupSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(12, "Password must be at least 12 characters").regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/,
    "Password must include uppercase, lowercase, number and special character"
  ),
  confirmPassword: z.string().min(1, "Please confirm your password"),
  orgCode: z.string().min(1, "Organization code is required"),
  captcha: z.string().min(1, "CAPTCHA is required"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export default function AuthPage() {
  const { toast } = useToast();
  const { user, loginMutation, registerMutation, isLoading } = useAuth();
  const [captchaCode, setCaptchaCode] = useState("XA7B9C");
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      orgCode: "",
      captcha: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      orgCode: "",
      captcha: "",
    },
  });

  const handleLogin = (data: LoginFormValues) => {
    if (data.captcha !== captchaCode) {
      toast({
        variant: "destructive",
        title: "Invalid CAPTCHA",
        description: "Please enter the correct CAPTCHA code",
      });
      return;
    }
    
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  const handleSignup = (data: SignupFormValues) => {
    if (data.captcha !== captchaCode) {
      toast({
        variant: "destructive",
        title: "Invalid CAPTCHA",
        description: "Please enter the correct CAPTCHA code",
      });
      return;
    }
    
    registerMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  useEffect(() => {
    refreshCaptcha();
  }, []);

  if (user) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-border" />
      </div>
    );
  }

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Auth forms */}
          <div>
            <Card className="shadow-md">
              <CardContent className="p-6">
                <Tabs defaultValue="login">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  {/* Login Form */}
                  <TabsContent value="login">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Login to Access Platform</h2>
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                              <div className="flex justify-end mt-1">
                                <a href="#" 
                                  className="text-sm text-secondary hover:text-secondary-dark"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    toast({
                                      title: "Password Reset",
                                      description: "Please contact your administrator to reset your password.",
                                    });
                                  }}
                                >
                                  Forgot password?
                                </a>
                              </div>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={loginForm.control}
                          name="orgCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        {/* CAPTCHA */}
                        <div className="p-4 border border-neutral-light rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-neutral-dark">CAPTCHA Verification</span>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={refreshCaptcha}
                              className="text-sm text-secondary hover:text-secondary-dark"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                              </svg>
                              Refresh
                            </Button>
                          </div>
                          <div className="bg-neutral-lighter p-3 mb-3 text-center">
                            <span className="font-mono text-lg tracking-widest">{captchaCode}</span>
                          </div>
                          <FormField
                            control={loginForm.control}
                            name="captcha"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Enter the code above" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Login
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                  
                  {/* Signup Form */}
                  <TabsContent value="signup">
                    <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Create Account</h2>
                    <div className="mb-4 p-3 bg-primary-light text-primary rounded-md text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                      Account creation requires verification by an administrator.
                    </div>
                    <Form {...signupForm}>
                      <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-6">
                        <FormField
                          control={signupForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                              <p className="mt-1 text-xs text-neutral-medium">
                                Password must be at least 12 characters with uppercase, lowercase, numbers and special characters.
                              </p>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={signupForm.control}
                          name="orgCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Organization Code</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                              <p className="mt-1 text-xs text-neutral-medium">
                                Required for verification and access control.
                              </p>
                            </FormItem>
                          )}
                        />
                        
                        {/* CAPTCHA */}
                        <div className="p-4 border border-neutral-light rounded-md">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-neutral-dark">CAPTCHA Verification</span>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="sm"
                              onClick={refreshCaptcha}
                              className="text-sm text-secondary hover:text-secondary-dark"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                                <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                              </svg>
                              Refresh
                            </Button>
                          </div>
                          <div className="bg-neutral-lighter p-3 mb-3 text-center">
                            <span className="font-mono text-lg tracking-widest">{captchaCode}</span>
                          </div>
                          <FormField
                            control={signupForm.control}
                            name="captcha"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Enter the code above" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Register
                        </Button>
                      </form>
                    </Form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Information */}
          <div className="bg-white p-8 rounded-lg shadow-md flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">Social Media Intelligence Platform</h2>
            <p className="text-lg mb-6 text-neutral-medium">
              A secure, government-authorized tool for analyzing social media content to detect potential threats and gain valuable insights.
            </p>
            <div className="space-y-4 mt-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-dark">Secure Access</h3>
                  <p className="text-neutral-medium">Restricted to authorized government personnel with valid credentials.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <circle cx="12" cy="12" r="10" />
                      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-dark">Real-time Analysis</h3>
                  <p className="text-neutral-medium">Process and analyze social media content with advanced AI algorithms.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary-light rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-neutral-dark">Comprehensive Reports</h3>
                  <p className="text-neutral-medium">Generate detailed PDF reports for documentation and sharing.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-neutral-light">
              <span className="text-sm font-semibold text-neutral-dark">For Official Government Use Only</span>
              <p className="text-sm text-neutral-medium mt-2">
                This platform is intended exclusively for authorized government personnel for intelligence and security purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
