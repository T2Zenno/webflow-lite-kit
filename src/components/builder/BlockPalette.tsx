import React from 'react';
import { 
  Navigation, 
  Crown, 
  Star, 
  Package, 
  Grid3x3, 
  Images, 
  MessageSquare, 
  DollarSign, 
  Mail, 
  Copyright 
} from 'lucide-react';

interface BlockItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
}

const blocks: BlockItem[] = [
  { id: 'navbar', name: 'Navbar', icon: Navigation, category: 'Layout' },
  { id: 'hero', name: 'Hero', icon: Crown, category: 'Layout' },
  { id: 'features', name: 'Fitur', icon: Star, category: 'Content' },
  { id: 'product', name: 'Produk', icon: Package, category: 'E-commerce' },
  { id: 'product-grid', name: 'Grid Produk', icon: Grid3x3, category: 'E-commerce' },
  { id: 'gallery', name: 'Galeri', icon: Images, category: 'Media' },
  { id: 'testimonial', name: 'Testimoni', icon: MessageSquare, category: 'Content' },
  { id: 'pricing', name: 'Pricing', icon: DollarSign, category: 'E-commerce' },
  { id: 'contact', name: 'Kontak', icon: Mail, category: 'Content' },
  { id: 'footer', name: 'Footer', icon: Copyright, category: 'Layout' },
];

const categories = ['Layout', 'Content', 'E-commerce', 'Media'];

export const BlockPalette: React.FC = () => {
  const handleDragStart = (e: React.DragEvent, blockId: string) => {
    e.dataTransfer.setData('text/block-type', blockId);
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div key={category}>
          <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
            {category}
          </h4>
          <div className="space-y-2">
            {blocks
              .filter((block) => block.category === category)
              .map((block) => {
                const Icon = block.icon;
                return (
                  <div
                    key={block.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, block.id)}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent cursor-grab active:cursor-grabbing transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{block.name}</span>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
};