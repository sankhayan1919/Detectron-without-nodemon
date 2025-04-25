import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";

export default function NavBar() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <svg className="block h-8 w-auto text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="ml-2 text-lg font-semibold text-primary">Social Media Analysis</span>
            </div>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/">
              <a className={`px-3 py-2 text-sm font-medium ${isActive('/') ? 'text-primary border-b-2 border-primary' : 'text-neutral-dark hover:text-primary'}`}>
                Home
              </a>
            </Link>
            <a href="#" className="px-3 py-2 text-sm font-medium text-neutral-dark hover:text-primary" onClick={(e) => { e.preventDefault(); alert('Archives page will be implemented later.'); }}>
              Archives
            </a>
            <Link href="/help">
              <a className={`px-3 py-2 text-sm font-medium ${isActive('/help') ? 'text-primary border-b-2 border-primary' : 'text-neutral-dark hover:text-primary'}`}>
                Help
              </a>
            </Link>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark"
              >
                Sign Out
              </button>
            ) : (
              <Link href="/auth">
                <a className="px-4 py-2 text-sm font-medium text-white bg-primary rounded hover:bg-primary-dark">
                  Sign Up
                </a>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
