import React from 'react';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Menu, Plus, Copy, Eye, Download, Rocket, MoreHorizontal } from 'lucide-react';
import { usePageBuilder } from '../../hooks/usePageBuilder';

interface TopbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { pages, currentPageId, switchPage, addPage, settings } = usePageBuilder();

  const handleAddPage = () => {
    const name = prompt('Nama halaman baru:');
    if (name) {
      addPage(name);
    }
  };

  const handlePreview = () => {
    // Open preview in new window
    window.open('about:blank', '_blank');
  };

  const handleExport = () => {
    // Export HTML functionality
    console.log('Export HTML');
  };

  const handlePublish = () => {
    // Publish functionality
    console.log('Publish');
  };

  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden"
        >
          <Menu className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-3">
          <Select value={currentPageId} onValueChange={switchPage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Pilih halaman" />
            </SelectTrigger>
            <SelectContent>
              {pages.map((page) => (
                <SelectItem key={page.id} value={page.id}>
                  {page.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="ghost" size="sm" onClick={handleAddPage}>
            <Plus className="h-4 w-4 mr-1" />
            Halaman
          </Button>
        </div>
      </div>

      {/* Center section - Brand */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
          {(settings.brandName || 'PB').slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="font-semibold text-sm">{settings.brandName || 'Page Builder'}</div>
          <div className="text-xs text-muted-foreground">{settings.workspace}</div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={handlePreview}>
          <Eye className="h-4 w-4 mr-1" />
          Preview
        </Button>
        
        <Button variant="ghost" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
        
        <Button size="sm" onClick={handlePublish} className="bg-gradient-primary hover:bg-primary-hover">
          <Rocket className="h-4 w-4 mr-1" />
          Publish
        </Button>

        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};