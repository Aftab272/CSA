import React from 'react';

interface AdContainerProps {
  id: string;
  className?: string;
  label?: string;
}

const AdContainer: React.FC<AdContainerProps> = ({ id, className = '', label = 'Advertisement' }) => {
  // Enhanced Ad Slot with Brand Integration
  return (
    <div 
      id={id} 
      className={`ad-container my-12 border border-accent/20 bg-accent/[0.02] rounded-3xl overflow-hidden flex items-center justify-center min-h-[140px] transition-all duration-500 hover:border-accent/40 group relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="flex flex-col items-center gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/60 group-hover:text-accent transition-colors duration-300">{label}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </div>
        <div className="w-12 h-[1px] bg-white/10 group-hover:w-24 group-hover:bg-accent/40 transition-all duration-500" />
        <p className="text-xs text-gray-500 font-medium italic opacity-60 group-hover:opacity-100 transition-opacity duration-300">
          Premium Advertising Space Available
        </p>
      </div>
    </div>
  );
};

export default AdContainer;
