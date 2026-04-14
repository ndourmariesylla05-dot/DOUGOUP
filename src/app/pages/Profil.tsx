import { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Profil() {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, ...formData });
      setIsEditing(false);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-2">Profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#7a4e2d] to-[#5a3a1f] text-white flex items-center justify-center text-5xl font-bold">
              {user.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 bg-[#d8c3a5] text-[#7a4e2d] p-3 rounded-full hover:bg-[#c9b395] transition-colors">
              <Camera size={20} />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-[#7a4e2d]">{user.name}</h2>
          <p className="text-gray-600 capitalize">{user.role}</p>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Nom complet</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Téléphone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
              >
                Annuler
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-[#faf8f5] rounded-xl">
              <Mail className="text-[#7a4e2d]" size={24} />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-[#7a4e2d]">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[#faf8f5] rounded-xl">
              <Phone className="text-[#7a4e2d]" size={24} />
              <div>
                <p className="text-sm text-gray-600">Téléphone</p>
                <p className="font-semibold text-[#7a4e2d]">{user.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[#faf8f5] rounded-xl">
              <Briefcase className="text-[#7a4e2d]" size={24} />
              <div>
                <p className="text-sm text-gray-600">Type de compte</p>
                <p className="font-semibold text-[#7a4e2d] capitalize">{user.role}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Modifier le profil
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#7a4e2d] mb-4">Statistiques du compte</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-[#faf8f5] rounded-xl">
            <p className="text-2xl font-bold text-[#7a4e2d]">23</p>
            <p className="text-sm text-gray-600">Commandes</p>
          </div>
          <div className="text-center p-4 bg-[#faf8f5] rounded-xl">
            <p className="text-2xl font-bold text-[#7a4e2d]">15</p>
            <p className="text-sm text-gray-600">Productions</p>
          </div>
          <div className="text-center p-4 bg-[#faf8f5] rounded-xl">
            <p className="text-2xl font-bold text-[#7a4e2d]">8</p>
            <p className="text-sm text-gray-600">Messages</p>
          </div>
          <div className="text-center p-4 bg-[#faf8f5] rounded-xl">
            <p className="text-2xl font-bold text-[#7a4e2d]">95%</p>
            <p className="text-sm text-gray-600">Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}
