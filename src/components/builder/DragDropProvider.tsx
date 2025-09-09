import React, { createContext, useContext, ReactNode } from 'react';
import { usePageBuilder, svgPlaceholder } from '../../hooks/usePageBuilder';

interface DragDropContextType {
  templates: Record<string, () => string>;
  handleDrop: (key: string) => void;
}

const DragDropContext = createContext<DragDropContextType | null>(null);

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error('useDragDrop must be used within DragDropProvider');
  }
  return context;
};

interface DragDropProviderProps {
  children: ReactNode;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({ children }) => {
  const { updateState, currentPageId, pages } = usePageBuilder();

  const templates: Record<string, () => string> = {
    nav: () => `<nav class="blk" data-type="nav" style="padding:14px"><div style="display:flex;justify-content:space-between;align-items:center;gap:10px"><strong contenteditable>Brand Anda</strong><div style="display:flex;gap:8px"><a class="btn" data-role="button" href="#" contenteditable="false">Beranda</a><a class="btn" data-role="button" href="#" contenteditable="false">Produk</a><a class="btn acc" data-role="button" href="#" contenteditable="false">Beli</a></div></div></nav>`,
    hero: () => `<section class="blk" data-type="hero"><div style="display:grid;grid-template-columns:1.2fr 1fr;gap:14px;align-items:center"><div><h1 contenteditable>Judul Utama Yang Menjual</h1><p class="muted" contenteditable>Sampaikan nilai jual singkat di sini. Bisa diedit langsung.</p><div style="display:flex;gap:8px"><a class="btn acc" data-role="button" href="#" contenteditable="false">Coba Gratis</a><a class="btn" data-role="button" href="#" contenteditable="false">Pelajari</a></div></div><img data-role="img" alt="hero" style="width:100%;height:220px;border-radius:12px;border:1px solid var(--border);object-fit:cover" src="${svgPlaceholder(420, 220, 'Hero')}"/></div></section>`,
    features: () => `<section class="blk" data-type="features"><h3 contenteditable>Kenapa Memilih Kami</h3><ul style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;list-style:none;padding:0;margin:0">${[1, 2, 3].map(i => `<li class="blk" style="padding:14px" contenteditable>Fitur ${i} • jelaskan manfaat.</li>`).join('')}</ul></section>`,
    product: () => `<section class="blk" data-type="product"><div style="display:grid;grid-template-columns:180px 1fr;gap:14px;align-items:center"><img data-role="img" alt="produk" style="width:100%;height:140px;border-radius:12px;border:1px solid var(--border);object-fit:cover" src="${svgPlaceholder(180, 140, 'Produk')}"><div><h3 contenteditable>Nama Produk</h3><p class="muted" contenteditable>Deskripsi singkat produk.</p><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap"><strong data-role="price" contenteditable>150000</strong><input data-role="qty" type="number" min="1" value="1" style="width:80px"><button class="btn acc" data-action="buy-wa">Beli via WhatsApp</button><button class="btn" data-action="buy-transfer">Transfer</button><button class="btn" data-action="buy-qris">QRIS</button></div></div></div><div class="blk-actions"><button class="btn icon" data-role="bind">🔗 Bind</button></div></section>`,
    'product-grid': () => `<section class="blk" data-type="product-grid"><h3 contenteditable>Produk Unggulan</h3><div class="grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px"></div><div class="muted">Grid akan menampilkan 3 produk pertama.</div></section>`,
    gallery: () => `<section class="blk" data-type="gallery"><h3 contenteditable>Galeri</h3><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">${[1, 2, 3, 4].map(_ => `<img data-role="img" alt="galeri" style="width:100%;height:100px;border-radius:12px;border:1px solid var(--border);object-fit:cover" src="${svgPlaceholder(180, 100, 'Gambar')}">`).join('')}</div></section>`,
    testi: () => `<section class="blk" data-type="testi"><h3 contenteditable>Testimoni</h3><blockquote class="blk" style="padding:16px" contenteditable>"Produk ini luar biasa! Sangat membantu bisnis saya." — Nama Pelanggan</blockquote></section>`,
    pricing: () => `<section class="blk" data-type="pricing"><h3 contenteditable>Paket Harga</h3><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">${['Basic', 'Pro', 'Business'].map((t, i) => `<div class="blk" style="padding:14px;text-align:center"><strong contenteditable>${t}</strong><div style="font-size:28px;font-weight:800;margin:8px 0" contenteditable>${(i + 1) * 100}rb</div><ul style="text-align:left" contenteditable><li>Fitur A</li><li>Fitur B</li><li>Fitur C</li></ul><a class="btn acc" data-role="button" href="#" contenteditable="false">Pilih</a></div>`).join('')}</div></section>`,
    contact: () => `<section class="blk" data-type="contact" style="text-align:center"><h3 contenteditable>Hubungi Kami</h3><p class="muted" contenteditable>Isi pertanyaan Anda, kami balas via WhatsApp.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><input placeholder="Nama" style="min-width:200px"><input placeholder="Nomor" style="min-width:180px"><input placeholder="Pesan" style="min-width:260px;width:60%"><a class="btn acc" data-role="button" href="#" data-action="contact-wa" contenteditable="false">Kirim via WA</a></div></section>`,
    footer: () => `<footer class="blk" data-type="footer" style="text-align:center"><p contenteditable>© <span data-role="brand">Brand Anda</span> • Semua hak cipta dilindungi.</p></footer>`
  };

  const handleDrop = (key: string) => {
    const template = templates[key];
    if (!template) return;

    const html = template();
    const currentPage = pages.find(p => p.id === currentPageId);
    if (!currentPage) return;

    const newHtml = currentPage.html + html;
    
    updateState(prev => ({
      ...prev,
      pages: prev.pages.map(page => 
        page.id === currentPageId 
          ? { ...page, html: newHtml }
          : page
      )
    }));
  };

  const value = {
    templates,
    handleDrop
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};