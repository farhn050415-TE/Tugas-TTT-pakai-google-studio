import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className }) => {
  return (
    <div className={`bg-dark-card/80 backdrop-blur-sm border border-dark-border rounded-lg p-4 sm:p-6 shadow-xl shadow-black/30 ${className}`}>
      <h3 className="text-lg font-bold text-primary-400 mb-4 text-glow">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};
