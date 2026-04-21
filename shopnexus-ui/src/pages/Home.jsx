import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, totalItems } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Navbar cartCount={totalItems} />
      
      {/* Hero Section */}
      <section className="px-6 pt-12 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-600 px-4 py-2 rounded-full text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              <span>New Spring Collection 2024</span>
            </div>
            <h1 className="text-6xl font-black text-slate-900 leading-tight">
              Elevate Your <br />
              <span className="gradient-text">Lifestyle</span> Experience.
            </h1>
            <p className="text-lg text-slate-500 max-w-md">
              Discover a curated selection of premium products from top-tier vendors worldwide. Quality meets elegance.
            </p>
            <div className="flex gap-4">
              <button className="btn-primary flex items-center gap-2">
                Shop Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-6 py-2 border-2 border-slate-200 rounded-lg font-medium hover:bg-white transition-all">
                Learn More
              </button>
            </div>
            
            <div className="flex items-center gap-8 pt-8 border-t border-slate-200">
              <div>
                <span className="block text-2xl font-bold text-slate-900">12k+</span>
                <span className="text-sm text-slate-500 font-medium">Active Users</span>
              </div>
              <div className="w-px h-10 bg-slate-200"></div>
              <div>
                <span className="block text-2xl font-bold text-slate-900">500+</span>
                <span className="text-sm text-slate-500 font-medium">Premium Brands</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-slide-up">
            <div className="absolute inset-0 bg-primary-500/10 rounded-[3rem] blur-3xl -z-10 transform rotate-6"></div>
            <img 
              src="/images/hero-shopping.svg"
              alt="Hero" 
              className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Product Listing */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">Featured Products</h2>
            <p className="text-slate-500">Handpicked for your exceptional taste</p>
          </div>
          <button className="text-primary-600 font-bold hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="h-[450px] bg-white rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAdd={addToCart}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center glass-card">
                <p className="text-slate-500 font-medium">No products available at the moment.</p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
