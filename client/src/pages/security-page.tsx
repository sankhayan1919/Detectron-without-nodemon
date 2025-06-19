export default function SecurityPage() {
    return (
      <div className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-neutral-dark">Security Policy</h2>
            
            <div className="space-y-6 text-neutral-medium">
              <p>
              Our platform enforces strict access controls, encryption, and audit trails to protect sensitive data and ensure compliance. Only authorized government personnel can use the tool, with mandatory multi-factor authentication and role-based permissions. 
              </p>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Strict Access Controls</h3>
                <p>
                  Only authorized government personnel with .gov or agency-verified emails can register. Multi-factor authentication (MFA) is mandatory for all accounts.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Role-Based Permissions</h3>
                <p>
                  Three-tier access: Analysts (submit cases), Supervisors (audit reports), Admins (manage users). Permissions align with operational hierarchy.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Public Data Only</h3>
                <p>
                  Analysis restricted to publicly available content; private data requires warrant documentation. Automated scraping avoids platform ToS violations.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">End-to-End Encryption</h3>
                <p>
                  All data encrypted with AES-256 (at rest) and TLS 1.3 (in transit). PDFs include SHA-256 hashes for tamper-proofing.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Immutable Audit Logs</h3>
                <p>
                  All actions (logins, report generation) logged to write-only storage. Logs include timestamps, user IDs, and IP addresses.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Incident Response Protocol</h3>
                <p>
                  All actions (logins, report generation) logged to write-only storage. Logs include timestamps, user IDs, and IP addresses.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-neutral-dark">Annual Compliance Checks</h3>
                <p>
                  Mandatory penetration testing and SOC 2 audits. Users retrained on security policies yearly.
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-light">
                <p className="text-sm">
                  Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="text-sm mt-2">
                  For questions regarding this policy, please contact your department's officer or the platform 
                  administrator.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  