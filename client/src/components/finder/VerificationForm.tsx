import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle2, XCircle, ArrowLeft, Palette, Star, MapPin, Package, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GlassCard from '@/components/shared/GlassCard';
import { LostItem, VerificationData } from '@/types/lostItem';
import { updateItemStatus } from '@/lib/storage';

interface VerificationFormProps {
  item: LostItem;
  onBack: () => void;
  onSuccess: () => void;
}

const verificationFields = [
  { key: 'color', label: 'What is the exact color?', icon: Palette },
  { key: 'specialMark', label: 'Any special marks or features?', icon: Star },
  { key: 'lostLocation', label: 'Where exactly was it lost?', icon: MapPin },
  { key: 'contents', label: 'What was inside (if applicable)?', icon: Package },
  { key: 'approximateDateTime', label: 'When did you lose it?', icon: Calendar },
];

const VerificationForm = ({ item, onBack, onSuccess }: VerificationFormProps) => {
  const [answers, setAnswers] = useState<VerificationData>({
    color: '',
    specialMark: '',
    lostLocation: '',
    contents: '',
    approximateDateTime: '',
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<'success' | 'failed' | null>(null);

  const handleFieldChange = (key: keyof VerificationData, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const normalizeString = (str: string): string => {
    return str.toLowerCase().trim().replace(/\s+/g, ' ');
  };

  const verifyAnswers = () => {
    setIsVerifying(true);
    
    // Simulate verification delay
    setTimeout(() => {
      const correctAnswers = item.verification;
      let matchCount = 0;
      const totalQuestions = 5;

      Object.keys(answers).forEach((key) => {
        const answerKey = key as keyof VerificationData;
        const normalizedAnswer = normalizeString(answers[answerKey]);
        const normalizedCorrect = normalizeString(correctAnswers[answerKey]);
        
        // Check if answer contains key parts of correct answer (flexible matching)
        if (normalizedAnswer && normalizedCorrect) {
          const correctParts = normalizedCorrect.split(' ').filter(p => p.length > 2);
          const matchingParts = correctParts.filter(part => normalizedAnswer.includes(part));
          
          if (matchingParts.length >= Math.ceil(correctParts.length * 0.5)) {
            matchCount++;
          }
        }
      });

      setIsVerifying(false);
      
      // Require at least 4 out of 5 correct answers
      if (matchCount >= 4) {
        setResult('success');
        updateItemStatus(item.id, 'claimed');
      } else {
        setResult('failed');
      }
    }, 2000);
  };

  const allFieldsFilled = Object.values(answers).every(v => v.trim());

  if (result === 'success') {
    return (
      <GlassCard neonBorder>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </motion.div>
          
          <h2 className="font-heading text-3xl font-bold text-green-400 mb-4">
            Ownership Verified!
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Congratulations! Your answers matched the owner's verification data. 
            Here are the full details:
          </p>
          
          <div className="text-left space-y-4 p-6 rounded-xl bg-muted/30 border border-green-500/30 mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Full Description</p>
              <p className="font-medium">{item.description}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Exact Location</p>
              <p className="font-medium">
                Coordinates: {item.location.lat.toFixed(4)}, {item.location.lng.toFixed(4)}
              </p>
            </div>
          </div>
          
          <Button 
            variant="neon" 
            size="lg"
            onClick={onSuccess}
          >
            Back to Search
          </Button>
        </motion.div>
      </GlassCard>
    );
  }

  if (result === 'failed') {
    return (
      <GlassCard>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/20 mb-6"
          >
            <XCircle className="w-10 h-10 text-destructive" />
          </motion.div>
          
          <h2 className="font-heading text-3xl font-bold text-destructive mb-4">
            Verification Failed
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Your answers didn't match the owner's verification data. 
            If this is truly your item, please try again with more accurate details.
          </p>
          
          <div className="flex justify-center gap-4">
            <Button 
              variant="neon-outline" 
              size="lg"
              onClick={onBack}
            >
              Go Back
            </Button>
            <Button 
              variant="neon" 
              size="lg"
              onClick={() => {
                setResult(null);
                setAnswers({
                  color: '',
                  specialMark: '',
                  lostLocation: '',
                  contents: '',
                  approximateDateTime: '',
                });
              }}
            >
              Try Again
            </Button>
          </div>
        </motion.div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to item
      </button>

      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-4">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <h2 className="font-heading text-2xl font-bold gradient-text mb-2">
          Verify Ownership
        </h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Answer these security questions to prove this item belongs to you. 
          The owner set these questions when reporting the item.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isVerifying ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {verificationFields.map(({ key, label, icon: Icon }, index) => (
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
                  placeholder="Enter your answer..."
                  value={answers[key as keyof VerificationData]}
                  onChange={(e) => handleFieldChange(key as keyof VerificationData, e.target.value)}
                  className="input-glass"
                />
              </motion.div>
            ))}

            <div className="pt-4">
              <Button 
                variant="neon" 
                size="lg"
                className="w-full"
                onClick={verifyAnswers}
                disabled={!allFieldsFilled}
              >
                Verify Ownership
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4 animate-pulse">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <p className="text-muted-foreground">Verifying your answers...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
};

export default VerificationForm;
