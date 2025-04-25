import { Link } from "wouter";
import { Shield, Globe, AlertTriangle, HelpCircle, MailPlus, FileText, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-3">
            <div className="flex items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-r from-primary to-primary-dark shadow-glow-sm">
                <Shield className="h-5 w-5" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">
                <span className="text-primary">Secure</span>Analytics
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              A sophisticated platform for government agencies to analyze and monitor 
              social media content with advanced threat detection and semantic analysis 
              capabilities.
            </p>
            <div className="mt-6 flex items-center">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 border border-gray-700">
                <Globe className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 border border-gray-700 ml-2">
                <Shield className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-800 border border-gray-700 ml-2">
                <AlertTriangle className="h-4 w-4 text-gray-400" />
              </div>
              <div className="ml-4 flex items-center pl-3 pr-3 py-1 rounded-full bg-gray-800 border border-gray-700">
                <span className="text-xs font-medium text-gray-400">Secured <span className="text-primary">|</span> Encrypted</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-400 flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                Resources
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="#" 
                    className="text-gray-400 hover:text-primary transition-colors duration-200 block" 
                    onClick={(e) => { e.preventDefault(); alert('Analytics Archives will be implemented in a future update.'); }}
                  >
                    Analytics Archives
                  </a>
                </li>
                <li>
                  <Link href="/help">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Documentation
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-400 flex items-center">
                <MailPlus className="h-4 w-4 mr-2 text-primary" />
                Support
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/contact">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Contact Support
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/help">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Knowledge Base
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                    System Status
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-400 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-primary" />
                Legal
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Privacy Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                    Security Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                    Terms of Use
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} SecureAnalytics Platform. All rights reserved.
          </p>
          
          <div className="flex items-center mt-4 md:mt-0">
            <div className="bg-gray-800 px-4 py-2 rounded-full border border-gray-700 flex items-center">
              <FileText className="h-4 w-4 text-primary mr-2" />
              <span className="text-xs font-medium text-gray-400">RESTRICTED ACCESS - AUTHORIZED PERSONNEL ONLY</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
