import React from 'react';

const WeddingDecorations: React.FC = () => {
  return (
    <div className="wedding-decorations">
      {/* Top left cute heart corner */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-40 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 Q30,5 40,25 T50,50 Q55,70 70,80 T100,100 L0,100 Z" fill="#ffb6c1" opacity="0.2" />
          {/* Cute hearts pattern */}
          <g transform="translate(15, 15)">
            {/* Big heart */}
            <path d="M25,10 A10,10 0 0,1 35,0 A10,10 0 0,1 45,10 A10,10 0 0,1 25,30 A10,10 0 0,1 5,10 A10,10 0 0,1 15,0 A10,10 0 0,1 25,10 Z" fill="#ffb6c1" className="animate-[pulse_4s_ease-in-out_infinite]" />
            {/* Small heart */}
            <path d="M60,20 A5,5 0 0,1 65,15 A5,5 0 0,1 70,20 A5,5 0 0,1 60,30 A5,5 0 0,1 50,20 A5,5 0 0,1 55,15 A5,5 0 0,1 60,20 Z" fill="#ffd1dc" className="animate-[pulse_3s_ease-in-out_infinite]" style={{animationDelay: '1s'}} />
            {/* Tiny heart */}
            <path d="M15,50 A3,3 0 0,1 18,47 A3,3 0 0,1 21,50 A3,3 0 0,1 15,56 A3,3 0 0,1 9,50 A3,3 0 0,1 12,47 A3,3 0 0,1 15,50 Z" fill="#ffe9a8" className="animate-[pulse_5s_ease-in-out_infinite]" style={{animationDelay: '2s'}} />
          </g>
        </svg>
      </div>
      
      {/* Bottom right cute cloud corner */}
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-40 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M100,100 Q70,95 60,75 T50,50 Q45,30 30,20 T0,0 L100,0 Z" fill="#a6e3e9" opacity="0.2" />
          <g transform="translate(40, 40)">
            {/* Cloud */}
            <path d="M30,10 Q40,0 50,10 Q60,5 60,15 Q70,10 70,20 Q80,15 80,25 Q90,20 90,30 Q80,40 70,35 Q60,45 50,35 Q40,40 30,30 Q20,35 20,25 Q10,30 10,20 Q20,10 30,10" fill="#a6e3e9" className="animate-[float_8s_ease-in-out_infinite]" />
            {/* Star */}
            <path d="M20,50 L22,55 L28,55 L23,58 L25,64 L20,60 L15,64 L17,58 L12,55 L18,55 Z" fill="#ffe9a8" className="animate-[pulse_4s_ease-in-out_infinite]" style={{animationDelay: '1.5s'}} />
            {/* Rainbow */}
            <path d="M50,40 A20,20 0 0,1 70,60" fill="none" stroke="#ffb6c1" strokeWidth="2" className="animate-[pulse_5s_ease-in-out_infinite]" style={{animationDelay: '2.5s'}} />
            <path d="M50,45 A15,15 0 0,1 65,60" fill="none" stroke="#ffe9a8" strokeWidth="2" className="animate-[pulse_5s_ease-in-out_infinite]" style={{animationDelay: '2.7s'}} />
            <path d="M50,50 A10,10 0 0,1 60,60" fill="none" stroke="#a6e3e9" strokeWidth="2" className="animate-[pulse_5s_ease-in-out_infinite]" style={{animationDelay: '2.9s'}} />
          </g>
        </svg>
      </div>
      
      {/* Floating cute symbols */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => {
          // Alternate between different cute symbols
          const symbolType = i % 3;
          return (
            <div 
              key={i}
              className="absolute opacity-40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            >
              {symbolType === 0 ? (
                // Heart
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12,6 A4,4 0 0,0 8,10 A4,4 0 0,0 12,14 A4,4 0 0,0 16,10 A4,4 0 0,0 12,6 Z" fill="#ffb6c1" />
                </svg>
              ) : symbolType === 1 ? (
                // Star
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12,2 L15,8 L21,9 L16.5,14 L18,20 L12,17 L6,20 L7.5,14 L3,9 L9,8 Z" fill="#ffe9a8" />
                </svg>
              ) : (
                // Cloud
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M6,12 Q3,12 3,9 Q3,6 6,6 Q6,3 9,3 Q12,3 12,6 Q15,6 15,9 Q15,12 12,12 Z" fill="#a6e3e9" />
                </svg>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Cute dotted divider */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 opacity-40 pointer-events-none">
        <svg viewBox="0 0 100 20" className="w-full">
          <pattern id="cutePattern" patternUnits="userSpaceOnUse" width="10" height="10">
            <circle cx="5" cy="5" r="2" fill="#ffb6c1" />
          </pattern>
          <rect x="0" y="8" width="100" height="4" fill="url(#cutePattern)" />
          
          {/* Cute center element */}
          <circle cx="50" cy="10" r="6" fill="#ffe9a8" opacity="0.8" className="animate-[pulse_4s_ease-in-out_infinite]" />
          <path d="M47,10 L53,10 M50,7 L50,13" stroke="#fff" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/4 right-1/4 opacity-40 pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 60 60">
          {/* Cute balloon */}
          <path d="M30,50 L30,60" stroke="#ffd1dc" strokeWidth="1" />
          <circle cx="30" cy="30" r="20" fill="#ffb6c1" />
          <circle cx="25" cy="25" r="5" fill="white" fillOpacity="0.6" />
        </svg>
      </div>
      
      <div className="absolute bottom-1/4 left-1/4 opacity-40 pointer-events-none">
        <svg width="50" height="50" viewBox="0 0 50 50">
          {/* Cute ice cream */}
          <path d="M25,10 L15,30 L35,30 Z" fill="#b5e8d5" />
          <rect x="20" y="30" width="10" height="15" fill="#ffe9a8" />
        </svg>
      </div>
    </div>
  );
};

export default WeddingDecorations;