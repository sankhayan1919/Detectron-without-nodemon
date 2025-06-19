import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DocsPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Documentation</h1>
        <p className="mt-2 text-lg text-gray-600">
          Learn how to use Detectron to analyze social media content
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage Guide</TabsTrigger>
          <TabsTrigger value="analysis">Analysis Types</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>What is Detectron?</CardTitle>
              <CardDescription>
                An introduction to our social media analysis platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Purpose</h3>
                <p className="mt-2 text-gray-600">
                  Detectron is a sophisticated social media feed parsing and analysis tool designed to help security professionals, researchers, and analysts extract meaningful insights from social media content. The platform uses advanced natural language processing and machine learning algorithms to detect patterns, analyze semantics, and predict potential threats.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-600">
                  <li>Semantic analysis of social media posts and user bios</li>
                  <li>Threat prediction and risk assessment</li>
                  <li>PDF report generation for documentation</li>
                  <li>Secure archive system for tracking past analyses</li>
                  <li>Advanced search and filtering capabilities</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Use Cases</h3>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-600">
                  <li>Security monitoring and threat detection</li>
                  <li>Digital forensics investigations</li>
                  <li>Research and pattern analysis</li>
                  <li>Behavioral analysis and profiling</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="usage" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Guide</CardTitle>
              <CardDescription>
                Step-by-step instructions for using Detectron
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Getting Started</h3>
                <ol className="mt-2 list-decimal pl-5 space-y-2 text-gray-600">
                  <li>Create an account or sign in to your existing account</li>
                  <li>Navigate to the Home page where you'll find the analysis form</li>
                  <li>Enter your access credentials (these are required for social media API access)</li>
                  <li>Enter the target account username you wish to analyze</li>
                  <li>Select whether to analyze posts or the user bio</li>
                  <li>Click the "Analyze" button to begin the analysis process</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Understanding Results</h3>
                <p className="mt-2 text-gray-600">
                  Analysis results are displayed in two main sections:
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-600">
                  <li><strong>Semantic Analysis:</strong> Shows key themes, sentiment analysis, and language patterns detected in the content.</li>
                  <li><strong>Threat Prediction:</strong> Provides a threat score, identifies suspicious patterns, and offers recommendations for further action.</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Working with Archives</h3>
                <p className="mt-2 text-gray-600">
                  After completing an analysis, you can:
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-600">
                  <li>Save the analysis to your archives for future reference</li>
                  <li>Download a PDF report of the analysis</li>
                  <li>Access past analyses through the Archives page</li>
                  <li>Use search filters to find specific analyses by date, case ID, or target account</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analysis Types</CardTitle>
              <CardDescription>
                Different types of analysis available in Detectron
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Posts Analysis</h3>
                <p className="mt-2 text-gray-600">
                  This analysis option examines the most recent posts from the target account. The system analyzes:
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-600">
                  <li>Content themes and topics</li>
                  <li>Linguistic patterns and writing style</li>
                  <li>Emotional tone and sentiment</li>
                  <li>Temporal patterns in posting behavior</li>
                  <li>Unusual or suspicious content markers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Bio Analysis</h3>
                <p className="mt-2 text-gray-600">
                  This analysis focuses on the user's profile bio and metadata. The system examines:
                </p>
                <ul className="mt-2 list-disc pl-5 space-y-2 text-gray-600">
                  <li>Self-presentation and identity markers</li>
                  <li>Affiliated organizations or groups</li>
                  <li>Geographical references</li>
                  <li>Linguistic choices and stylistic patterns</li>
                  <li>Potential coded language or hidden messaging</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Analysis Methodology</h3>
                <p className="mt-2 text-gray-600">
                  Detectron employs a multi-layered approach to content analysis:
                </p>
                <ol className="mt-2 list-decimal pl-5 space-y-2 text-gray-600">
                  <li><strong>Data Collection:</strong> Retrieving content via social media APIs</li>
                  <li><strong>Preprocessing:</strong> Cleaning and structuring text data</li>
                  <li><strong>Semantic Analysis:</strong> Identifying themes, patterns, and sentiment</li>
                  <li><strong>Threat Modeling:</strong> Comparing against known risk patterns</li>
                  <li><strong>Report Generation:</strong> Compiling findings into actionable insights</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Common questions about using Detectron
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Is my analysis data secure?</h3>
                <p className="mt-2 text-gray-600">
                  Yes, all analysis data is encrypted and stored securely. Only you can access your archived analyses. We follow industry best practices for data protection and privacy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Why do I need to provide my account credentials?</h3>
                <p className="mt-2 text-gray-600">
                  Social media platforms require authentication to access their APIs. Your credentials are used solely for this purpose and are securely handled. We do not store your passwords in plaintext.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">How accurate is the threat prediction?</h3>
                <p className="mt-2 text-gray-600">
                  Our threat prediction model has been trained on extensive datasets and provides a reliable risk assessment. However, it should be used as one tool in a broader security evaluation process and not as the sole determinant for action.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">Can I analyze private accounts?</h3>
                <p className="mt-2 text-gray-600">
                  Analysis of private accounts is only possible if your credentials have permission to view that account's content. Due to platform restrictions and privacy considerations, some private accounts may not be fully analyzable.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900">How often should I run an analysis on the same account?</h3>
                <p className="mt-2 text-gray-600">
                  The frequency depends on your monitoring needs. For active investigations, daily analysis may be appropriate. For routine monitoring, weekly or monthly intervals are typically sufficient to track behavioral changes.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
