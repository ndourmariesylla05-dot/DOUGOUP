import { Link } from 'react-router';
import { Wheat, TrendingUp, Users, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import welcomeImg from '../../imports/Gemini_Generated_Image_wek13wek13wek13w.png';

export default function Accueil() {
  const { user, productions, stocks, orders } = useApp();

  const stats = [
    { icon: Wheat, label: 'Productions', value: productions.length, color: 'bg-green-500' },
    { icon: Package, label: 'Produits en stock', value: stocks.length, color: 'bg-blue-500' },
    { icon: TrendingUp, label: 'Commandes', value: orders.length, color: 'bg-purple-500' },
    { icon: Users, label: 'Messages non lus', value: 2, color: 'bg-orange-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#7a4e2d] to-[#5a3a1f] rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">Bienvenue, {user?.name} !</h1>
          <p className="text-[#d8c3a5] mb-6">Votre plateforme pour digitaliser la filière du mil</p>
          <Link
            to="/marketplace"
            className="inline-block bg-[#d8c3a5] text-[#7a4e2d] font-semibold px-6 py-3 rounded-xl hover:bg-white transition-colors"
          >
            Explorer le Marketplace
          </Link>
        </div>
        <img
          src={welcomeImg}
          alt="Welcome"
          className="absolute right-0 bottom-0 h-full object-cover opacity-20 lg:opacity-30"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl p-4 shadow-sm">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-2xl font-bold text-[#7a4e2d]">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Activités récentes</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Nouvelle production ajoutée</p>
                <p className="text-xs text-gray-600">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Commande reçue</p>
                <p className="text-xs text-gray-600">Il y a 5 heures</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Nouveau message</p>
                <p className="text-xs text-gray-600">Il y a 1 jour</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Accès rapides</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link
              to="/production"
              className="bg-[#7a4e2d] text-white rounded-xl p-4 hover:bg-[#5a3a1f] transition-colors"
            >
              <Wheat size={24} className="mb-2" />
              <p className="text-sm font-semibold">Production</p>
            </Link>
            <Link
              to="/stocks"
              className="bg-[#d8c3a5] text-[#7a4e2d] rounded-xl p-4 hover:bg-[#c9b395] transition-colors"
            >
              <Package size={24} className="mb-2" />
              <p className="text-sm font-semibold">Stocks</p>
            </Link>
            <Link
              to="/marketplace"
              className="bg-[#a67c52] text-white rounded-xl p-4 hover:bg-[#8b5e34] transition-colors"
            >
              <TrendingUp size={24} className="mb-2" />
              <p className="text-sm font-semibold">Marketplace</p>
            </Link>
            <Link
              to="/commandes"
              className="bg-[#8b5e34] text-white rounded-xl p-4 hover:bg-[#6d4526] transition-colors"
            >
              <Users size={24} className="mb-2" />
              <p className="text-sm font-semibold">Commandes</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
