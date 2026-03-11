import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import FinderSearch from '@/components/finder/FinderSearch';
import FinderList from '@/components/finder/FinderList';
import FinderDetails from '@/components/finder/FinderDetails';
import VerificationForm from '@/components/finder/VerificationForm';
import GlassCard from '@/components/shared/GlassCard';
import { LostItem } from '@/types/lostItem';
import { searchItems, getStoredItems } from '@/lib/storage';

type ViewState = 'search' | 'details' | 'verify';

const FinderPage = () => {
  const [view, setView] = useState<ViewState>('search');
  const [searchResults, setSearchResults] = useState<LostItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<LostItem | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Load all lost items initially
    const items = getStoredItems().filter(item => item.status === 'lost');
    setSearchResults(items);
  }, []);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const results = searchItems(query);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleItemSelect = (item: LostItem) => {
    setSelectedItem(item);
    setView('details');
  };

  const handleClaim = () => {
    setView('verify');
  };

  const handleBackToSearch = () => {
    setView('search');
    setSelectedItem(null);
  };

  const handleBackToDetails = () => {
    setView('details');
  };

  const handleVerificationSuccess = () => {
    setView('search');
    setSelectedItem(null);
    // Refresh results
    const items = getStoredItems().filter(item => item.status === 'lost');
    setSearchResults(items);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {view === 'search' && (
          <motion.div
            key="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h1 className="font-heading text-4xl font-bold gradient-text mb-2">
                  Find Lost Items
                </h1>
                <p className="text-muted-foreground">
                  Search for items that have been reported lost
                </p>
              </motion.div>
            </div>

            <div className="mb-8">
              <FinderSearch onSearch={handleSearch} isSearching={isSearching} />
            </div>

            {searchResults.length > 0 ? (
              <FinderList items={searchResults} onItemSelect={handleItemSelect} />
            ) : hasSearched ? (
              <GlassCard className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No items found matching your search.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try different keywords or check back later.
                </p>
              </GlassCard>
            ) : (
              <GlassCard className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No lost items reported yet.</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Check back later or report a lost item.
                </p>
              </GlassCard>
            )}
          </motion.div>
        )}

        {view === 'details' && selectedItem && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FinderDetails 
              item={selectedItem} 
              onBack={handleBackToSearch}
              onClaim={handleClaim}
            />
          </motion.div>
        )}

        {view === 'verify' && selectedItem && (
          <motion.div
            key="verify"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto"
          >
            <VerificationForm 
              item={selectedItem}
              onBack={handleBackToDetails}
              onSuccess={handleVerificationSuccess}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FinderPage;
