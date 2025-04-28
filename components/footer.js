'use client';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-6 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        
        {/* Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm">&copy; {new Date().getFullYear()} WarungKu. All rights reserved.</p>
        </div>

        {/* Policy Links */}
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-300 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-300 transition">
            Terms of Service
          </a>
        </div>

      </div>
    </footer>
  );
}
