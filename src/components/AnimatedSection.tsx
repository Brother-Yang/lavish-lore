import { useInView } from 'react-intersection-observer';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-in' | 'scale-in' | 'slide-left' | 'slide-right';
  delay?: number;
}

export const AnimatedSection = ({ 
  children, 
  className,
  animation = 'fade-up',
  delay = 0
}: AnimatedSectionProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        !inView && 'opacity-0',
        !inView && animation === 'fade-up' && 'translate-y-10',
        !inView && animation === 'fade-in' && 'scale-95',
        !inView && animation === 'scale-in' && 'scale-90',
        !inView && animation === 'slide-left' && '-translate-x-10',
        !inView && animation === 'slide-right' && 'translate-x-10',
        inView && 'opacity-100 translate-y-0 translate-x-0 scale-100',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
