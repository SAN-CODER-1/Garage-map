import { motion } from 'framer-motion';
import { Package, Tag, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GlassCard from '@/components/shared/GlassCard';

interface DetailsStepProps {
  name: string;
  description: string;
  category: string;
  imageUrl?: string; // Add image prop
  onNameChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const categories = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'wallet', label: 'Wallet / Purse' },
  { value: 'keys', label: 'Keys' },
  { value: 'bag', label: 'Bag / Backpack' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'documents', label: 'Documents / ID' },
  { value: 'phone', label: 'Phone' },
  { value: 'other', label: 'Other' },
];

const DetailsStep = ({ 
  name, 
  description, 
  category, 
  imageUrl, // Add imageUrl prop
  onNameChange, 
  onDescriptionChange, 
  onCategoryChange, 
  onNext, 
  onBack 
}: DetailsStepProps) => {
  const isValid = name.trim() && description.trim() && category;

  return (
    <div className="relative h-full overflow-hidden">
      {/* Blurred background image */}
      {imageUrl && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(20px) brightness(0.6) contrast(1.2)',
          }}
        />
      )}
      
      {/* Overlay to ensure readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-black/20 to-black/50" />
      
      <GlassCard className="relative z-20 mt-8 max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="font-heading text-2xl font-bold gradient-text mb-2">
            Item Details
          </h2>
          <p className="text-muted-foreground">
            Provide information about your lost item
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
              <Package className="w-4 h-4 text-primary" />
              Item Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Black leather wallet"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="input-glass"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2 text-foreground">
              <Tag className="w-4 h-4 text-primary" />
              Category
            </Label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger className="input-glass">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {categories.map((cat) => (
                  <SelectItem 
                    key={cat.value} 
                    value={cat.value}
                    className="hover:bg-primary/20 focus:bg-primary/20"
                  >
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4 text-primary" />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe your item in detail - color, brand, any distinguishing marks..."
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              className="input-glass min-h-[120px] resize-none"
            />
          </div>
        </motion.div>

        <div className="flex justify-between mt-6">
          <Button variant="neon-outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button 
            variant="neon" 
            size="lg"
            onClick={onNext}
            disabled={!isValid}
          >
            Add Verification
          </Button>
        </div>
      </GlassCard>
    </div>
  );
};

export default DetailsStep;
