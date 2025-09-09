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
  const { pages, currentPageId, switchPage, addPage, settings, state, download } = usePageBuilder();

  const handleAddPage = () => {
    const name = prompt('Nama halaman baru:');
    if (name) {
      addPage(name);
    }
  };

  const buildStandaloneHTML = (title: string) => {
    const brand = settings.brandName || 'Brand Anda';
    const currentPage = pages.find(p => p.id === currentPageId);
    const inner = currentPage?.html || '';
    const faviconHref = state.media.find(m => m.id === settings.favicon)?.dataUrl || '';
    const theme = settings.theme || 'dark';
    const lang = settings.lang || 'id';
    const wa = settings.waNumber || '';
    const waTpl = settings.waTemplate || '';
    const bank = settings.bankInfo || '';
    const qrisImg = state.media.find(m => m.id === settings.qrisImg)?.dataUrl || '';
    const qrisId = settings.qrisId || '';

    return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>${title || brand}</title>${faviconHref ? `<link rel="icon" href="${faviconHref}">` : ''}<style>body{margin:0;font-family:Inter,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:${theme === 'light' ? '#f5f7ff' : '#0b1126'};color:${theme === 'light' ? '#0f1220' : '#e8ecff'}} .blk{border-radius:16px;border:1px solid ${theme === 'light' ? '#d8def7' : '#243056'};background:${theme === 'light' ? '#ffffff' : '#12173a'};padding:24px;max-width:980px;margin:14px auto} .btn{display:inline-block;padding:10px 14px;border-radius:12px;background:${theme === 'light' ? '#eef2ff' : '#1e2442'};border:1px solid ${theme === 'light' ? '#d8def7' : '#2a315a'};color:inherit;text-decoration:none} .btn.acc{background:${theme === 'light' ? '#6366f1' : '#6366f1'};border-color:#6d6de5;color:white} input{padding:10px;border-radius:10px;border:1px solid ${theme === 'light' ? '#d8def7' : '#2a315a'};background:${theme === 'light' ? '#fff' : '#0f1329'};color:inherit} .muted{opacity:.8}</style></head><body>${inner}</body></html>`;
  };

  const handlePreview = () => {
    const html = buildStandaloneHTML(settings.brandName || 'Landing');
    const w = window.open();
    if (w) {
      w.document.write(html);
      w.document.close();
    }
  };

  const handleExport = () => {
    const html = buildStandaloneHTML(settings.brandName || 'Landing');
    download('halaman.html', html);
  };

  const handlePublish = () => {
    const html = buildStandaloneHTML(settings.brandName || 'Landing');
    download('halaman.html', html);
  };

  return (
    <div className="h-16 bg-card border-b border-border flex items-center justify-between px-4">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen(!sidebarOpen)}
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