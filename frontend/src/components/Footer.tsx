import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 text-center text-sm text-gray-400 bg-gray-900">
      &copy; {new Date().getFullYear()} Legendary CV Analyzer. All rights reserved.
    </footer>
  );
};

export default Footer;
