import { useState, useCallback, useEffect } from 'react';

export type ViewType = 'builder' | 'products' | 'orders' | 'customers' | 'library' | 'crm' | 'analytics' | 'apps' | 'settings';

export interface Page {
  id: string;
  name: string;
  html: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  category: string;
  image: string;
  description?: string;
}

export interface Order {
  id: string;
  date: number;
  customer: string;
  product: string;
  qty: number;
  total: number;
  method: string;
  status: 'pending' | 'paid' | 'cancelled';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  note: string;
}

export interface MediaFile {
  id: string;
  name: string;
  dataUrl: string;
  type: string;
}

export interface Settings {
  brandName: string;
  domain: string;
  workspace: string;
  waNumber: string;
  waTemplate: string;
  bankInfo: string;
  qrisId: string;
  qrisImg: string;
  logo: string;
  favicon: string;
  theme: string;
  lang: string;
}

export interface CRMCard {
  id: number;
  name: string;
  note: string;
  stage: string;
}

export interface AppSettings {
  crm: boolean;
  rekap: boolean;
  db: boolean;
}

export interface PageBuilderState {
  pages: Page[];
  currentPageId: string;
  selectedEl: HTMLElement | null;
  products: Product[];
  orders: Order[];
  customers: Customer[];
  media: MediaFile[];
  settings: Settings;
  apps: AppSettings;
  crm: { cards: CRMCard[] };
}

const defaultState = (): PageBuilderState => ({
  pages: [{ id: 'home', name: 'Beranda', html: '' }],
  currentPageId: 'home',
  selectedEl: null,
  products: [],
  orders: [],
  customers: [],
  media: [],
  settings: {
    brandName: 'Page Builder',
    domain: '',
    workspace: 'default',
    theme: 'dark',
    lang: 'id',
    logo: '',
    favicon: '',
    waNumber: '',
    waTemplate: 'Halo, saya ingin beli {{product}} ({{qty}}x) total {{total}}.',
    bankInfo: '',
    qrisId: '',
    qrisImg: ''
  },
  apps: { crm: false, rekap: false, db: true },
  crm: { cards: [] }
});

export const currency = (n: number) => new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0
}).format(n || 0);

export const uid = (p = 'id') => p + Math.random().toString(36).slice(2, 8);

export const wsKey = (workspace: string) => `pb-proto-${workspace || 'default'}`;

export const saveLocal = (state: PageBuilderState) => {
  localStorage.setItem(wsKey(state.settings.workspace), JSON.stringify(state));
};

export const loadLocal = (workspace: string): PageBuilderState => {
  try {
    const raw = localStorage.getItem(wsKey(workspace));
    if (raw) {
      return Object.assign(defaultState(), JSON.parse(raw));
    }
  } catch (e) {
    console.error('Failed to load from localStorage:', e);
  }
  return defaultState();
};

export const download = (filename: string, text: string) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
};

export const svgPlaceholder = (w = 320, h = 180, text = 'Gambar') => 
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0%" stop-color="#11162f"/>
          <stop offset="100%" stop-color="#303a7a"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#cbd5ff" font-family="system-ui,Arial" font-size="20">${text}</text>
    </svg>`
  );

export const usePageBuilder = () => {
  const [currentView, setCurrentView] = useState<ViewType>('builder');
  const [state, setState] = useState<PageBuilderState>(() => loadLocal('default'));
  
  // Auto-save to localStorage whenever state changes
  useEffect(() => {
    saveLocal(state);
  }, [state]);

  const updateState = useCallback((updater: (prev: PageBuilderState) => PageBuilderState) => {
    setState(updater);
  }, []);

  const switchPage = useCallback((pageId: string) => {
    updateState(prev => ({
      ...prev,
      currentPageId: pageId
    }));
  }, [updateState]);

  const addPage = useCallback((name: string) => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name,
      html: ''
    };
    updateState(prev => ({
      ...prev,
      pages: [...prev.pages, newPage],
      currentPageId: newPage.id
    }));
  }, [updateState]);

  const setSelectedElement = useCallback((element: HTMLElement | null) => {
    updateState(prev => ({
      ...prev,
      selectedEl: element
    }));
  }, [updateState]);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`
    };
    updateState(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  }, [updateState]);

  const setProducts = useCallback((products: Product[]) => {
    updateState(prev => ({
      ...prev,
      products
    }));
  }, [updateState]);

  const addOrder = useCallback((order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}`
    };
    updateState(prev => ({
      ...prev,
      orders: [...prev.orders, newOrder]
    }));
  }, [updateState]);

  const setOrders = useCallback((orders: Order[]) => {
    updateState(prev => ({
      ...prev,
      orders
    }));
  }, [updateState]);

  const addCustomer = useCallback((customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: `customer-${Date.now()}`
    };
    updateState(prev => ({
      ...prev,
      customers: [...prev.customers, newCustomer]
    }));
  }, [updateState]);

  const setCustomers = useCallback((customers: Customer[]) => {
    updateState(prev => ({
      ...prev,
      customers
    }));
  }, [updateState]);

  const uploadMedia = useCallback((file: File): Promise<MediaFile> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const mediaFile: MediaFile = {
          id: `media-${Date.now()}`,
          name: file.name,
          dataUrl: reader.result as string,
          type: file.type
        };
        updateState(prev => ({
          ...prev,
          media: [...prev.media, mediaFile]
        }));
        resolve(mediaFile);
      };
      reader.readAsDataURL(file);
    });
  }, [updateState]);

  const setMedia = useCallback((media: MediaFile[]) => {
    updateState(prev => ({
      ...prev,
      media
    }));
  }, [updateState]);

  const setSettings = useCallback((settings: Settings) => {
    updateState(prev => ({
      ...prev,
      settings
    }));
  }, [updateState]);

  const setPages = useCallback((pages: Page[]) => {
    updateState(prev => ({
      ...prev,
      pages
    }));
  }, [updateState]);

  const currentPage = state.pages.find(p => p.id === state.currentPageId) || state.pages[0];

  return {
    // View state
    currentView,
    setCurrentView,
    
    // State management
    state,
    setState,
    updateState,
    
    // Page state
    pages: state.pages,
    setPages,
    currentPageId: state.currentPageId,
    currentPage,
    switchPage,
    addPage,
    
    // Element selection
    selectedElement: state.selectedEl,
    setSelectedElement,
    
    // Data state
    products: state.products,
    setProducts,
    addProduct,
    
    orders: state.orders,
    setOrders,
    addOrder,
    
    customers: state.customers,
    setCustomers,
    addCustomer,
    
    media: state.media,
    setMedia,
    uploadMedia,
    
    settings: state.settings,
    setSettings,

    // Apps and CRM
    apps: state.apps,
    crmCards: state.crm.cards,

    // Utility functions
    currency,
    uid,
    download,
    svgPlaceholder
  };
};