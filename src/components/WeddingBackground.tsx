import React from 'react';

const WeddingBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Beige gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f5f5dc] via-[#e6d7bf] to-[#d2b48c]/20"></div>
      
      {/* Elegant corner element (top-left) */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M25,20 A20,20 0 0,1 45,20 A20,20 0 0,1 65,20 A20,20 0 0,1 45,60 L25,60 A20,20 0 0,1 25,20 Z" fill="#d2b48c" />
          <path d="M30,30 Q40,20 50,30 Q60,20 70,30" fill="none" stroke="#e6d7bf" strokeWidth="2" />
        </svg>
      </div>
      
      {/* Elegant leaf corner element (bottom-right) */}
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M20,50 Q30,35 50,40 Q65,30 75,40 Q90,35 90,50 Q100,65 85,70 Q90,80 75,80 Q65,90 50,80 Q35,90 30,75 Q10,70 20,50" fill="#a98467" />
        </svg>
      </div>
      
      {/* Simple elegant line decoration (top-right) */}
      <div className="absolute top-10 right-10 w-64 h-64 opacity-15">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <line x1="0" y1="20" x2="100" y2="20" stroke="#d2b48c" strokeWidth="1" />
          <line x1="0" y1="40" x2="100" y2="40" stroke="#d2b48c" strokeWidth="1" />
          <line x1="0" y1="60" x2="100" y2="60" stroke="#d2b48c" strokeWidth="1" />
          <line x1="0" y1="80" x2="100" y2="80" stroke="#d2b48c" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Simple border */}
      <div className="absolute inset-8 border border-[#d2b48c] opacity-10 rounded-lg pointer-events-none"></div>
    </div>
  );
};

export default WeddingBackground;