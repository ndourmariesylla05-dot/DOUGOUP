import { useState } from 'react';
import {
  Camera, Mail, Phone, MapPin, Briefcase, Edit3, Save, X,
  Star, Package, ShoppingCart, MessageSquare, Award, TrendingUp,
  Calendar, Clock, Shield
} from 'lucide-react';

const demoUser = {
  id: '1',
  name: 'Mamadou Diallo',
  email: 'mamadou.diallo@dougoup.sn',
  phone: '+221 77 123 45 67',
  role: 'producteur' as const,
  location: 'Thiès, Sénégal',
  bio: 'Producteur de mil depuis 15 ans. Spécialisé dans les variétés Souna et Sanio de qualité supérieure.',
  memberSince: 'Janvier 2024',
  avatar: null as string | null,
};

const stats = [
  { label: 'Commandes', value: '23', icon: ShoppingCart, color: '#7a4e2d' },
  { label: 'Productions', value: '15', icon: Package, color: '#4a7c3f' },
  { label: 'Messages', value: '8', icon: MessageSquare, color: '#2d6a8a' },
  { label: 'Satisfaction', value: '95%', icon: Star, color: '#c49a2a' },
];

const activities = [
  { icon: Package, label: 'Nouvelle production ajoutée', detail: 'Mil Souna — 500 kg', date: 'Il y a 2h', color: '#4a7c3f' },
  { icon: ShoppingCart, label: 'Commande confirmée', detail: 'Restaurant Le Baobab — 25 000 FCFA', date: 'Il y a 5h', color: '#7a4e2d' },
  { icon: MessageSquare, label: 'Message reçu', detail: 'Fatou Sène: Nouveau stock disponible', date: 'Hier', color: '#2d6a8a' },
  { icon: TrendingUp, label: 'Stock mis à jour', detail: 'Farine de Mil — 80 kg', date: 'Il y a 3 jours', color: '#c49a2a' },
];

const badges = [
  { label: 'Producteur Vérifié', icon: Shield, color: '#4a7c3f', bg: '#f0fdf4' },
  { label: 'Top Vendeur', icon: Award, color: '#c49a2a', bg: '#fffbeb' },
  { label: 'Membre Actif', icon: Star, color: '#2d6a8a', bg: '#eff6ff' },
];

export default function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: demoUser.name,
    email: demoUser.email,
    phone: demoUser.phone,
    location: demoUser.location,
    bio: demoUser.bio,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const roleLabel: Record<string, string> = {
    producteur: 'Producteur Agricole',
    client: 'Client',
    transformateur: 'Transformateur',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-1">Mon Profil</h1>
        <p className="text-gray-500 text-sm">Gérez vos informations personnelles et consultez vos activités</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
          <Save size={16} /> Profil mis à jour avec succès !
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COL - Avatar + Badges */}
        <div className="space-y-4">
          {/* Avatar card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e6d6] flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#7a4e2d] to-[#4a2e1a] flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                {formData.name.charAt(0)}
              </div>
              <button
                className="absolute bottom-0 right-0 bg-[#7a4e2d] text-white p-2 rounded-full shadow-md hover:bg-[#5a3a1f] transition-colors"
                title="Changer la photo"
              >
                <Camera size={16} />
              </button>
            </div>

            <h2 className="text-xl font-bold text-[#3d2510]">{formData.name}</h2>
            <span className="inline-block mt-1 px-3 py-1 bg-[#fdf3e9] text-[#7a4e2d] text-xs font-semibold rounded-full">
              {roleLabel[demoUser.role]}
            </span>

            <div className="mt-3 flex items-center gap-1 text-gray-500 text-sm">
              <MapPin size={14} />
              <span>{formData.location}</span>
            </div>

            <div className="mt-2 flex items-center gap-1 text-gray-400 text-xs">
              <Calendar size={12} />
              <span>Membre depuis {demoUser.memberSince}</span>
            </div>

            <p className="mt-4 text-gray-600 text-sm leading-relaxed">{formData.bio}</p>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <Edit3 size={16} /> Modifier le profil
              </button>
            )}
          </div>

          {/* Badges */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#f0e6d6]">
            <h3 className="text-sm font-bold text-[#7a4e2d] mb-3 uppercase tracking-wide">Badges & Récompenses</h3>
            <div className="space-y-2">
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ backgroundColor: badge.bg }}
                >
                  <badge.icon size={18} style={{ color: badge.color }} />
                  <span className="text-sm font-semibold" style={{ color: badge.color }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COL - Edit form / Info + Stats + Activity */}
        <div className="lg:col-span-2 space-y-5">
          {/* Edit Form or Info Display */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e6d6]">
            {isEditing ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-[#3d2510]">Modifier les informations</h3>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#7a4e2d] mb-2 uppercase tracking-wide">Nom complet</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#e8d5bf] focus:border-[#7a4e2d] outline-none text-sm bg-[#fdfaf7] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#7a4e2d] mb-2 uppercase tracking-wide">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#e8d5bf] focus:border-[#7a4e2d] outline-none text-sm bg-[#fdfaf7] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#7a4e2d] mb-2 uppercase tracking-wide">Téléphone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#e8d5bf] focus:border-[#7a4e2d] outline-none text-sm bg-[#fdfaf7] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#7a4e2d] mb-2 uppercase tracking-wide">Localisation</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[#e8d5bf] focus:border-[#7a4e2d] outline-none text-sm bg-[#fdfaf7] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#7a4e2d] mb-2 uppercase tracking-wide">Biographie</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#e8d5bf] focus:border-[#7a4e2d] outline-none text-sm bg-[#fdfaf7] resize-none transition-colors"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 flex items-center justify-center gap-2 bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                      <Save size={16} /> Enregistrer
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors text-sm"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#3d2510] mb-5">Informations personnelles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { icon: Mail, label: 'Email', value: formData.email },
                    { icon: Phone, label: 'Téléphone', value: formData.phone },
                    { icon: MapPin, label: 'Localisation', value: formData.location },
                    { icon: Briefcase, label: 'Type de compte', value: roleLabel[demoUser.role] },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3 p-4 bg-[#fdfaf7] rounded-xl border border-[#f0e6d6]">
                      <div className="p-2 bg-[#f5eadc] rounded-lg">
                        <Icon className="text-[#7a4e2d]" size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium">{label}</p>
                        <p className="text-sm font-semibold text-[#3d2510]">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e6d6]">
            <h3 className="text-lg font-bold text-[#3d2510] mb-4">Statistiques du compte</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center p-4 rounded-xl bg-[#fdfaf7] border border-[#f0e6d6]"
                >
                  <div className="p-2 rounded-full mb-2" style={{ backgroundColor: `${color}15` }}>
                    <Icon size={20} style={{ color }} />
                  </div>
                  <p className="text-2xl font-bold" style={{ color }}>{value}</p>
                  <p className="text-xs text-gray-500 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#f0e6d6]">
            <h3 className="text-lg font-bold text-[#3d2510] mb-4">Activité Récente</h3>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#fdfaf7] transition-colors">
                  <div className="p-2 rounded-full flex-shrink-0" style={{ backgroundColor: `${activity.color}15` }}>
                    <activity.icon size={18} style={{ color: activity.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#3d2510]">{activity.label}</p>
                    <p className="text-xs text-gray-500 truncate">{activity.detail}</p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs flex-shrink-0">
                    <Clock size={12} />
                    <span>{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
