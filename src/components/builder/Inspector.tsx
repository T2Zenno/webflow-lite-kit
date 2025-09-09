import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Trash2, Copy, MoveUp, MoveDown, Link } from 'lucide-react';
import { usePageBuilder } from '../../hooks/usePageBuilder';

export const Inspector: React.FC = () => {
  const { selectedElement, products, media } = usePageBuilder();

  if (!selectedElement) {
    return (
      <div className="w-80 inspector-bg border-l border-inspector-border p-4">
        <div className="text-center text-muted-foreground py-8">
          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-2 border-dashed border-muted-foreground rounded"></div>
          </div>
          <p>Pilih elemen untuk mengedit</p>
          <p className="text-sm mt-1">Klik blok di canvas untuk melihat properti</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 inspector-bg border-l border-inspector-border p-4 overflow-y-auto custom-scrollbar">
      <div className="space-y-6">
        {/* Element Info */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded"></div>
              Element Terpilih
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Tipe</Label>
              <div className="text-sm font-medium capitalize">
                {selectedElement.dataset.type || 'block'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Teks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label htmlFor="elementText" className="text-xs">Konten</Label>
              <Input
                id="elementText"
                placeholder="Masukkan teks..."
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="textAlign" className="text-xs">Perataan</Label>
              <Select>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Pilih perataan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Kiri</SelectItem>
                  <SelectItem value="center">Tengah</SelectItem>
                  <SelectItem value="right">Kanan</SelectItem>
                  <SelectItem value="justify">Rata Kanan-Kiri</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Style Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Gaya</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="textColor" className="text-xs">Warna Teks</Label>
                <Input
                  id="textColor"
                  type="color"
                  className="mt-1 h-10"
                />
              </div>
              
              <div>
                <Label htmlFor="bgColor" className="text-xs">Warna Latar</Label>
                <Input
                  id="bgColor"
                  type="color"
                  className="mt-1 h-10"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="padding" className="text-xs">Padding</Label>
                <Input
                  id="padding"
                  type="number"
                  placeholder="24"
                  min="0"
                  max="100"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="borderRadius" className="text-xs">Border Radius</Label>
                <Input
                  id="borderRadius"
                  type="number"
                  placeholder="16"
                  min="0"
                  max="50"
                  className="mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Link Properties */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Link className="h-4 w-4" />
              Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="elementHref" className="text-xs">URL</Label>
              <Input
                id="elementHref"
                placeholder="https://example.com"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Product Binding */}
        {products.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Bind Produk</CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih produk..." />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Media Selection */}
        {media.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Gambar</CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih gambar..." />
                </SelectTrigger>
                <SelectContent>
                  {media.map((file) => (
                    <SelectItem key={file.id} value={file.id}>
                      {file.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Aksi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <MoveUp className="h-4 w-4 mr-1" />
                Naik
              </Button>
              <Button variant="outline" size="sm">
                <MoveDown className="h-4 w-4 mr-1" />
                Turun
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="w-full">
              <Copy className="h-4 w-4 mr-1" />
              Duplikat
            </Button>
            
            <Button variant="destructive" size="sm" className="w-full">
              <Trash2 className="h-4 w-4 mr-1" />
              Hapus
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};