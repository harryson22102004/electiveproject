import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalItems, totalPrice, clearCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [message, setMessage] = useState('');

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setMessage('Cart is empty. Add products first.');
      return;
    }

    try {
      setPlacing(true);
      setMessage('');

      const payload = {
        // For project demo mode: using a known seeded user id.
        userId: 1,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      await createOrder(payload);
      clearCart();
      setMessage('Order placed successfully.');
      setTimeout(() => navigate('/'), 1000);
    } catch {
      setMessage('Could not place order. Ensure backend is running and try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar cartCount={totalItems} />

      <main className="max-w-4xl mx-auto px-6 pt-10">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-black mb-6">Checkout</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 mb-4">Your cart is empty.</p>
              <Link to="/" className="btn-primary">Go to Home</Link>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between bg-white rounded-xl px-4 py-3 border border-slate-100">
                    <span className="font-medium text-slate-700">{item.name} x {item.quantity}</span>
                    <span className="font-bold">${(Number(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4 mb-6">
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex justify-between text-slate-600 mb-1">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-xl font-black mt-3">
                  <span>Total</span>
                  <span className="text-primary-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {message && (
                <p className={`mb-4 font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}

              <div className="flex gap-3">
                <Link to="/cart" className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-white">
                  Back to Cart
                </Link>
                <button className="btn-primary" onClick={handlePlaceOrder} disabled={placing}>
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
