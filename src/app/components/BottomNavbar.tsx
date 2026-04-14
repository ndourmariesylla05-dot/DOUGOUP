import { Link, useLocation } from 'react-router';
import { Home, LayoutDashboard, Store, ShoppingCart, User } from 'lucide-react';

export default function BottomNavbar() {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Accueil', path: '/accueil' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Store, label: 'Market', path: '/marketplace' },
    { icon: ShoppingCart, label: 'Commandes', path: '/commandes' },
    { icon: User, label: 'Profil', path: '/profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-30">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? 'text-[#7a4e2d] bg-[#d8c3a5]/20'
                  : 'text-gray-600 hover:text-[#7a4e2d]'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
