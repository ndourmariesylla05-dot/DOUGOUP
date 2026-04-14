import { Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useState } from 'react';

export default function Messages() {
  const { messages, markMessageAsRead } = useApp();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSelectMessage = (id: string) => {
    setSelectedMessage(id);
    markMessageAsRead(id);
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message envoyé !');
    setReplyText('');
  };

  const selected = messages.find(m => m.id === selectedMessage);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-2">Messages</h1>
        <p className="text-gray-600">Communiquez avec les producteurs et clients</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <h3 className="font-semibold text-[#7a4e2d] mb-3">Conversations</h3>
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => handleSelectMessage(message.id)}
              className={`w-full text-left p-4 rounded-xl transition-colors ${
                selectedMessage === message.id
                  ? 'bg-[#7a4e2d] text-white'
                  : 'bg-white hover:bg-[#faf8f5]'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold">{message.sender}</p>
                {!message.read && selectedMessage !== message.id && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </div>
              <p className={`text-sm line-clamp-2 ${
                selectedMessage === message.id ? 'text-[#d8c3a5]' : 'text-gray-600'
              }`}>
                {message.content}
              </p>
              <p className={`text-xs mt-1 ${
                selectedMessage === message.id ? 'text-[#d8c3a5]' : 'text-gray-500'
              }`}>
                {message.date}
              </p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          {selected ? (
            <div className="flex flex-col h-[600px]">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-[#7a4e2d]">{selected.sender}</h3>
                <p className="text-sm text-gray-600">{selected.date}</p>
              </div>

              <div className="flex-1 p-6 overflow-y-auto">
                <div className="bg-[#faf8f5] rounded-xl p-4">
                  <p className="text-[#7a4e2d]">{selected.content}</p>
                </div>
              </div>

              <form onSubmit={handleSendReply} className="p-6 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Écrire une réponse..."
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white p-3 rounded-xl transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="h-[600px] flex items-center justify-center text-gray-400">
              <div className="text-center">
                <p className="text-lg mb-2">Sélectionnez une conversation</p>
                <p className="text-sm">Choisissez un message pour commencer</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
