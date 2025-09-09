import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Layout, 
  Package, 
  ShoppingCart, 
  Users, 
  ImageIcon, 
  Users2, 
  BarChart3, 
  Puzzle, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { ViewType } from '../../hooks/usePageBuilder';
import { cn } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

interface NavigationItem {
  id: ViewType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  color?: string;
}

const navigationItems: NavigationItem[] = [
  { id: 'builder', label: 'Builder', icon: Layout },
  { id: 'products', label: 'Produk', icon: Package },
  { id: 'orders', label: 'Pesanan', icon: ShoppingCart, badge: 3 },
  { id: 'customers', label: 'Pelanggan', icon: Users },
  { id: 'library', label: 'Library', icon: ImageIcon },
  { id: 'crm', label: 'CRM', icon: Users2, badge: 2 },
  { id: 'analytics', label: 'Rekap', icon: BarChart3 },
  { id: 'apps', label: 'Apps', icon: Puzzle },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, currentView, setCurrentView }) => {
  return (
    <div className={cn(
      "sidebar-bg border-r border-sidebar-border transition-all duration-300",
      isOpen ? "w-64" : "w-0 md:w-16"
    )}>
      <div className={cn(
        "h-full flex flex-col overflow-hidden",
        !isOpen && "md:items-center"
      )}>
        {/* Brand Section */}
        <div className="p-4 border-b border-sidebar-border">
          {isOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold">
                PB
              </div>
              <div>
                <div className="font-semibold text-sidebar-foreground">Page Builder</div>
                <div className="text-xs text-muted-foreground">Workspace: default</div>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold mx-auto">
              PB
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 custom-scrollbar overflow-y-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start transition-all duration-200",
                  isActive && "bg-gradient-primary text-white shadow-lg",
                  !isActive && "text-sidebar-foreground hover:bg-sidebar-accent",
                  !isOpen && "md:justify-center md:px-2"
                )}
                onClick={() => setCurrentView(item.id)}
              >
                <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                {isOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                    {isActive && <ChevronRight className="h-4 w-4 ml-2" />}
                  </>
                )}
              </Button>
            );
          })}
        </nav>

        {/* Tips Section */}
        {isOpen && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="bg-card/50 rounded-lg p-3">
              <div className="text-sm font-medium text-foreground mb-1">💡 Tips</div>
              <div className="text-xs text-muted-foreground">
                Drag & drop blok ke canvas untuk membangun halaman. Klik blok untuk mengedit.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};