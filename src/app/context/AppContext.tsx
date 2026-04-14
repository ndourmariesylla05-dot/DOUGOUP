import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'producteur' | 'client' | 'transformateur';
  phone: string;
  avatar?: string;
}

export interface Production {
  id: string;
  type: string;
  quantity: number;
  unit: string;
  date: string;
  status: 'en_cours' | 'terminé' | 'récolté';
  location: string;
}

export interface Stock {
  id: string;
  product: string;
  quantity: number;
  unit: string;
  lastUpdate: string;
  minThreshold: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  seller: string;
  image: string;
  stock: number;
}

export interface Order {
  id: string;
  product: string;
  quantity: number;
  total: number;
  status: 'en_attente' | 'confirmé' | 'livré' | 'annulé';
  date: string;
  customer: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
  read: boolean;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  productions: Production[];
  addProduction: (production: Omit<Production, 'id'>) => void;
  updateProduction: (id: string, production: Partial<Production>) => void;
  deleteProduction: (id: string) => void;
  stocks: Stock[];
  addStock: (stock: Omit<Stock, 'id'>) => void;
  updateStock: (id: string, stock: Partial<Stock>) => void;
  deleteStock: (id: string) => void;
  products: Product[];
  orders: Order[];
  addOrder: (order: Omit<Order, 'id'>) => void;
  messages: Message[];
  markMessageAsRead: (id: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const mockProductions: Production[] = [
  { id: '1', type: 'Mil Souna', quantity: 500, unit: 'kg', date: '2026-03-15', status: 'récolté', location: 'Thiès' },
  { id: '2', type: 'Mil Sanio', quantity: 300, unit: 'kg', date: '2026-04-01', status: 'en_cours', location: 'Kaolack' },
  { id: '3', type: 'Mil Gros', quantity: 200, unit: 'kg', date: '2026-04-10', status: 'en_cours', location: 'Louga' },
];

const mockStocks: Stock[] = [
  { id: '1', product: 'Mil Souna', quantity: 500, unit: 'kg', lastUpdate: '2026-04-10', minThreshold: 100 },
  { id: '2', product: 'Mil Sanio', quantity: 150, unit: 'kg', lastUpdate: '2026-04-08', minThreshold: 100 },
  { id: '3', product: 'Farine de Mil', quantity: 80, unit: 'kg', lastUpdate: '2026-04-12', minThreshold: 50 },
];

const mockProducts: Product[] = [
  { id: '1', name: 'Mil Souna Bio', description: 'Mil de qualité supérieure cultivé sans pesticides', price: 500, unit: 'kg', category: 'Céréales', seller: 'Mamadou Diallo', image: '', stock: 500 },
  { id: '2', name: 'Farine de Mil', description: 'Farine de mil fraîchement moulue', price: 800, unit: 'kg', category: 'Farine', seller: 'Fatou Sène', image: '', stock: 200 },
  { id: '3', name: 'Mil Sanio', description: 'Mil traditionnel sénégalais', price: 450, unit: 'kg', category: 'Céréales', seller: 'Abdou Kane', image: '', stock: 300 },
  { id: '4', name: 'Couscous de Mil', description: 'Couscous artisanal à base de mil', price: 1200, unit: 'kg', category: 'Transformé', seller: 'Awa Ndiaye', image: '', stock: 150 },
];

const mockOrders: Order[] = [
  { id: '1', product: 'Mil Souna Bio', quantity: 50, total: 25000, status: 'confirmé', date: '2026-04-12', customer: 'Restaurant Le Baobab' },
  { id: '2', product: 'Farine de Mil', quantity: 20, total: 16000, status: 'en_attente', date: '2026-04-13', customer: 'Boulangerie Moderne' },
  { id: '3', product: 'Couscous de Mil', quantity: 10, total: 12000, status: 'livré', date: '2026-04-10', customer: 'Hôtel Teranga' },
];

const mockMessages: Message[] = [
  { id: '1', sender: 'Mamadou Diallo', content: 'Bonjour, votre commande est prête pour livraison', date: '2026-04-13 10:30', read: false },
  { id: '2', sender: 'Support DOUGOUP', content: 'Bienvenue sur la plateforme DOUGOUP !', date: '2026-04-12 14:00', read: true },
  { id: '3', sender: 'Fatou Sène', content: 'Nouveau stock de farine disponible', date: '2026-04-11 09:15', read: false },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [productions, setProductions] = useState<Production[]>(mockProductions);
  const [stocks, setStocks] = useState<Stock[]>(mockStocks);
  const [products] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const addProduction = (production: Omit<Production, 'id'>) => {
    const newProduction = { ...production, id: Date.now().toString() };
    setProductions([...productions, newProduction]);
  };

  const updateProduction = (id: string, updatedProduction: Partial<Production>) => {
    setProductions(productions.map(p => p.id === id ? { ...p, ...updatedProduction } : p));
  };

  const deleteProduction = (id: string) => {
    setProductions(productions.filter(p => p.id !== id));
  };

  const addStock = (stock: Omit<Stock, 'id'>) => {
    const newStock = { ...stock, id: Date.now().toString() };
    setStocks([...stocks, newStock]);
  };

  const updateStock = (id: string, updatedStock: Partial<Stock>) => {
    setStocks(stocks.map(s => s.id === id ? { ...s, ...updatedStock } : s));
  };

  const deleteStock = (id: string) => {
    setStocks(stocks.filter(s => s.id !== id));
  };

  const addOrder = (order: Omit<Order, 'id'>) => {
    const newOrder = { ...order, id: Date.now().toString() };
    setOrders([...orders, newOrder]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        productions,
        addProduction,
        updateProduction,
        deleteProduction,
        stocks,
        addStock,
        updateStock,
        deleteStock,
        products,
        orders,
        addOrder,
        messages,
        markMessageAsRead,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
