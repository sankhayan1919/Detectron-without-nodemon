export default function TermsPage() {
    return (
      <div className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Terms of Use</h2>
            
            <div className="space-y-6 text-neutral-medium">
              <p>
              This platform is strictly for authorized government investigators conducting lawful social media analysis with proper legal authority. Users must comply with all security protocols and assume full responsibility for ensuring their investigative activities adhere to applicable laws and platform requirements.
              </p>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Authorized Users</h3>
                <p>
                  Restricted to verified government personnel with official agency credentials. All users must complete mandatory security training before access.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Acceptable Use</h3>
                <p>
                  Only for lawful investigative purposes with proper legal authorization. Private account analysis requires valid warrants or court orders.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Data Restrictions</h3>
                <p>
                  Analysis limited to publicly available content per platform terms. Users bear responsibility for ensuring legal data collection methods.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Security Requirements</h3>
                <p>
                  Mandatory multi-factor authentication for all accounts. Sharing login credentials or bypassing security measures is strictly prohibited.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Compliance & Monitoring</h3>
                <p>
                  All activity logged and auditable. Platform reserves right to suspend accounts for policy violations or suspicious behavior.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Liability Disclaimer</h3>
                <p>
                  Tool provided "as-is" without warranties. Users assume full legal responsibility for their investigative actions and data sourcing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Policy Enforcement</h3>
                <p>
                  Violations may result in immediate account termination and reporting to agency supervisors. All disputes governed by federal laws.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-light">
                <p className="text-sm">
                  Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm mt-2">
                  For questions regarding this terms of use, please contact your department's officer or the platform 
                  administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  