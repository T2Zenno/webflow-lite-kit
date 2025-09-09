import React from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { 
  BarChart3, 
  Users2, 
  Database, 
  MessageSquare, 
  ShoppingCart,
  Zap,
  Star,
  Download
} from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  installed: boolean;
  category: string;
  rating: number;
  downloads: string;
}

const availableApps: App[] = [
  {
    id: 'analytics',
    name: 'Rekap Jualan',
    description: 'Analisis mendalam performa penjualan dengan grafik dan laporan',
    icon: BarChart3,
    installed: true,
    category: 'Analytics',
    rating: 4.8,
    downloads: '1.2k'
  },
  {
    id: 'crm',
    name: 'Simple CRM',
    description: 'Kelola leads dan pipeline penjualan dengan kanban board',
    icon: Users2,
    installed: true,
    category: 'Sales',
    rating: 4.6,
    downloads: '850'
  },
  {
    id: 'database',
    name: 'Database Pelanggan',
    description: 'Manajemen database pelanggan dengan segmentasi otomatis',
    icon: Database,
    installed: true,
    category: 'Database',
    rating: 4.7,
    downloads: '950'
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Checkout',
    description: 'Integrasi checkout langsung ke WhatsApp dengan template pesan',
    icon: MessageSquare,
    installed: false,
    category: 'E-commerce',
    rating: 4.9,
    downloads: '2.1k'
  },
  {
    id: 'qris',
    name: 'QRIS Payment',
    description: 'Pembayaran digital dengan QR Code Indonesia',
    icon: ShoppingCart,
    installed: false,
    category: 'Payment',
    rating: 4.5,
    downloads: '1.8k'
  },
  {
    id: 'automation',
    name: 'Marketing Automation',
    description: 'Otomatisasi email marketing dan follow-up pelanggan',
    icon: Zap,
    installed: false,
    category: 'Marketing',
    rating: 4.4,
    downloads: '650'
  }
];

export const AppsView: React.FC = () => {
  const [apps, setApps] = React.useState(availableApps);

  const toggleApp = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, installed: !app.installed } : app
    ));
  };

  const installedApps = apps.filter(app => app.installed);
  const availableForInstall = apps.filter(app => !app.installed);

  return (
    <div className="p-6 h-full overflow-auto custom-scrollbar">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Apps</h1>
          <p className="text-muted-foreground">Ekstensi dan integrasi untuk meningkatkan fungsionalitas</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Apps Terpasang</p>
                  <p className="text-2xl font-bold">{installedApps.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Download className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tersedia</p>
                  <p className="text-2xl font-bold">{availableForInstall.length}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Apps</p>
                  <p className="text-2xl font-bold">{apps.length}</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Star className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Installed Apps */}
        <Card>
          <CardHeader>
            <CardTitle>Apps Terpasang</CardTitle>
          </CardHeader>
          <CardContent>
            {installedApps.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Belum ada apps yang terpasang</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {installedApps.map((app) => {
                  const Icon = app.icon;
                  return (
                    <Card key={app.id} className="surface-hover">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-medium truncate">{app.name}</h3>
                              <Switch
                                checked={app.installed}
                                onCheckedChange={() => toggleApp(app.id)}
                              />
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {app.description}
                            </p>
                            
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {app.category}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-warning text-warning" />
                                <span className="text-xs">{app.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available Apps */}
        <Card>
          <CardHeader>
            <CardTitle>Apps Tersedia</CardTitle>
          </CardHeader>
          <CardContent>
            {availableForInstall.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Semua apps sudah terpasang</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableForInstall.map((app) => {
                  const Icon = app.icon;
                  return (
                    <Card key={app.id} className="surface-hover">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center">
                            <Icon className="h-6 w-6 text-muted-foreground" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium mb-1">{app.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {app.description}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {app.category}
                                </Badge>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-warning text-warning" />
                                  <span className="text-xs">{app.rating}</span>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {app.downloads}
                                </span>
                              </div>
                              
                              <Button 
                                size="sm"
                                onClick={() => toggleApp(app.id)}
                              >
                                Install
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};