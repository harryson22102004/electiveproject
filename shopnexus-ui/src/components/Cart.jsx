import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = ({ isOpen, onClose, items = [] }) => {
  const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-primary-600" />
                <h2 className="text-xl font-bold">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p className="font-medium">Your cart is empty</p>
                  <button onClick={onClose} className="text-primary-600 font-bold mt-2">Start Shopping</button>
                </div>
              ) : (
                items.map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <img
                      src={item.imageUrl || '/images/product-placeholder.svg'}
                      alt={item.name}
                      onError={(e) => { e.currentTarget.src = '/images/product-placeholder.svg'; }}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{item.name}</h4>
                      <p className="text-slate-500 text-sm">{item.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary-600">${item.price}</span>
                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold">-</button>
                          <span>{item.quantity || 1}</span>
                          <button className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-slate-50 space-y-4">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-black text-primary-600">${total.toFixed(2)}</span>
              </div>
              <button className="w-full btn-primary py-4 text-lg mt-2 font-bold shadow-primary-200">
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
