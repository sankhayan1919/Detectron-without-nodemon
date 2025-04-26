export default function HelpPage() {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Help & Documentation</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Platform Overview</h3>
              <p className="text-neutral-medium mb-4">
                The Detectron app is designed for government agencies like R&W, NIA, CBI, ED etc. to parse social media content like posts, account info etc.for intelligence purposes.
                This tool provides semantic analysis and threat prediction capabilities to identify potential security concerns.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-dark">How to Use</h3>
              <ol className="list-decimal pl-5 space-y-2 text-neutral-medium">
                <li>Enter your account credentials and the target account information in the analysis form.</li>
                <li>Choose the content you wish to analyze (posts, bio etc.).</li>
                <li>Click "Run Analysis" to process the content.</li>
                <li>Review the generated reports in both the Semantic Analysis and Threat Prediction sections.</li>
                <li>Download or save PDF reports for your records.</li>
                <li>In the Archives section all the PDF s are stored with case ID, investigator's name and timestamp.</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-neutral-dark">What types of content can I analyze?</h4>
                  <p className="text-neutral-medium">The platform supports analysis of social media posts, account info sections primarily.</p>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-dark">How accurate is the threat prediction?</h4>
                  <p className="text-neutral-medium">The system uses advanced AI algorithms with an accuracy rate dependent on the quality of input data. Results should be verified by trained personnel.</p>
                </div>
                <div>
                  <h4 className="font-medium text-neutral-dark">Who can access this platform?</h4>
                  <p className="text-neutral-medium">Access is restricted to authorized government personnel with valid organization codes.</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-3 text-neutral-dark">Technical Support</h3>
              <p className="text-neutral-medium mb-2">
                For technical assistance, please contact the support team:
              </p>
              <ul className="list-disc pl-5 text-neutral-medium">
                <li>Email: sankhayan2004@gmail.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Hours: Monday-Friday, 8:00 AM - 5:00 PM EST</li>
              </ul>
              <p className="mt-4 text-sm text-neutral-medium">
                For urgent matters outside of business hours, please use the emergency contact information provided to your department.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
