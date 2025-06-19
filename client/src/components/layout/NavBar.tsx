import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  Mail, 
  Shield, 
  Menu, 
  X, 
  User, 
  LogOut, 
  Book, 
  Archive, 
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/images/logo.png";
import appName from "@/images/app-name.png";

export default function NavBar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-blue-500 shadow-lg sticky top-0 z-50 transition-all duration-300 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo */}
              <img
                src={logo}
                alt="App Logo"
                className="h-16 w-16" 
              />
              {/* App Name */}
              <span className="ml-1 text-4xl font-bold text-neutral-dark">
                <img
                  src={appName}
                  alt="App Name"
                  className="h-24 w-60" 
                />
              </span>
            </div>
          </div>

          {/* Desktop Nav Menu */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <a className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-neutral-medium hover:text-primary hover:bg-gray-100'
              }`}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </a>
            </Link>           
            
            <Link href="/archives">
              <a className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/archives') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-neutral-medium hover:text-primary hover:bg-gray-100'
              }`}>
                <Archive className="h-4 w-4 mr-2" />
                Archives
              </a>
            </Link>    
            
            <Link href="/docs">
              <a className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/docs') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-neutral-medium hover:text-primary hover:bg-gray-100'
              }`}>
                <Book className="h-4 w-4 mr-2" />
                Docs
              </a>
            </Link>

            <Link href="/contact">
              <a className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive('/contact') 
                  ? 'text-primary bg-primary/10' 
                  : 'text-neutral-medium hover:text-primary hover:bg-gray-100'
              }`}>
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </a>
            </Link>
            
            {user ? (
              <div className="flex items-center ml-3">
                <div className="h-9 w-9 rounded-full bg-secondary-light flex items-center justify-center text-secondary font-bold text-sm border-2 border-white shadow-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium text-neutral-dark">{user.username}</p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-neutral-medium hover:text-primary flex items-center"
                  >
                    <LogOut className="h-3 w-3 mr-1" />
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Button
                asChild
                className="ml-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary-dark shadow-md"
              >
                <Link href="/auth">
                  <a className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </a>
                </Link>
              </Button>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            {user && (
              <div className="h-9 w-9 rounded-full bg-secondary-light flex items-center justify-center text-secondary font-bold text-sm mr-3">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-medium hover:text-primary hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="pt-2 pb-4 space-y-1 px-4">
            <Link href="/">
              <a className={`block py-3 px-4 rounded-md ${isActive('/') ? 'bg-primary-light text-primary' : 'text-neutral-medium hover:bg-gray-50'}`}>
                <div className="flex items-center">
                  <Home className="h-5 w-5 mr-3" />
                  Home
                </div>
              </a>
            </Link>
            <Link href="/archives">
              <a className={`block py-3 px-4 rounded-md ${isActive('/archives') ? 'bg-primary-light text-primary' : 'text-neutral-medium hover:bg-gray-50'}`}>
                <div className="flex items-center">
                  <Book className="h-5 w-5 mr-3" />
                  Archives
                </div>
              </a>
            </Link>
            <Link href="/docs">
              <a className={`block py-3 px-4 rounded-md ${isActive('/help') ? 'bg-primary-light text-primary' : 'text-neutral-medium hover:bg-gray-50'}`}>
                <div className="flex items-center">
                  <Book className="h-5 w-5 mr-3" />
                  Docs
                </div>
              </a>
            </Link>
            <Link href="/contact">
              <a className={`block py-3 px-4 rounded-md ${isActive('/contact') ? 'bg-primary-light text-primary' : 'text-neutral-medium hover:bg-gray-50'}`}>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3" />
                  Contact Us
                </div>
              </a>
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left block py-3 px-4 rounded-md text-neutral-medium hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <LogOut className="h-5 w-5 mr-3" />
                  Sign Out
                </div>
              </button>
            ) : (
              <Link href="/auth">
                <a className="block py-3 px-4 rounded-md bg-primary text-white">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-3" />
                    Sign In
                  </div>
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
