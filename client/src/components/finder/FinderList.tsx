import { motion } from 'framer-motion';
import { Clock, Eye } from 'lucide-react';
import GlassCard from '@/components/shared/GlassCard';
import { LostItem } from '@/types/lostItem';

interface FinderListProps {
  items: LostItem[];
  onItemSelect: (item: LostItem) => void;
}

const FinderList = ({ items, onItemSelect }: FinderListProps) => {
  if (items.length === 0) {
    return (
      <GlassCard className="text-center py-12">
        <p className="text-muted-foreground">No items found matching your search.</p>
        <p className="text-sm text-muted-foreground mt-2">
          Try different keywords or browse all items.
        </p>
      </GlassCard>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div
            onClick={() => onItemSelect(item)}
            className="glass-card-hover cursor-pointer group overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden rounded-t-xl -m-6 mb-4">
              {/* <img 
                src={item.imageUrl} 
                alt={item.name}
                className="w-full h-64 lg:h-80 object-cover blur-lg brightness-75 contrast-110 rounded-xl"
              /> */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30">
                <span className="text-xs font-medium text-primary capitalize">
                  {item.category}
                </span>
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {item.name}
              </h3>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(item.dateReported).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-primary text-sm font-medium">
                  <Eye className="w-4 h-4" />
                  <span>View Details</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FinderList;
