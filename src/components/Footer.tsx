import React from 'react';
import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <p className="text-gray-500 text-sm max-w-2xl">
            TNLEA Rank Explorer is an independent community project and is <strong className="font-semibold text-gray-700">not affiliated</strong> with the Government of Tamil Nadu or TNLEA counselling.
          </p>
          <p className="text-gray-500 text-sm max-w-2xl">
            All information displayed on this website is voluntarily contributed by students. Please verify all admission decisions using the official TNLEA counselling portal.
          </p>
          <div className="flex flex-col items-center mt-8 space-y-2">
            <p className="text-gray-400 text-xs">
              &copy; {new Date().getFullYear()} TNLEA Rank Explorer.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600 font-medium">
              <span>Built by Survesh Chandru &bull; AI & ML Student</span>
              <a 
                href="https://www.linkedin.com/in/survesh-chandru-6a9bab286" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0A66C2] hover:text-blue-800 transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
