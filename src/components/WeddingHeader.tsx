import React from 'react';

interface WeddingHeaderProps {
  coupleNames: string;
  weddingDate: string;
}

const WeddingHeader: React.FC<WeddingHeaderProps> = ({ coupleNames, weddingDate }) => {
  // Split couple names to style them individually
  const [firstPerson, secondPerson] = coupleNames.split(' & ');
  
  return (
    <header className="text-center py-12 relative border-b border-[#d2b48c]/20">
      <h1 className="text-5xl font-serif font-light mb-6 tracking-wider">
        <span className="block mb-2 text-[#d2b48c]">{firstPerson}</span>
        <span className="inline-block mx-4 text-3xl text-[#d4ac6e]">&</span>
        <span className="block mt-2 text-[#a98467]">{secondPerson}</span>
      </h1>
      
      <p className="text-lg text-[#5e503f] mb-6">{weddingDate}</p>
      
      <p className="text-xl text-[#5e503f] max-w-lg mx-auto font-light">
        Thank you for being part of our special day
        <br/>
        <span className="block mt-2 text-[#006747]">Please share your precious memories with us!</span>
      </p>
      
      {/* Combined Pakistani and Egyptian decorative element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 opacity-30">
        <svg viewBox="0 0 100 25" className="w-full h-full">
          {/* Crescent and star (Pakistani) combined with Egyptian motif */}
          <path d="M0,25 C30,15 70,15 100,25" stroke="#006747" strokeWidth="2" fill="none" />
          <path d="M0,20 C30,10 70,10 100,20" stroke="#d4af37" strokeWidth="1" fill="none" />
          <circle cx="50" cy="15" r="5" fill="#ce1126" />
          <path d="M45,10 L55,10 L50,20 Z" fill="#d4af37" />
        </svg>
      </div>
      
      {/* Pakistani-inspired geometric pattern */}
      <div className="absolute bottom-4 left-0 right-0 h-2 opacity-20">
        <svg viewBox="0 0 100 2" className="w-full h-full" preserveAspectRatio="none">
          <pattern id="pakistaniPattern2" patternUnits="userSpaceOnUse" width="20" height="2" patternTransform="rotate(0)">
            <rect width="10" height="2" fill="#ce1126" />
            <rect x="10" width="10" height="2" fill="#d4af37" />
          </pattern>
          <rect width="100" height="2" fill="url(#pakistaniPattern2)" />
        </svg>
      </div>
    </header>
  );
};

export default WeddingHeader;