import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Wrench, Settings, Navigation } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  
  // Real routes for WheelConnect
  const navItems = [
    { path: '/home', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/garages', label: 'Book Service', icon: Wrench },
    { path: '/garage-dashboard', label: 'Garage Portal', icon: Settings },
  ];

  // Hide nav on purely functional screens if desired, but typically we keep it unless specified.
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Navigation - Hidden on auth pages if preferred, but leaving it sticky for now */}
      {!isAuthPage && (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/60 backdrop-blur-xl bg-white/80 shadow-sm">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-20">
              
              {/* BRANDING */}
              <Link to="/home" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                  WheelConnect
                </span>
              </Link>

              {/* NAV ITEMS */}
              <div className="hidden md:flex items-center gap-2">
                {navItems.map((item) => {
                  const isActive = location.pathname.startsWith(item.path);
                  const Icon = item.icon;
                  return (
                    <Link key={item.path} to={item.path}>
                      <motion.div
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(241, 245, 249, 1)" }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                          isActive 
                            ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className="font-bold text-sm tracking-wide">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Backup / Extra Buttons could go here */}
              <div className="md:hidden flex items-center">
                 <div className="text-xs font-bold text-slate-400">Mobile Nav</div>
              </div>

            </div>
          </div>
        </nav>
      )}

      {/* Main content */}
      <main className={`relative ${isAuthPage ? '' : 'pt-24'} pb-12`}>
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
