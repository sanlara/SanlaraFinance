import React from 'react';
import { cn, cardVariants } from '../../utils/styles';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(cardVariants.base, className)}>
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ 
  children, 
  className 
}: CardProps) {
  return (
    <div className={cn(cardVariants.header, className)}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({ 
  children, 
  className 
}: CardProps) {
  return (
    <div className={cn(cardVariants.body, className)}>
      {children}
    </div>
  );
};