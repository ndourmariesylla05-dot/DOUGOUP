import { Bell, Lock, Globe, Moon, Shield } from 'lucide-react';
import { useState } from 'react';

export default function Parametres() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('fr');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-2">Paramètres</h1>
        <p className="text-gray-600">Configurez votre application</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#7a4e2d] p-3 rounded-lg">
              <Bell className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#7a4e2d]">Notifications</h3>
              <p className="text-sm text-gray-600">Recevez des alertes pour les événements importants</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-8 rounded-full transition-colors ${
                notifications ? 'bg-[#7a4e2d]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                notifications ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#d8c3a5] p-3 rounded-lg">
              <Moon className="text-[#7a4e2d]" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#7a4e2d]">Mode sombre</h3>
              <p className="text-sm text-gray-600">Activez le thème sombre de l'application</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-8 rounded-full transition-colors ${
                darkMode ? 'bg-[#7a4e2d]' : 'bg-gray-300'
              }`}
            >
              <div className={`w-6 h-6 bg-white rounded-full transition-transform ${
                darkMode ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#a67c52] p-3 rounded-lg">
              <Globe className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#7a4e2d]">Langue</h3>
              <p className="text-sm text-gray-600">Choisissez votre langue préférée</p>
            </div>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="wo">Wolof</option>
          </select>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-[#8b5e34] p-3 rounded-lg">
              <Lock className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#7a4e2d]">Sécurité</h3>
              <p className="text-sm text-gray-600">Gérez la sécurité de votre compte</p>
            </div>
          </div>
          <button className="w-full bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl transition-colors">
            Changer le mot de passe
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Shield className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-[#7a4e2d]">Confidentialité</h3>
              <p className="text-sm text-gray-600">Contrôlez vos données personnelles</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-3 bg-[#faf8f5] hover:bg-[#f0ebe4] rounded-xl transition-colors">
              Politique de confidentialité
            </button>
            <button className="w-full text-left px-4 py-3 bg-[#faf8f5] hover:bg-[#f0ebe4] rounded-xl transition-colors">
              Conditions d'utilisation
            </button>
            <button className="w-full text-left px-4 py-3 bg-[#faf8f5] hover:bg-[#f0ebe4] rounded-xl transition-colors text-red-600">
              Supprimer mon compte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
