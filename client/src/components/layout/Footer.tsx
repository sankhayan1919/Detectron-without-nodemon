import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <span className="font-semibold">Social Media Analysis Platform</span>
            <p className="text-sm mt-2 text-gray-300">Authorized government use only</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/"><a className="text-gray-300 hover:text-white">Home</a></Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white" onClick={(e) => { e.preventDefault(); alert('Archives page will be implemented later.'); }}>Archives</a></li>
                <li><Link href="/help"><a className="text-gray-300 hover:text-white">Help</a></Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact"><a className="text-gray-300 hover:text-white">Contact Us</a></Link></li>
                <li><Link href="/help"><a className="text-gray-300 hover:text-white">FAQ</a></Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white">System Status</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-3">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy"><a className="text-gray-300 hover:text-white">Privacy Policy</a></Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Terms of Use</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Social Media Analysis. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center text-xs bg-primary rounded px-2 py-1">OFFICIAL USE ONLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
