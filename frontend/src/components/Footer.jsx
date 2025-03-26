import React from 'react';
import { CiFacebook, CiLinkedin } from 'react-icons/ci';
import { FaInstagram } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Location Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Location</h3>
            <p className="text-gray-400">Kathmandu, Nepal</p>
          </div>

          {/* Everest Job Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Everest Job</h3>
            <button className="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200">
              Company Login
            </button>
          </div>

          {/* Follow Us Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                className="text-3xl text-gray-400 hover:text-white transition-colors duration-200"
              >
                <CiFacebook />
              </a>
              <a
                href="https://www.linkedin.com"
                className="text-3xl text-gray-400 hover:text-white transition-colors duration-200"
              >
                <CiLinkedin />
              </a>
              <a
                href="https://www.instagram.com"
                className="text-3xl text-gray-400 hover:text-white transition-colors duration-200"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Newsletter Section (Optional) */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-l-md outline-none placeholder-gray-500"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; 2023 Everest Job. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;