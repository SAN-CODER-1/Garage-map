import { motion } from 'framer-motion';
import { Shield, Palette, Star, MapPin, Package, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/shared/GlassCard';
import { VerificationData } from '@/types/lostItem';

interface VerificationStepProps {
  verification: VerificationData;
  onVerificationChange: (data: VerificationData) => void;
  onNext: () => void;
  onBack: () => void;
}

const verificationFields = [
  { key: 'color', label: 'Exact Color', icon: Palette, placeholder: 'e.g., Navy blue with silver trim' },
  { key: 'specialMark', label: 'Any Special Marks', icon: Star, placeholder: 'e.g., Scratch on the corner, initials engraved' },
  { key: 'lostLocation', label: 'Specific Lost Location', icon: MapPin, placeholder: 'e.g., Near the coffee shop on Main St' },
  { key: 'contents', label: 'Contents (if applicable)', icon: Package, placeholder: 'e.g., Credit cards, ID, $50 cash' },
  { key: 'approximateDateTime', label: 'Approximate Date & Time', icon: Calendar, placeholder: 'e.g., January 15, around 3 PM' },
];

const VerificationStep = ({ 
  verification, 
  onVerificationChange, 
  onNext, 
  onBack 
}: VerificationStepProps) => {
  const handleFieldChange = (key: keyof VerificationData, value: string) => {
    onVerificationChange({ ...verification, [key]: value });
  };

  const isValid = Object.values(verification).every(v => v.trim());

  return (
    <GlassCard>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold gradient-text mb-2">
          Security Verification
        </h2>
        <p className="text-muted-foreground text-sm">
          These questions will be used to verify ownership when someone claims your item
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {verificationFields.map(({ key, label, icon: Icon, placeholder }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <Label htmlFor={key} className="flex items-center gap-2 text-foreground">
              <Icon className="w-4 h-4 text-primary" />
              {label}
            </Label>
            <Input
              id={key}
              placeholder={placeholder}
              value={verification[key as keyof VerificationData]}
              onChange={(e) => handleFieldChange(key as keyof VerificationData, e.target.value)}
              className="input-glass"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
        <p className="text-xs text-muted-foreground flex items-start gap-2">
          <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          These answers are kept private. Only you can see them. Finders must correctly answer these to verify ownership.
        </p>
      </div>

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
          Preview & Submit
        </Button>
      </div>
    </GlassCard>
  );
};

export default VerificationStep;
