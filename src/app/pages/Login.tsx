import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import logoImg from '../../imports/logo.png';

export default function Login() {
  const [step, setStep] = useState<'login' | 'register' | 'role'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { setUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: '1',
      name: 'Utilisateur Demo',
      email,
      role: 'producteur',
      phone: '77 123 45 67',
    });
    navigate('/accueil');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('role');
  };

  const handleRoleSelection = (role: 'producteur' | 'client' | 'transformateur') => {
    setUser({
      id: Date.now().toString(),
      name,
      email,
      role,
      phone,
    });
    navigate('/accueil');
  };

  if (step === 'role') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7a4e2d] to-[#5a3a1f] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logoImg} alt="DOUGOUP" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#7a4e2d]">Choisissez votre profil</h2>
            <p className="text-gray-600 mt-2">Sélectionnez le type de compte qui vous correspond</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => handleRoleSelection('producteur')}
              className="w-full bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white rounded-xl p-6 text-left transition-colors"
            >
              <h3 className="font-bold text-lg mb-1">Producteur</h3>
              <p className="text-sm text-[#d8c3a5]">Je cultive et vends du mil</p>
            </button>

            <button
              onClick={() => handleRoleSelection('client')}
              className="w-full bg-[#d8c3a5] hover:bg-[#c9b395] text-[#7a4e2d] rounded-xl p-6 text-left transition-colors"
            >
              <h3 className="font-bold text-lg mb-1">Client</h3>
              <p className="text-sm text-[#7a4e2d]/70">J'achète des produits à base de mil</p>
            </button>

            <button
              onClick={() => handleRoleSelection('transformateur')}
              className="w-full bg-[#a67c52] hover:bg-[#8b5e34] text-white rounded-xl p-6 text-left transition-colors"
            >
              <h3 className="font-bold text-lg mb-1">Transformateur</h3>
              <p className="text-sm text-[#d8c3a5]">Je transforme le mil en produits finis</p>
            </button>
          </div>

          <button
            onClick={() => setStep('register')}
            className="mt-6 text-[#7a4e2d] hover:underline w-full text-center"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  if (step === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7a4e2d] to-[#5a3a1f] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img src={logoImg} alt="DOUGOUP" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#7a4e2d]">Créer un compte</h2>
            <p className="text-gray-600 mt-2">Rejoignez la communauté DOUGOUP</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Nom complet</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none bg-[#faf8f5]"
                placeholder="Votre nom"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none bg-[#faf8f5]"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Téléphone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none bg-[#faf8f5]"
                placeholder="77 123 45 67"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none bg-[#faf8f5]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Continuer
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Déjà inscrit ?{' '}
            <button onClick={() => setStep('login')} className="text-[#7a4e2d] font-semibold hover:underline">
              Se connecter
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7a4e2d] to-[#5a3a1f] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoImg} alt="DOUGOUP" className="w-20 h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#7a4e2d]">DOUGOUP</h1>
          <p className="text-gray-600 mt-2">Plateforme de digitalisation de la filière du mil</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none bg-[#faf8f5]"
              placeholder="votre@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#7a4e2d] mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none bg-[#faf8f5]"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl transition-colors"
          >
            Se connecter
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Pas encore inscrit ?{' '}
          <button onClick={() => setStep('register')} className="text-[#7a4e2d] font-semibold hover:underline">
            Créer un compte
          </button>
        </p>
      </div>
    </div>
  );
}
