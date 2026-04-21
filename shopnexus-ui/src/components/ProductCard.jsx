import { Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const ProductCard = ({ product, onAdd }) => {
  const fallbackImage = '/images/product-placeholder.svg';
  const [imgSrc, setImgSrc] = useState(product.imageUrl || fallbackImage);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group ring-1 ring-slate-100"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imgSrc}
          alt={product.name}
          onError={() => setImgSrc(fallbackImage)}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary-600 shadow-sm">
          {product.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 text-yellow-400 mb-2">
          <Star className="w-4 h-4 fill-current" />
          <Star className="w-4 h-4 fill-current" />
          <Star className="w-4 h-4 fill-current" />
          <Star className="w-4 h-4 fill-current" />
          <Star className="w-4 h-4 text-slate-300 fill-current" />
          <span className="text-slate-400 text-xs ml-1">(4.0)</span>
        </div>
        
        <h3 className="text-lg font-bold text-slate-800 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">Price</span>
            <span className="text-2xl font-black text-slate-900">${product.price}</span>
          </div>
          
          <button 
            onClick={() => onAdd(product)}
            className="bg-primary-600 p-3 rounded-2xl text-white hover:bg-primary-700 transition-all active:scale-90 shadow-lg shadow-primary-200"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
