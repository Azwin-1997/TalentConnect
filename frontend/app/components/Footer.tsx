export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-blue-400 mb-4">TalentConnect</h3>
            <p className="text-gray-400 max-w-md">
              Connecting talent with the right opportunities. Your career journey starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Social or Additional Info */}
          <div>
            <h4 className="mb-4">Connect</h4>
            <p className="text-gray-400">
              Stay updated with the latest job opportunities and career tips.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2025 TalentConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
