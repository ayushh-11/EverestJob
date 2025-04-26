import React from 'react';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import { FaInstagram } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* Location */}
          <div>
            <h3 className="text-base font-semibold mb-2">Location</h3>
            <p className="text-gray-400 text-sm">Kathmandu, Nepal</p>
          </div>

          {/* Everest Job Info */}
          <div>
            <h3 className="text-base font-semibold mb-2">Everest Job</h3>
            <p className="text-gray-400 text-sm">Connecting talented individuals with top job opportunities across Nepal.</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-base font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-2xl text-gray-400">
              <a href="https://www.facebook.com" className="hover:text-white transition">
                <CiFacebook />
              </a>
              <a href="https://www.linkedin.com" className="hover:text-white transition">
                <CiLinkedin />
              </a>
              <a href="https://www.instagram.com" className="hover:text-white transition">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-6 border-t border-gray-800 pt-4 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Everest Job. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
