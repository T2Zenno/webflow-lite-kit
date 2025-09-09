import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Plus, Grip } from 'lucide-react';
import { BlockPalette } from './BlockPalette';

export const BuilderCanvas: React.FC = () => {
  const [showDropZone, setShowDropZone] = useState(true);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const blockType = e.dataTransfer.getData('text/block-type');
    if (blockType) {
      console.log('Dropped block:', blockType);
      setShowDropZone(false);
      // Here you would add the actual block creation logic
    }
  };

  return (
    <div className="flex h-full">
      {/* Block Palette */}
      <div className="w-64 bg-card border-r border-border p-4">
        <h3 className="font-semibold mb-4">Blok & Komponen</h3>
        <BlockPalette />
      </div>

      {/* Canvas Area */}
      <div className="flex-1 p-6 overflow-auto custom-scrollbar">
        <div className="max-w-4xl mx-auto">
          {/* Canvas Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Canvas</h2>
              <p className="text-muted-foreground">Drag blok dari sidebar untuk membangun halaman</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Grip className="h-4 w-4 mr-1" />
                Template
              </Button>
              <Button variant="outline" size="sm">
                Bersihkan
              </Button>
            </div>
          </div>

          {/* Canvas Content */}
          <div 
            className="min-h-[600px] bg-builder-canvas rounded-lg border-2 border-dashed border-border p-6"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {showDropZone ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Mulai Membangun</h3>
                  <p className="text-muted-foreground mb-4">
                    Drag & drop blok dari panel kiri untuk memulai
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Navbar</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Hero</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Produk</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Footer</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Sample blocks would be rendered here */}
                <Card className="p-6 builder-block">
                  <h3 className="text-xl font-semibold mb-2">Hero Section</h3>
                  <p className="text-muted-foreground">
                    Ini adalah contoh blok hero. Klik untuk mengedit.
                  </p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};