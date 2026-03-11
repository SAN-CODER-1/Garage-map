import { motion } from 'framer-motion';
import { Clock, Lock, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/shared/GlassCard';
import { LostItem } from '@/types/lostItem';

interface FinderDetailsProps {
  item: LostItem;
  onBack: () => void;
  onClaim: () => void;
}

const FinderDetails = ({ item, onBack, onClaim }: FinderDetailsProps) => {
  return (
    <GlassCard>
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to search
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="relative rounded-xl overflow-hidden border border-primary/30">
           {/* <img  
  src={item.imageUrl} 
  alt={item.name}
  className="w-full h-64 lg:h-80 object-cover blur-lg brightness-75 contrast-110 rounded-xl"
/> */}

            <div className="">
              <span className="text-sm font-medium text-primary capitalize">
                {item.category}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h2 className="font-heading text-3xl font-bold gradient-text mb-2">
              {item.name}
            </h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>
                Reported on {new Date(item.dateReported).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Restricted Info */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-2 text-foreground mb-2">
                <Lock className="w-4 h-4 text-primary" />
                <span className="font-medium">Description</span>
              </div>
              <p className="text-muted-foreground text-sm">
                [Hidden for security] — Verify ownership to view
              </p>
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-2 text-foreground mb-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium">Location</span>
              </div>
              <p className="text-muted-foreground text-sm">
                [Hidden for security] — Verify ownership to view
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-primary">Security Notice:</strong> To prevent false claims, 
              you must answer verification questions set by the owner to access the full details 
              and claim this item.
            </p>
          </div>

          <Button 
            variant="neon" 
            size="xl" 
            className="w-full"
            onClick={onClaim}
          >
            Claim This Item
          </Button>
        </motion.div>
      </div>
    </GlassCard>
  );
};

export default FinderDetails;
