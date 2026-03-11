import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StepIndicator from '@/components/shared/StepIndicator';
import UploadStep from '@/components/owner/UploadStep';
import MapStep from '@/components/owner/MapStep';
import DetailsStep from '@/components/owner/DetailsStep';
import VerificationStep from '@/components/owner/VerificationStep';
import PreviewStep from '@/components/owner/PreviewStep';
import GlassCard from '@/components/shared/GlassCard';
import { OwnerFormData, LostItem, VerificationData } from '@/types/lostItem';
import { saveItem, generateId } from '@/lib/storage';

const steps = [
  { label: 'Upload' },
  { label: 'Location' },
  { label: 'Details' },
  { label: 'Verify' },
  { label: 'Preview' },
];

const initialVerification: VerificationData = {
  color: '',
  specialMark: '',
  lostLocation: '',
  contents: '',
  approximateDateTime: '',
};

const OwnerPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<OwnerFormData>({
    image: null,
    imagePreview: '',
    name: '',
    description: '',
    category: '',
    location: null,
    verification: initialVerification,
  });

  const handleImageSelect = (file: File, preview: string) => {
    setFormData(prev => ({ ...prev, image: file, imagePreview: preview }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({ ...prev, location: { lat, lng } }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const item: LostItem = {
      id: generateId(),
      name: formData.name,
      description: formData.description,
      imageUrl: formData.imagePreview,
      location: formData.location!,
      category: formData.category,
      dateReported: new Date().toISOString(),
      verification: formData.verification,
      status: 'lost',
    };
    
    saveItem(item);
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  if (isSuccess) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
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
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h2 className="font-heading text-3xl font-bold gradient-text mb-4">
              Report Submitted!
            </h2>
            <p className="text-muted-foreground mb-8">
              Your lost item has been registered. We'll help you find it!
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="neon-outline" 
                size="lg"
                onClick={() => navigate('/finder')}
              >
                View All Items
              </Button>
              <Button 
                variant="neon" 
                size="lg"
                onClick={() => {
                  setIsSuccess(false);
                  setCurrentStep(0);
                  setFormData({
                    image: null,
                    imagePreview: '',
                    name: '',
                    description: '',
                    category: '',
                    location: null,
                    verification: initialVerification,
                  });
                }}
              >
                Report Another
              </Button>
            </div>
          </motion.div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="font-heading text-4xl font-bold gradient-text mb-2">
          Report Lost Item
        </h1>
        <p className="text-muted-foreground">
          Help us help you find what you've lost
        </p>
      </motion.div>

      <StepIndicator steps={steps} currentStep={currentStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 0 && (
            <UploadStep
              imagePreview={formData.imagePreview}
              onImageSelect={handleImageSelect}
              onNext={nextStep}
            />
          )}
          {currentStep === 1 && (
            <MapStep
              location={formData.location}
              onLocationSelect={handleLocationSelect}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 2 && (
            <DetailsStep
              name={formData.name}
              description={formData.description}
              category={formData.category}
              onNameChange={(v) => setFormData(prev => ({ ...prev, name: v }))}
              onDescriptionChange={(v) => setFormData(prev => ({ ...prev, description: v }))}
              onCategoryChange={(v) => setFormData(prev => ({ ...prev, category: v }))}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 3 && (
            <VerificationStep
              verification={formData.verification}
              onVerificationChange={(v) => setFormData(prev => ({ ...prev, verification: v }))}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
          {currentStep === 4 && (
            <PreviewStep
              formData={formData}
              onSubmit={handleSubmit}
              onBack={prevStep}
              isSubmitting={isSubmitting}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OwnerPage;
