import { motion } from 'framer-motion';
import { MapPin, Tag, FileText, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/shared/GlassCard';
import { OwnerFormData } from '@/types/lostItem';

interface PreviewStepProps {
  formData: OwnerFormData;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const PreviewStep = ({ formData, onSubmit, onBack, isSubmitting }: PreviewStepProps) => {
  return (
    <GlassCard>
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold gradient-text mb-2">
          Review & Submit
        </h2>
        <p className="text-muted-foreground">
          Verify all information before submitting
        </p>
      </div>

      <div className="space-y-6">
        {/* Image Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <img 
            src={formData.imagePreview} 
            alt={formData.name} 
            className="w-full h-48 object-cover rounded-xl border border-primary/30"
          />
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm border border-primary/30">
            <span className="text-xs font-medium text-primary capitalize">
              {formData.category}
            </span>
          </div>
        </motion.div>

        {/* Item Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-start gap-3">
            <Tag className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Item Name</p>
              <p className="font-medium">{formData.name}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{formData.description}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">
                {formData.location?.lat.toFixed(4)}, {formData.location?.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Verification Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl bg-primary/5 border border-primary/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-medium">Verification Questions Set</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {Object.entries(formData.verification).map(([key, value]) => (
              <div key={key} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-foreground truncate">— {value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="neon-outline" size="lg" onClick={onBack}>
          Back
        </Button>
        <Button 
          variant="neon" 
          size="lg"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Report'}
        </Button>
      </div>
    </GlassCard>
  );
};

export default PreviewStep;
