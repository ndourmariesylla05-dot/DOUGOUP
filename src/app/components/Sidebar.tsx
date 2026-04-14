import { Link, useLocation } from 'react-router';
import {
  Home,
  LayoutDashboard,
  Wheat,
  Package,
  Store,
  ShoppingCart,
  MessageSquare,
  BarChart3,
  User,
  Settings,
  HelpCircle,
  LogOut,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import logoImg from '../../imports/logo.png';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const { logout, user, messages } = useApp();

  const menuItems = [
    { icon: Home, label: 'Accueil', path: '/accueil' },
    { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard' },
    { icon: Wheat, label: 'Production', path: '/production' },
    { icon: Package, label: 'Stocks', path: '/stocks' },
    { icon: Store, label: 'Marketplace', path: '/marketplace' },
    { icon: ShoppingCart, label: 'Commandes', path: '/commandes' },
    { icon: MessageSquare, label: 'Messages', path: '/messages', badge: messages.filter(m => !m.read).length },
    { icon: BarChart3, label: 'Statistiques', path: '/statistiques' },
    { icon: User, label: 'Profil', path: '/profil' },
    { icon: Settings, label: 'Paramètres', path: '/parametres' },
    { icon: HelpCircle, label: 'Aide / Support', path: '/aide' },
  ];

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-[#7a4e2d] text-white z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="DOUGOUP" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold">DOUGOUP</h1>
              <p className="text-xs text-[#d8c3a5]">Plateforme AgriTech</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:bg-white/10 p-2 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {user && (
          <div className="p-4 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#d8c3a5] text-[#7a4e2d] flex items-center justify-center font-bold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-[#d8c3a5] capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                      isActive
                        ? 'bg-[#d8c3a5] text-[#7a4e2d]'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-white hover:bg-red-500/20 transition-colors"
          >
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
}
