import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Package, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Dashboard() {
  const { productions, stocks, orders } = useApp();

  const productionData = [
    { month: 'Jan', production: 400 },
    { month: 'Fév', production: 300 },
    { month: 'Mar', production: 500 },
    { month: 'Avr', production: 600 },
  ];

  const salesData = [
    { month: 'Jan', ventes: 30000 },
    { month: 'Fév', ventes: 40000 },
    { month: 'Mar', ventes: 35000 },
    { month: 'Avr', ventes: 50000 },
  ];

  const totalProduction = productions.reduce((sum, p) => sum + p.quantity, 0);
  const totalStock = stocks.reduce((sum, s) => sum + s.quantity, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrders = orders.filter(o => o.status !== 'livré' && o.status !== 'annulé').length;

  const metrics = [
    { label: 'Production totale', value: `${totalProduction} kg`, icon: TrendingUp, change: '+12%', positive: true },
    { label: 'Stock disponible', value: `${totalStock} kg`, icon: Package, change: '-5%', positive: false },
    { label: 'Revenus', value: `${totalRevenue.toLocaleString()} FCFA`, icon: DollarSign, change: '+18%', positive: true },
    { label: 'Commandes actives', value: activeOrders, icon: TrendingUp, change: '+3', positive: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d'ensemble de vos activités</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className={`${metric.positive ? 'bg-green-100' : 'bg-red-100'} p-3 rounded-lg`}>
                  <Icon size={24} className={metric.positive ? 'text-green-600' : 'text-red-600'} />
                </div>
                <span className={`text-sm font-semibold ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#7a4e2d] mb-1">{metric.value}</h3>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Production mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
              <XAxis dataKey="month" stroke="#8a7a6a" />
              <YAxis stroke="#8a7a6a" />
              <Tooltip />
              <Bar dataKey="production" fill="#7a4e2d" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Évolution des ventes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
              <XAxis dataKey="month" stroke="#8a7a6a" />
              <YAxis stroke="#8a7a6a" />
              <Tooltip />
              <Line type="monotone" dataKey="ventes" stroke="#7a4e2d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Productions récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Quantité</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Localisation</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Statut</th>
              </tr>
            </thead>
            <tbody>
              {productions.slice(0, 5).map((production) => (
                <tr key={production.id} className="border-b border-gray-100 hover:bg-[#faf8f5]">
                  <td className="py-3 px-4 font-semibold">{production.type}</td>
                  <td className="py-3 px-4">{production.quantity} {production.unit}</td>
                  <td className="py-3 px-4">{production.location}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{production.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      production.status === 'récolté' ? 'bg-green-100 text-green-700' :
                      production.status === 'en_cours' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {production.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
