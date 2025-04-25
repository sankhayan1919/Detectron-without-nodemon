export default function PrivacyPage() {
  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Privacy Policy</h2>
          
          <div className="space-y-6 text-neutral-medium">
            <p>
              This Privacy Policy describes how the Social Media Analysis Platform collects, uses, and shares information 
              in connection with your use of our services.
            </p>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Information Collection</h3>
              <p>
                We collect information necessary for the operation of the platform, including login credentials, 
                organization affiliations, and content submitted for analysis. All collection activities comply with 
                relevant government regulations and security protocols.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Use of Information</h3>
              <p>
                Information collected is used solely for the purposes of providing analysis services, maintaining 
                platform security, and ensuring proper access control. Data may be retained according to government 
                record-keeping requirements.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Information Sharing</h3>
              <p>
                All analysis results and user data are considered sensitive and confidential. Access is restricted to 
                authorized personnel with appropriate clearance levels. Information sharing occurs only as required by 
                law or according to established intelligence sharing protocols.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Security Measures</h3>
              <p>
                We implement strict security measures to protect the confidentiality and integrity of all data. These 
                include encryption, access controls, audit logging, and regular security assessments in compliance with 
                federal security standards.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Policy Updates</h3>
              <p>
                This policy may be updated periodically to reflect changes in our practices or regulatory requirements. 
                Users will be notified of significant changes via the platform or official communication channels.
              </p>
            </div>
            
            <div className="pt-4 border-t border-neutral-light">
              <p className="text-sm">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-sm mt-2">
                For questions regarding this policy, please contact your department's privacy officer or the platform 
                administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
