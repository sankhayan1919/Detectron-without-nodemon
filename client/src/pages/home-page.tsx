
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Camera, FileText, Brain, Shield, Zap, Archive, CheckCircle, Globe, AlertTriangle } from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h1 className="text-3xl font-bold mb-4">Welcome {user?.username}!</h1>
          <p className="text-gray-600">
            Access our advanced social media analysis platform with cutting-edge features designed for intelligence gathering and threat assessment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Camera className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold ml-3">Automated Screenshots</h2>
              </div>
              <p className="text-gray-600">Capture and analyze social media content automatically with our advanced screenshot system</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-6 w-6 text-green-500" />
                <h2 className="text-xl font-semibold ml-3">Documentation</h2>
              </div>
              <p className="text-gray-600">Comprehensive documentation generation for each analysis case</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-purple-500" />
                <h2 className="text-xl font-semibold ml-3">Semantic Analysis</h2>
              </div>
              <p className="text-gray-600">Advanced AI-powered semantic analysis of social media content</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-6 w-6 text-yellow-500" />
                <h2 className="text-xl font-semibold ml-3">Threat Prediction</h2>
              </div>
              <p className="text-gray-600">Early warning system with predictive analytics for potential threats</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-semibold ml-3">Secure Access</h2>
              </div>
              <p className="text-gray-600">Enterprise-grade security with role-based access control</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-orange-500" />
                <h2 className="text-xl font-semibold ml-3">Faster Process</h2>
              </div>
              <p className="text-gray-600">Quick and efficient processing of large volumes of social media data</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Archive className="h-6 w-6 text-indigo-500" />
                <h2 className="text-xl font-semibold ml-3">Archives Section</h2>
              </div>
              <p className="text-gray-600">Organized storage of all analysis reports and findings</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-emerald-500" />
                <h2 className="text-xl font-semibold ml-3">Error-free Process</h2>
              </div>
              <p className="text-gray-600">Robust validation and verification at every step</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-cyan-500" />
                <h2 className="text-xl font-semibold ml-3">Multi-language</h2>
              </div>
              <p className="text-gray-600">Support for analysis across multiple languages and regions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
