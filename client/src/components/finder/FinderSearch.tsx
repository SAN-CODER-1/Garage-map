import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FinderSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const suggestedSearches = ['wallet', 'phone', 'keys', 'bag', 'laptop', 'headphones'];

const FinderSearch = ({ onSearch, isSearching }: FinderSearchProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for lost items (wallet, phone, keys...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 pr-32 h-14 text-lg input-glass rounded-xl"
          />
          <Button
            type="submit"
            variant="neon"
            size="lg"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            disabled={!query.trim() || isSearching}
          >
            {isSearching ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4" />
          Quick search:
        </span>
        {suggestedSearches.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleSuggestion(suggestion)}
            className="px-3 py-1.5 rounded-full bg-muted/50 text-sm text-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default FinderSearch;
