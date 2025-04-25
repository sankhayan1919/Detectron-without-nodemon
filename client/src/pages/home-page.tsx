import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAnalysis } from "@/hooks/use-analysis";
import { Loader2, ShieldAlert, BarChart2, FileText, History, Lock, Database } from "lucide-react";

const analysisFormSchema = z.object({
  accountName: z.string().min(1, "Account name is required"),
  password: z.string().min(1, "Password is required"),
  targetAccount: z.string().min(1, "Target account is required"),
  contentType: z.string().min(1, "Content type is required"),
  content: z.string().min(1, "Content is required")
});

type AnalysisFormValues = z.infer<typeof analysisFormSchema>;

export default function HomePage() {
  const { toast } = useToast();
  const { analysisMutation, semanticAnalysis, threatAnalysis } = useAnalysis();
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const form = useForm<AnalysisFormValues>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      accountName: "",
      password: "",
      targetAccount: "",
      contentType: "posts",
      content: ""
    }
  });

  const onSubmit = (data: AnalysisFormValues) => {
    analysisMutation.mutate(data);
  };

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-primary rounded-lg shadow-md p-8 mb-10 text-white">
          <h1 className="text-3xl font-bold mb-4">Social Media Intelligence Platform</h1>
          <p className="text-lg mb-6">
            Secure analysis tool for government agencies to monitor and evaluate social media content for potential threats and insights.
          </p>
          <div className="flex items-center">
            <span className="bg-white text-primary text-xs px-2 py-1 rounded mr-2">OFFICIAL USE</span>
            <span className="text-sm">Authorized personnel only</span>
          </div>
        </div>

        {/* Analysis Form */}
        <Card className="mb-10">
          <CardContent className="pt-6">
            <h2 className="text-xl font-semibold mb-4 text-neutral-dark pb-2 border-b border-neutral-light">Account Analysis</h2>
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
                          <Input placeholder="e.g. @username" {...field} />
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
                          <Input type="password" {...field} />
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
                          <Input placeholder="e.g. @targetuser" {...field} />
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
                            <SelectTrigger>
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

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Content / Bio</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter or paste content to analyze" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="text-right">
                  <Button 
                    type="submit" 
                    disabled={analysisMutation.isPending}
                  >
                    {analysisMutation.isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Run Analysis
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mb-10">
          {/* Semantic Analysis */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-secondary text-white">
              <h3 className="font-semibold">Semantic Analysis</h3>
            </div>
            <div className="p-6 min-h-[300px]">
              {analysisMutation.isPending ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-neutral-medium">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Processing analysis...</p>
                  </div>
                </div>
              ) : semanticAnalysis ? (
                <div className="h-full">
                  <div className="mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => setIsPdfLoading(true)}
                      disabled={isPdfLoading}
                    >
                      {isPdfLoading ? (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      ) : (
                        <FileText className="mr-1 h-3 w-3" />
                      )}
                      Download PDF
                    </Button>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                      {semanticAnalysis}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-neutral-medium">
                    <FileText className="h-8 w-8 mx-auto mb-4" />
                    <p>Semantic analysis results will appear here</p>
                    <p className="text-sm mt-2">PDF report will be generated after analysis</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Threat Prediction */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-secondary text-white">
              <h3 className="font-semibold">Threat Prediction</h3>
            </div>
            <div className="p-6 min-h-[300px]">
              {analysisMutation.isPending ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-neutral-medium">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p>Processing analysis...</p>
                  </div>
                </div>
              ) : threatAnalysis ? (
                <div className="h-full">
                  <div className="mb-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-xs"
                      onClick={() => setIsPdfLoading(true)}
                      disabled={isPdfLoading}
                    >
                      {isPdfLoading ? (
                        <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      ) : (
                        <FileText className="mr-1 h-3 w-3" />
                      )}
                      Download PDF
                    </Button>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <pre className="bg-gray-50 p-4 rounded overflow-auto text-sm">
                      {threatAnalysis}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-neutral-medium">
                    <ShieldAlert className="h-8 w-8 mx-auto mb-4" />
                    <p>Threat prediction results will appear here</p>
                    <p className="text-sm mt-2">Security assessment will be provided</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Platform Features</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <BarChart2 className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-neutral-medium">
                Utilize AI-powered semantic analysis to identify patterns and detect potential security concerns in social media content.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <ShieldAlert className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Threat Detection</h3>
              <p className="text-neutral-medium">
                Proactively identify potential threats through advanced linguistic pattern recognition and behavioral analysis algorithms.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <FileText className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">PDF Reports</h3>
              <p className="text-neutral-medium">
                Generate comprehensive PDF reports with detailed analysis findings for documentation and sharing with authorized personnel.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <History className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Historical Analysis</h3>
              <p className="text-neutral-medium">
                Access archived reports and track changes over time to identify evolving patterns and trends in target profiles.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Lock className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Access</h3>
              <p className="text-neutral-medium">
                Organization-restricted access ensures that sensitive analysis tools are only available to authorized government personnel.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-4">
                <Database className="text-primary h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Data Compliance</h3>
              <p className="text-neutral-medium">
                All operations adhere to relevant privacy laws and government data handling requirements for intelligence operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
