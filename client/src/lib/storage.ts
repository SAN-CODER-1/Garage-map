import { LostItem } from '@/types/lostItem';

const STORAGE_KEY = 'lost-and-found-items';

export const getStoredItems = (): LostItem[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveItem = (item: LostItem): void => {
  const items = getStoredItems();
  items.push(item);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const updateItemStatus = (id: string, status: LostItem['status']): void => {
  const items = getStoredItems();
  const updated = items.map(item => 
    item.id === id ? { ...item, status } : item
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const getItemById = (id: string): LostItem | undefined => {
  const items = getStoredItems();
  return items.find(item => item.id === id);
};

export const searchItems = (query: string): LostItem[] => {
  const items = getStoredItems();
  const lowerQuery = query.toLowerCase();
  return items.filter(item => 
    item.status === 'lost' && (
      item.name.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery)
    )
  );
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
