import { useState, useCallback } from 'react';

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
}

export const usePageBuilder = () => {
  const [currentView, setCurrentView] = useState<ViewType>('builder');
  const [pages, setPages] = useState<Page[]>([
    { id: 'home', name: 'Beranda', html: '' }
  ]);
  const [currentPageId, setCurrentPageId] = useState('home');
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [settings, setSettings] = useState<Settings>({
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

  const switchPage = useCallback((pageId: string) => {
    setCurrentPageId(pageId);
  }, []);

  const addPage = useCallback((name: string) => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name,
      html: ''
    };
    setPages(prev => [...prev, newPage]);
    setCurrentPageId(newPage.id);
  }, []);

  const addProduct = useCallback((product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`
    };
    setProducts(prev => [...prev, newProduct]);
  }, []);

  const addOrder = useCallback((order: Omit<Order, 'id'>) => {
    const newOrder: Order = {
      ...order,
      id: `order-${Date.now()}`
    };
    setOrders(prev => [...prev, newOrder]);
  }, []);

  const addCustomer = useCallback((customer: Omit<Customer, 'id'>) => {
    const newCustomer: Customer = {
      ...customer,
      id: `customer-${Date.now()}`
    };
    setCustomers(prev => [...prev, newCustomer]);
  }, []);

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
        setMedia(prev => [...prev, mediaFile]);
        resolve(mediaFile);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const currentPage = pages.find(p => p.id === currentPageId) || pages[0];

  return {
    // View state
    currentView,
    setCurrentView,
    
    // Page state
    pages,
    currentPageId,
    currentPage,
    switchPage,
    addPage,
    
    // Element selection
    selectedElement,
    setSelectedElement,
    
    // Data state
    products,
    setProducts,
    addProduct,
    
    orders,
    setOrders,
    addOrder,
    
    customers,
    setCustomers,
    addCustomer,
    
    media,
    setMedia,
    uploadMedia,
    
    settings,
    setSettings
  };
};