import React from 'react';
import { LucideIcon } from 'lucide-react';

interface WhyChoenFeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function WhyChoenFeature({ icon: Icon, title, description }: WhyChoenFeatureProps) {
  return (
    <div className="flex items-start gap-6">
      {/* Icon Circle */}
      <div className="w-[80px] h-[80px] rounded-full bg-[#3E996C] shrink-0 flex items-center justify-center">
        <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 
          style={{ 
            fontFamily: "'Orbitron', sans-serif", 
            fontSize: '22px',
            fontWeight: '700',
            color: '#022413',
            marginBottom: '10px'
          }}
        >
          {title}
        </h3>
        <p 
          style={{ 
            fontFamily: "'Open Sans', sans-serif", 
            fontSize: '16px',
            color: '#363636',
            lineHeight: '1.7'
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
