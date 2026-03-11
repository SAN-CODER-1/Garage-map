import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, FileQuestion, Home } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/owner', label: 'Report Lost', icon: FileQuestion },
    { path: '/finder', label: 'Find Item', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-neon-gradient flex items-center justify-center shadow-neon">
                <Search className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-bold text-xl gradient-text">
                Real one
              </span>
            </Link>

            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? 'bg-primary/20 text-primary border border-primary/30' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-sm">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative pt-20 pb-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
