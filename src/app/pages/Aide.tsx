import { MessageCircle, Book, Phone, Mail, HelpCircle } from 'lucide-react';

export default function Aide() {
  const faqs = [
    {
      question: 'Comment ajouter une production ?',
      answer: 'Allez dans la section Production, cliquez sur "Nouvelle production" et remplissez le formulaire avec les détails de votre production.',
    },
    {
      question: 'Comment vendre mes produits sur le Marketplace ?',
      answer: 'Vos produits en stock sont automatiquement disponibles dans le Marketplace. Assurez-vous d\'avoir ajouté vos stocks dans la section correspondante.',
    },
    {
      question: 'Comment suivre mes commandes ?',
      answer: 'Rendez-vous dans la section Commandes pour voir toutes vos commandes avec leur statut en temps réel.',
    },
    {
      question: 'Comment contacter un vendeur ?',
      answer: 'Utilisez la section Messages pour communiquer directement avec les vendeurs et autres utilisateurs de la plateforme.',
    },
  ];

  const supportChannels = [
    {
      icon: Phone,
      title: 'Téléphone',
      description: '+221 77 123 45 67',
      action: 'Appeler',
      color: 'bg-green-500',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'support@dougoup.sn',
      action: 'Envoyer un email',
      color: 'bg-blue-500',
    },
    {
      icon: MessageCircle,
      title: 'Chat en direct',
      description: 'Disponible 24/7',
      action: 'Démarrer le chat',
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-2">Aide & Support</h1>
        <p className="text-gray-600">Trouvez des réponses à vos questions</p>
      </div>

      <div className="bg-gradient-to-r from-[#7a4e2d] to-[#5a3a1f] rounded-xl p-6 lg:p-8 text-white">
        <h2 className="text-xl font-bold mb-2">Besoin d'aide ?</h2>
        <p className="text-[#d8c3a5] mb-6">Notre équipe est là pour vous assister</p>
        <div className="grid md:grid-cols-3 gap-4">
          {supportChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div key={channel.title} className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors">
                <div className={`${channel.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold mb-1">{channel.title}</h3>
                <p className="text-sm text-[#d8c3a5] mb-3">{channel.description}</p>
                <button className="text-sm font-semibold hover:underline">{channel.action}</button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#7a4e2d] p-3 rounded-lg">
            <HelpCircle className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#7a4e2d]">Questions fréquentes</h2>
            <p className="text-sm text-gray-600">Trouvez rapidement des réponses</p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
              <h3 className="font-bold text-[#7a4e2d] mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#d8c3a5] p-3 rounded-lg">
            <Book className="text-[#7a4e2d]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#7a4e2d]">Ressources utiles</h2>
            <p className="text-sm text-gray-600">Guides et tutoriels</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button className="text-left p-4 bg-[#faf8f5] hover:bg-[#f0ebe4] rounded-xl transition-colors">
            <h3 className="font-bold text-[#7a4e2d] mb-1">Guide du producteur</h3>
            <p className="text-sm text-gray-600">Apprenez à gérer vos productions</p>
          </button>
          <button className="text-left p-4 bg-[#faf8f5] hover:bg-[#f0ebe4] rounded-xl transition-colors">
            <h3 className="font-bold text-[#7a4e2d] mb-1">Guide du marketplace</h3>
            <p className="text-sm text-gray-600">Vendez efficacement vos produits</p>
          </button>
          <button className="text-left p-4 bg-[#faf8f5] hover:bg-[#f0ebe4] rounded-xl transition-colors">
            <h3 className="font-bold text-[#7a4e2d] mb-1">Tutoriels vidéo</h3>
            <p className="text-sm text-gray-600">Apprenez en vidéo</p>
          </button>
          <button className="text-left p-4 bg-[#faf8f5] hover:bg-[#f0ebe4] rounded-xl transition-colors">
            <h3 className="font-bold text-[#7a4e2d] mb-1">Centre de documentation</h3>
            <p className="text-sm text-gray-600">Documentation complète</p>
          </button>
        </div>
      </div>
    </div>
  );
}
