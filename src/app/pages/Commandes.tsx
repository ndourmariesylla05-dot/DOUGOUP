import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Commandes() {
  const { orders } = useApp();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en_attente':
        return <Clock className="text-orange-500" size={20} />;
      case 'confirmé':
        return <Package className="text-blue-500" size={20} />;
      case 'livré':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'annulé':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_attente':
        return 'bg-orange-100 text-orange-700';
      case 'confirmé':
        return 'bg-blue-100 text-blue-700';
      case 'livré':
        return 'bg-green-100 text-green-700';
      case 'annulé':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const stats = {
    total: orders.length,
    enAttente: orders.filter(o => o.status === 'en_attente').length,
    confirme: orders.filter(o => o.status === 'confirmé').length,
    livre: orders.filter(o => o.status === 'livré').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-2">Commandes</h1>
        <p className="text-gray-600">Suivez toutes vos commandes</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Total</p>
          <p className="text-2xl font-bold text-[#7a4e2d]">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">En attente</p>
          <p className="text-2xl font-bold text-orange-600">{stats.enAttente}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Confirmées</p>
          <p className="text-2xl font-bold text-blue-600">{stats.confirme}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-600 mb-1">Livrées</p>
          <p className="text-2xl font-bold text-green-600">{stats.livre}</p>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(order.status)}
                <div>
                  <h3 className="text-lg font-bold text-[#7a4e2d]">{order.product}</h3>
                  <p className="text-sm text-gray-600">Commande #{order.id}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Quantité</p>
                <p className="font-semibold">{order.quantity} unités</p>
              </div>
              <div>
                <p className="text-gray-600">Total</p>
                <p className="font-semibold text-[#7a4e2d]">{order.total.toLocaleString()} FCFA</p>
              </div>
              <div>
                <p className="text-gray-600">Client</p>
                <p className="font-semibold">{order.customer}</p>
              </div>
              <div>
                <p className="text-gray-600">Date</p>
                <p className="font-semibold">{order.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-600 text-lg">Aucune commande pour le moment</p>
        </div>
      )}
    </div>
  );
}
