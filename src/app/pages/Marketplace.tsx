import { useState } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router';
import productImg from '../../imports/Gemini_Generated_Image_vkr8v1vkr8v1vkr8.png';

export default function Marketplace() {
  const { products, addOrder } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const navigate = useNavigate();

  const categories = ['Tous', 'Céréales', 'Farine', 'Transformé'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBuy = (product: any) => {
    addOrder({
      product: product.name,
      quantity: 1,
      total: product.price,
      status: 'en_attente',
      date: new Date().toISOString().split('T')[0],
      customer: 'Vous',
    });
    alert(`${product.name} ajouté aux commandes !`);
    navigate('/commandes');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#7a4e2d] mb-2">Marketplace</h1>
        <p className="text-gray-600">Découvrez et achetez des produits à base de mil</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-[#d8c3a5] focus:border-[#7a4e2d] outline-none"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[#7a4e2d] text-white'
                  : 'bg-white text-[#7a4e2d] hover:bg-[#d8c3a5]/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-48 bg-gradient-to-br from-[#7a4e2d] to-[#5a3a1f] flex items-center justify-center">
              <img src={productImg} alt={product.name} className="w-full h-full object-cover opacity-60" />
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-[#7a4e2d]">{product.name}</h3>
                <span className="bg-[#d8c3a5] text-[#7a4e2d] text-xs font-semibold px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4">{product.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Prix</span>
                  <span className="font-bold text-[#7a4e2d]">{product.price} FCFA/{product.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Vendeur</span>
                  <span className="font-semibold">{product.seller}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock</span>
                  <span className={`font-semibold ${product.stock < 100 ? 'text-red-600' : 'text-green-600'}`}>
                    {product.stock} {product.unit}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleBuy(product)}
                className="w-full bg-[#7a4e2d] hover:bg-[#5a3a1f] text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <ShoppingCart size={20} />
                <span>Acheter</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Aucun produit trouvé</p>
        </div>
      )}
    </div>
  );
}
