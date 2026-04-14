import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../context/AppContext';

export default function Statistiques() {
  const { productions, stocks, orders } = useApp();

  const productionByType = productions.reduce((acc, prod) => {
    acc[prod.type] = (acc[prod.type] || 0) + prod.quantity;
    return acc;
  }, {} as Record<string, number>);

  const productionChartData = Object.entries(productionByType).map(([type, quantity]) => ({
    type,
    quantity,
  }));

  const monthlyData = [
    { month: 'Jan', production: 400, ventes: 30000 },
    { month: 'Fév', production: 300, ventes: 40000 },
    { month: 'Mar', production: 500, ventes: 35000 },
    { month: 'Avr', production: 600, ventes: 50000 },
  ];

  const stockData = stocks.map(stock => ({
    name: stock.product,
    value: stock.quantity,
  }));

  const COLORS = ['#7a4e2d', '#d8c3a5', '#a67c52', '#8b5e34', '#c9a97a'];

  const totalProduction = productions.reduce((sum, p) => sum + p.quantity, 0);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-2">Statistiques</h1>
        <p className="text-gray-600">Analysez vos performances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Production totale</p>
          <p className="text-3xl font-bold text-[#7a4e2d]">{totalProduction} kg</p>
          <p className="text-sm text-green-600 mt-2">+12% ce mois</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Revenus totaux</p>
          <p className="text-3xl font-bold text-[#7a4e2d]">{totalRevenue.toLocaleString()} FCFA</p>
          <p className="text-sm text-green-600 mt-2">+18% ce mois</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-600 mb-2">Valeur moyenne commande</p>
          <p className="text-3xl font-bold text-[#7a4e2d]">{Math.round(avgOrderValue).toLocaleString()} FCFA</p>
          <p className="text-sm text-green-600 mt-2">+5% ce mois</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Production par type</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productionChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
              <XAxis dataKey="type" stroke="#8a7a6a" />
              <YAxis stroke="#8a7a6a" />
              <Tooltip />
              <Bar dataKey="quantity" fill="#7a4e2d" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Répartition des stocks</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stockData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stockData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Évolution mensuelle</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ebe4" />
              <XAxis dataKey="month" stroke="#8a7a6a" />
              <YAxis stroke="#8a7a6a" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="production" stroke="#7a4e2d" strokeWidth={3} name="Production (kg)" />
              <Line type="monotone" dataKey="ventes" stroke="#d8c3a5" strokeWidth={3} name="Ventes (FCFA)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
