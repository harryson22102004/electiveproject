import { ShoppingCart, User, Search, Store } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  return (
    <nav className="sticky top-0 z-50 glass-card mx-4 mt-4 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-primary-600 p-2 rounded-xl">
          <Store className="text-white w-6 h-6" />
        </div>
        <span className="text-2xl font-bold gradient-text">ShopNexus</span>
      </Link>

      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full focus:ring-2 focus:ring-primary-500 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link to="/cart" className="relative cursor-pointer hover:text-primary-600 transition-colors">
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {cartCount || 0}
          </span>
        </Link>
        <div className="flex items-center gap-2 cursor-pointer bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-800 transition-all active:scale-95">
          <User className="w-5 h-5" />
          <span className="font-medium">Account</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
