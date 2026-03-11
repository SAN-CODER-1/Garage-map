export interface LostItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  category: string;
  dateReported: string;
  verification: VerificationData;
  status: 'lost' | 'claimed' | 'returned';
}

export interface VerificationData {
  color: string;
  specialMark: string;
  lostLocation: string;
  contents: string;
  approximateDateTime: string;
}

export interface OwnerFormData {
  image: File | null;
  imagePreview: string;
  name: string;
  description: string;
  category: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  } | null;
  verification: VerificationData;
}
