import { useState } from 'react';
import { Plus, Edit, Trash2, X, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Stocks() {
  const { stocks, addStock, updateStock, deleteStock } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    unit: 'kg',
    minThreshold: '',
    lastUpdate: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateStock(editingId, {
        ...formData,
        quantity: Number(formData.quantity),
        minThreshold: Number(formData.minThreshold),
      });
    } else {
      addStock({
        ...formData,
        quantity: Number(formData.quantity),
        minThreshold: Number(formData.minThreshold),
      });
    }

    setShowModal(false);
    setEditingId(null);
    setFormData({ product: '', quantity: '', unit: 'kg', minThreshold: '', lastUpdate: new Date().toISOString().split('T')[0] });
  };

  const handleEdit = (stock: any) => {
    setEditingId(stock.id);
    setFormData({
      product: stock.product,
      quantity: stock.quantity.toString(),
      unit: stock.unit,
      minThreshold: stock.minThreshold.toString(),
      lastUpdate: stock.lastUpdate,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce stock ?')) {
      deleteStock(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#7a4e2d]">Gestion des stocks</h1>
          <p className="text-gray-600">Suivez vos stocks en temps réel</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span>Ajouter un stock</span>
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock) => {
          const isLow = stock.quantity <= stock.minThreshold;

          return (
            <div key={stock.id} className={`bg-white rounded-xl p-6 shadow-sm border-2 ${isLow ? 'border-red-300' : 'border-transparent'}`}>
              {isLow && (
                <div className="flex items-center gap-2 mb-3 text-red-600">
                  <AlertTriangle size={18} />
                  <span className="text-sm font-semibold">Stock faible</span>
                </div>
              )}

              <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">{stock.product}</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Quantité disponible</p>
                  <p className="text-2xl font-bold text-[#7a4e2d]">{stock.quantity} {stock.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Seuil minimum</p>
                  <p className="font-semibold">{stock.minThreshold} {stock.unit}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dernière mise à jour</p>
                  <p className="font-semibold">{stock.lastUpdate}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(stock)}
                  className="flex-1 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-semibold"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(stock.id)}
                  className="flex-1 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-semibold"
                >
                  Supprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#7a4e2d]">
                {editingId ? 'Modifier le stock' : 'Ajouter un stock'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setFormData({ product: '', quantity: '', unit: 'kg', minThreshold: '', lastUpdate: new Date().toISOString().split('T')[0] });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Produit</label>
                <input
                  type="text"
                  value={formData.product}
                  onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Quantité</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Unité</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
                  >
                    <option value="kg">kg</option>
                    <option value="tonnes">tonnes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Seuil minimum</label>
                <input
                  type="number"
                  value={formData.minThreshold}
                  onChange={(e) => setFormData({ ...formData, minThreshold: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                {editingId ? 'Modifier' : 'Ajouter'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
