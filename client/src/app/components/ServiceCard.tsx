import React from 'react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

export function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="bg-card border-2 border-primary/20 rounded-lg p-8 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
      <div className="text-primary mb-4">
        {icon}
      </div>
      <h3 className="mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm">
            <span className="text-primary mt-1">✓</span>
            <span className="text-foreground/90">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
