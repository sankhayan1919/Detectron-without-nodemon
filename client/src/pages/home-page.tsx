import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "../components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "../components/ui/form"; 
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { useToast } from "../hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAnalysis } from "../hooks/use-analysis";
import { Camera, 
  FileText, 
  Brain, 
  Loader2,
  ShieldAlert, 
  Database,
  Shield,
  Archive, 
  BarChart2, 
  Download,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Globe,
  Lock } from "lucide-react";
import React from "react";

// Updated schema without content field
const analysisFormSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  password: z.string().min(1, "Password is required"),
  targetAccount: z.string().min(1, "Target account is required"),
  contentType: z.string().min(1, "Content type is required"),
});

type AnalysisFormValues = z.infer<typeof analysisFormSchema>;

export default function HomePage() {
  const { toast } = useToast();
  const { analysisMutation, semanticAnalysis, threatAnalysis } = useAnalysis();
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const form = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      accountName: "",
      password: "",
      targetAccount: "",
      contentType: "posts",
    }
  });

  const onSubmit = (data: AnalysisFormValues) => {
    // Mock content for the analysis since we're removing the content input
    const analysisData = {
      ...data,
      content: "Sample content for analysis. This is automatically generated based on the target account specified."
    };
    
    setShowResults(true);
    analysisMutation.mutate(analysisData);
  };

  const handleDownloadPDF = (type: 'semantic' | 'threat') => {
    setIsPdfLoading(true);
    // Simulate PDF generation
    setTimeout(() => {
      setIsPdfLoading(false);
      toast({
        title: "Download Complete",
        description: `${type === 'semantic' ? 'Semantic Analysis' : 'Threat Analysis'} report has been downloaded.`,
      });
    }, 1500);
  };

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg shadow-lg p-8 mb-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4 leading-tight">Social Media Intelligence Platform</h1>
            <p className="text-lg mb-6 opacity-90">
              Advanced analysis tool for government agencies to monitor and evaluate social media content for potential threats and critical insights.
            </p>
            <div className="flex items-center">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium mr-3 border border-white/30">CONFIDENTIAL</span>
              <span className="text-sm">Authorized personnel only</span>
            </div>
          </div>
        </div>

        {/* Analysis Form */}
        <Card className="mb-10 border-0 shadow-lg overflow-hidden">
          <div className="bg-secondary/10 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-secondary-dark flex items-center">
              <ShieldAlert className="mr-2 h-5 w-5" />
              Account Analysis
            </h2>
          </div>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. @username" 
                            {...field} 
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            {...field} 
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="targetAccount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Account</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g. @targetuser" 
                            {...field} 
                            className="border-gray-300 focus:border-primary focus:ring-primary" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contentType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-300 focus:border-primary focus:ring-primary">
                              <SelectValue placeholder="Select content type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="posts">Posts</SelectItem>
                            <SelectItem value="bio">Biography</SelectItem>
                            <SelectItem value="comments">Comments</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-center mt-8">
                  <Button 
                    type="submit" 
                    disabled={analysisMutation.isPending}
                    className="px-8 py-6 text-lg font-medium bg-primary hover:bg-primary-dark transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {analysisMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="mr-2 h-5 w-5" />
                        Submit
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {(showResults || semanticAnalysis || threatAnalysis) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-dark flex items-center">
              <BarChart2 className="mr-2 h-6 w-6 text-primary" />
              Analysis Results
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Semantic Analysis */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-4 bg-gradient-to-r from-secondary to-secondary-dark text-white">
                  <h3 className="font-semibold flex items-center text-lg">
                    <FileText className="mr-2 h-5 w-5" />
                    Semantic Analysis
                  </h3>
                </div>
                <div className="p-6 min-h-[320px]">
                  {analysisMutation.isPending ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-neutral-medium">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-secondary" />
                        <p className="text-lg font-medium">Processing analysis...</p>
                        <p className="text-sm mt-2 text-neutral-medium">This may take a moment</p>
                      </div>
                    </div>
                  ) : semanticAnalysis ? (
                    <div className="h-full">
                      <div className="prose prose-sm max-w-none mb-6">
                        <pre className="bg-gray-50 p-4 rounded-xl border border-gray-200 overflow-auto text-sm">
                          {semanticAnalysis}
                        </pre>
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          variant="default" 
                          size="sm" 
                          className="font-medium"
                          onClick={() => handleDownloadPDF('semantic')}
                          disabled={isPdfLoading}
                        >
                          {isPdfLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="mr-2 h-4 w-4" />
                          )}
                          Download PDF
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="font-medium"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-neutral-medium">
                        <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Semantic analysis results will appear here</p>
                        <p className="text-sm mt-2">PDF report will be generated after analysis</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Threat Prediction */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-300 hover:shadow-xl">
                <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white">
                  <h3 className="font-semibold flex items-center text-lg">
                    <ShieldAlert className="mr-2 h-5 w-5" />
                    Threat Assessment
                  </h3>
                </div>
                <div className="p-6 min-h-[320px]">
                  {analysisMutation.isPending ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-neutral-medium">
                        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-red-500" />
                        <p className="text-lg font-medium">Processing assessment...</p>
                        <p className="text-sm mt-2 text-neutral-medium">This may take a moment</p>
                      </div>
                    </div>
                  ) : threatAnalysis ? (
                    <div className="h-full">
                      <div className="prose prose-sm max-w-none mb-6">
                        <pre className="bg-gray-50 p-4 rounded-xl border border-gray-200 overflow-auto text-sm">
                          {threatAnalysis}
                        </pre>
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          variant="default" 
                          size="sm"
                          className="font-medium bg-red-600 hover:bg-red-700"
                          onClick={() => handleDownloadPDF('threat')}
                          disabled={isPdfLoading}
                        >
                          {isPdfLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="mr-2 h-4 w-4" />
                          )}
                          Download PDF
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="font-medium"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Export Data
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-neutral-medium">
                        <ShieldAlert className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-medium">Threat assessment results will appear here</p>
                        <p className="text-sm mt-2">Security assessment will be provided</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div className="mb-10 relative">
          {/* Background Image Container */}
          <div 
            className="absolute inset-0 z-0 opacity-5 rounded-3xl"
            style={{
              backgroundImage: "url('/path/to/your/background.jpg')", // Replace with your background image path
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-8 text-neutral-dark flex items-center justify-center">
              <Database className="mr-2 h-6 w-6 text-primary" />
              Platform Capabilities
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Automated Screenshot */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-5">
                  <Camera className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">Automated Screenshot</h3>
                <p className="text-neutral-medium">
                  Automatic capture of social media content with timestamp verification for reliable evidence collection.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Automated</span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Real-time</span>
                </div>
              </div>

              {/* PDF Reports */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mb-5">
                  <FileText className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">PDF Reports</h3>
                <p className="text-neutral-medium">
                  Generate comprehensive PDF reports with detailed analysis findings and evidence documentation.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Reports</span>
                  <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Documentation</span>
                </div>
              </div>

              {/* Semantic Analysis */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center mb-5">
                  <Brain className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">Semantic Analysis</h3>
                <p className="text-neutral-medium">
                  Advanced AI-powered content understanding and contextual analysis of social media data.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">AI-Powered</span>
                  <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Smart</span>
                </div>
              </div>

              {/* Threat Prediction */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center mb-5">
                  <ShieldAlert className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">Threat Prediction</h3>
                <p className="text-neutral-medium">
                  Advanced threat detection system using predictive analytics and pattern recognition.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Security</span>
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">Prevention</span>
                </div>
              </div>

              {/* Secure Access */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-700 rounded-full flex items-center justify-center mb-5">
                  <Lock className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">Secure Access</h3>
                <p className="text-neutral-medium">
                  Enterprise-grade security protocols ensuring authorized access and data protection.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Secure</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Protected</span>
                </div>
              </div>

              {/* Archives Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full flex items-center justify-center mb-5">
                  <Archive className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">Archives Section</h3>
                <p className="text-neutral-medium">
                  Comprehensive storage system for historical data with advanced search and retrieval capabilities.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">History</span>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">Storage</span>
                </div>
              </div>

              {/* Human Error-Free */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">Human Error-Free</h3>
                <p className="text-neutral-medium">
                  Automated processes and validation systems to eliminate manual errors and ensure accuracy.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">Automated</span>
                  <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded">Accurate</span>
                </div>
              </div>

              {/* Data Compliance */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-violet-700 rounded-full flex items-center justify-center mb-5">
                  <Shield className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">Data Compliance</h3>
                <p className="text-neutral-medium">
                  Full adherence to data protection regulations and privacy standards for secure operations.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded">Compliant</span>
                  <span className="bg-violet-100 text-violet-800 text-xs px-2 py-1 rounded">Standard</span>
                </div>
              </div>

              {/* Multi-Language Support */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-6 border border-gray-100 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-500 to-pink-700 rounded-full flex items-center justify-center mb-5">
                  <Globe className="text-white h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-3 text-neutral-dark">Multi-Language</h3>
                <p className="text-neutral-medium">
                  Comprehensive support for multiple languages enabling global threat monitoring and analysis.
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Global</span>
                  <span className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">Multi-lingual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
