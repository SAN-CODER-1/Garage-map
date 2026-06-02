import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/shared/GlassCard';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <GlassCard className="max-w-md w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-6">
            <span className="font-heading text-8xl font-bold gradient-text">404</span>
          </div>
          
          <h1 className="font-heading text-2xl font-bold mb-2">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            Looks like this page got lost too. Let's help you find your way back.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/">
              <Button variant="neon" size="lg">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Link to="/finder">
              <Button variant="neon-outline" size="lg">
                <Search className="w-4 h-4" />
                Search Items
              </Button>
            </Link>
          </div>
        </motion.div>
      </GlassCard>
    </div>
  );
};

export default NotFound;
