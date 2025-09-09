import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { 
  Save, 
  Upload, 
  Download, 
  RefreshCw, 
  Globe, 
  Smartphone, 
  CreditCard,
  Database,
  Trash2
} from 'lucide-react';
import { usePageBuilder } from '../../hooks/usePageBuilder';

export const SettingsView: React.FC = () => {
  const { settings, setSettings, media } = usePageBuilder();

  const handleSave = () => {
    // Save settings logic
    alert('Settings saved!');
  };

  const handleExportData = () => {
    // Export data as JSON
    const data = {
      settings,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pagebuilder-settings-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (data.settings) {
            setSettings(data.settings);
            alert('Settings imported successfully!');
          }
        } catch (error) {
          alert('Invalid file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (confirm('Reset all settings? This action cannot be undone.')) {
      setSettings({
        brandName: 'Page Builder',
        domain: '',
        workspace: 'default',
        waNumber: '',
        waTemplate: 'Halo, saya ingin beli {{product}} ({{qty}}x) total {{total}}.',
        bankInfo: '',
        qrisId: '',
        qrisImg: '',
        logo: '',
        favicon: ''
      });
    }
  };

  return (
    <div className="p-6 h-full overflow-auto custom-scrollbar">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Konfigurasi aplikasi dan integrasi</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <label htmlFor="import-settings">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </span>
              </Button>
            </label>
            <input
              id="import-settings"
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImportData}
            />
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  value={settings.brandName}
                  onChange={(e) => setSettings(prev => ({ ...prev, brandName: e.target.value }))}
                  placeholder="Your Brand Name"
                />
              </div>
              
              <div>
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  value={settings.domain}
                  onChange={(e) => setSettings(prev => ({ ...prev, domain: e.target.value }))}
                  placeholder="yourdomain.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="workspace">Workspace ID</Label>
              <Input
                id="workspace"
                value={settings.workspace}
                onChange={(e) => setSettings(prev => ({ ...prev, workspace: e.target.value }))}
                placeholder="default"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Unique identifier for this workspace
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="logo">Logo</Label>
                <Select 
                  value={settings.logo} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, logo: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select logo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">(No logo)</SelectItem>
                    {media.map((file) => (
                      <SelectItem key={file.id} value={file.id}>
                        {file.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="favicon">Favicon</Label>
                <Select 
                  value={settings.favicon} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, favicon: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select favicon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">(No favicon)</SelectItem>
                    {media.map((file) => (
                      <SelectItem key={file.id} value={file.id}>
                        {file.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              WhatsApp Integration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="waNumber">WhatsApp Number</Label>
              <Input
                id="waNumber"
                value={settings.waNumber}
                onChange={(e) => setSettings(prev => ({ ...prev, waNumber: e.target.value }))}
                placeholder="628123456789"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Include country code, e.g., 628123456789
              </p>
            </div>
            
            <div>
              <Label htmlFor="waTemplate">Message Template</Label>
              <Textarea
                id="waTemplate"
                value={settings.waTemplate}
                onChange={(e) => setSettings(prev => ({ ...prev, waTemplate: e.target.value }))}
                placeholder="Halo, saya ingin beli {{product}} ({{qty}}x) total {{total}}."
                rows={3}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Use variables: <Badge variant="outline">{'{{product}}'}</Badge>{' '}
                <Badge variant="outline">{'{{qty}}'}</Badge>{' '}
                <Badge variant="outline">{'{{total}}'}</Badge>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="bankInfo">Bank Transfer Info</Label>
              <Textarea
                id="bankInfo"
                value={settings.bankInfo}
                onChange={(e) => setSettings(prev => ({ ...prev, bankInfo: e.target.value }))}
                placeholder="Bank BCA&#10;No. Rek: 1234567890&#10;a/n: Your Name"
                rows={3}
              />
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="qrisId">QRIS Merchant ID</Label>
                <Input
                  id="qrisId"
                  value={settings.qrisId}
                  onChange={(e) => setSettings(prev => ({ ...prev, qrisId: e.target.value }))}
                  placeholder="ID200001234567890"
                />
              </div>
              
              <div>
                <Label htmlFor="qrisImg">QRIS QR Code Image</Label>
                <Select 
                  value={settings.qrisImg} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, qrisImg: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select QR image" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">(No QR image)</SelectItem>
                    {media.filter(file => file.type.startsWith('image/')).map((file) => (
                      <SelectItem key={file.id} value={file.id}>
                        {file.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="h-4 w-4 mr-2" />
                Export All Data
              </Button>
              
              <label htmlFor="import-all-data">
                <Button variant="outline" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </span>
                </Button>
              </label>
              <input
                id="import-all-data"
                type="file"
                accept=".json"
                className="hidden"
                onChange={handleImportData}
              />
              
              <Button variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Seed Demo Data
              </Button>
              
              <Button variant="destructive" onClick={handleReset}>
                <Trash2 className="h-4 w-4 mr-2" />
                Reset Workspace
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>• Export: Download all data as JSON backup</p>
              <p>• Import: Restore data from JSON backup</p>
              <p>• Seed: Add sample data for testing</p>
              <p>• Reset: Clear all data and settings</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};