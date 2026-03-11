import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/shared/GlassCard';

interface UploadStepProps {
  imagePreview: string;
  onImageSelect: (file: File, preview: string) => void;
  onNext: () => void;
}

const UploadStep = ({ imagePreview, onImageSelect, onNext }: UploadStepProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageSelect(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    onImageSelect(null as unknown as File, '');
  };

  return (
    <GlassCard>
      <div className="text-center mb-6">
        <h2 className="font-heading text-2xl font-bold gradient-text mb-2">
          Upload Item Photo
        </h2>
        <p className="text-muted-foreground">
          Add a clear photo of your lost item to help others identify it
        </p>
      </div>

      {imagePreview ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-full h-64 object-cover rounded-xl border border-primary/30"
          />
          <button
            onClick={clearImage}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border hover:bg-destructive/20 hover:border-destructive/50 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ) : (
        <motion.div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            isDragging 
              ? 'border-primary bg-primary/10' 
              : 'border-border hover:border-primary/50 hover:bg-muted/30'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <motion.div
            animate={{ y: isDragging ? -5 : 0 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              {isDragging ? (
                <ImageIcon className="w-8 h-8 text-primary" />
              ) : (
                <Upload className="w-8 h-8 text-primary" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">
                {isDragging ? 'Drop your image here' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG or GIF up to 10MB
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="flex justify-end mt-6">
        <Button 
          variant="neon" 
          size="lg"
          onClick={onNext}
          disabled={!imagePreview}
        >
          Continue to Map
        </Button>
      </div>
    </GlassCard>
  );
};

export default UploadStep;
