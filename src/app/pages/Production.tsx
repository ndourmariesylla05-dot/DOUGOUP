import { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Production() {
  const { productions, addProduction, updateProduction, deleteProduction } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    quantity: '',
    unit: 'kg',
    date: '',
    status: 'en_cours' as const,
    location: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateProduction(editingId, {
        ...formData,
        quantity: Number(formData.quantity),
      });
    } else {
      addProduction({
        ...formData,
        quantity: Number(formData.quantity),
      });
    }

    setShowModal(false);
    setEditingId(null);
    setFormData({ type: '', quantity: '', unit: 'kg', date: '', status: 'en_cours', location: '' });
  };

  const handleEdit = (production: any) => {
    setEditingId(production.id);
    setFormData({
      type: production.type,
      quantity: production.quantity.toString(),
      unit: production.unit,
      date: production.date,
      status: production.status,
      location: production.location,
    });
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette production ?')) {
      deleteProduction(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#7a4e2d]">Production</h1>
          <p className="text-gray-600">Gérez vos productions de mil</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Plus size={20} />
          <span>Nouvelle production</span>
        </button>
      </div>

      <div className="grid gap-4">
        {productions.map((production) => (
          <div key={production.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#7a4e2d] mb-2">{production.type}</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Quantité</p>
                    <p className="font-semibold">{production.quantity} {production.unit}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Localisation</p>
                    <p className="font-semibold">{production.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-semibold">{production.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Statut</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      production.status === 'récolté' ? 'bg-green-100 text-green-700' :
                      production.status === 'en_cours' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {production.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(production)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(production.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-[#7a4e2d]">
                {editingId ? 'Modifier la production' : 'Nouvelle production'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingId(null);
                  setFormData({ type: '', quantity: '', unit: 'kg', date: '', status: 'en_cours', location: '' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Type de mil</label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
                <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Localisation</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Statut</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-4 py-2 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
                >
                  <option value="en_cours">En cours</option>
                  <option value="récolté">Récolté</option>
                  <option value="terminé">Terminé</option>
                </select>
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
