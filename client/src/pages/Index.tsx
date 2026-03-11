import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, FileQuestion, Shield, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/shared/GlassCard';

const features = [
  {
    icon: MapPin,
    title: 'Location Tracking',
    description: 'Mark the exact location where you lost your item on an interactive map.'
  },
  {
    icon: Shield,
    title: 'Secure Verification',
    description: 'Multi-question security system prevents false claims and protects your property.'
  },
  {
    icon: CheckCircle2,
    title: 'Smart Matching',
    description: 'Intelligent search helps finders locate items quickly and accurately.'
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
            >
              <Search className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Smart Lost & Found System</span>
            </motion.div>

            <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Lost Something?</span>
              <br />
              <span className="text-foreground">We'll Help You Find It</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A secure, privacy-focused platform connecting people with their lost belongings. 
              Report items, search the database, and verify ownership safely.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/owner">
                <Button variant="neon" size="xl" className="group">
                  <FileQuestion className="w-5 h-5" />
                  Report Lost Item
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/finder">
                <Button variant="neon-outline" size="xl" className="group">
                  <Search className="w-5 h-5" />
                  Search Items
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <GlassCard hoverable className="h-full">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <GlassCard neonBorder>
              <h2 className="font-heading text-2xl font-bold text-center gradient-text mb-8">
                How It Works
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Owner Flow */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <FileQuestion className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">For Owners</h3>
                  </div>
                  <ol className="space-y-3">
                    {['Upload item photo', 'Mark location on map', 'Add item details', 'Set security questions', 'Submit report'].map((step, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-sm flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Finder Flow */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                      <Search className="w-4 h-4 text-secondary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold">For Finders</h3>
                  </div>
                  <ol className="space-y-3">
                    {['Search for items', 'View limited details', 'Click to claim', 'Answer verification questions', 'Access full information'].map((step, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-secondary/20 text-secondary text-sm flex items-center justify-center font-medium">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
