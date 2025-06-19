import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  orgCode: z.string().min(1, "Organization code is required"),
  captcha: z.string().min(1, "CAPTCHA is required"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [captchaCode, setCaptchaCode] = useState("XA7B9C");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      captcha: "",
    },
  });

  const handleSubmit = (data: ForgotPasswordFormValues) => {
    // Handle forgot password logic here
    console.log(data);
  };

  const refreshCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
  };

  return (
    <div className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Forgot Password</h2>
            <p className="mb-6 text-neutral-medium">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="orgCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization Code</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                    control={form.control}
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

                <Button type="submit" className="w-full">
                  Send Reset Instructions
                </Button>

                <div className="text-center mt-4">
                  <a href="/auth" className="text-primary hover:text-primary-dark">
                    Back to Login
                  </a>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}