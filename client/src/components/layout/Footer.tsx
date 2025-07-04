import { Link } from "wouter";
import { Shield, Globe, AlertTriangle, HelpCircle, MailPlus, FileText, Lock } from "lucide-react";
import logo from "@/images/footer logo.jpg";
import appName from "@/images/footer app-name.jpg";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white py-16 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-3">
            <div className="flex items-center">
              <div className="flex items-center justify-center bg-gradient-to-r from-primary to-primary-dark shadow-glow-sm">
              {/* Logo */}
              <img
                src={logo}
                alt="App Logo"
                className="h-16 w-16" 
              />
              </div>
              {/* App Name */}
              <span className="ml-1 text-4xl font-bold text-neutral-dark">
                <img
                  src={appName}
                  alt="App Name"
                  className="h-16 w-40" 
                />
              </span>
            </div>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              A sophisticated platform for government agencies to parse and analyze social
              media content with advanced threat detection and semantic analysis capabilities.
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
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-10">
            <div>
              <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-400 flex items-center">
                <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                Resources
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/archives">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Archives
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/docs">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Documentation
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Contact Us
                    </a>
                  </Link>
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
                  <Link href="/security">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Security Policy
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <a className="text-gray-400 hover:text-primary transition-colors duration-200 block">
                      Terms of Use
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Detectron Platform. All rights reserved.
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
