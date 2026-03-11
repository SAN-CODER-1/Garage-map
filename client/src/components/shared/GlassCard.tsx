import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, 'children'> {
  children: ReactNode;
  hoverable?: boolean;
  neonBorder?: boolean;
}

const GlassCard = ({ 
  children, 
  className, 
  hoverable = false,
  neonBorder = false,
  ...props 
}: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        hoverable ? 'glass-card-hover' : 'glass-card',
        neonBorder && 'neon-border',
        'p-6',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
