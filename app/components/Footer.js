import React from 'react'

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-8 pb-4 mt-9">
        <div className="container mx-auto flex flex-col md:flex-row md:justify-between px-6">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-4">Aeon</h2>
            <p className="text-gray-400">Your trusted partner for managing land information efficiently. For more details and support, feel free to get in touch.</p>
          </div>
          <div className="flex-1 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:underline">Land Registration</a></li>
              <li><a href="#" className="text-gray-300 hover:underline">Land Records</a></li>
              <li><a href="#" className="text-gray-300 hover:underline">User Manual</a></li>
              <li><a href="#" className="text-gray-300 hover:underline">Reports</a></li>
              <li><a href="#" className="text-gray-300 hover:underline">Profile</a></li>
            </ul>
          </div>
          <div className="flex-1 mb-6 md:mb-0">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li><a href="mailto:support@landinfo.com" className="text-gray-300 hover:underline">support@Aeon.com</a></li>
              <li><a href="tel:+1234567890" className="text-gray-300 hover:underline">+234 706 176 1375</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} LandInfo. All rights reserved.</p>
        </div>
      </footer>
  )
}
