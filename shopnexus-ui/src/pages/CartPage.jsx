import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, totalItems, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Navbar cartCount={totalItems} />

      <main className="max-w-6xl mx-auto px-6 pt-10 grid lg:grid-cols-[1fr_360px] gap-8">
        <section className="glass-card p-6">
          <h1 className="text-3xl font-black mb-6">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-slate-500 mb-4">Your cart is empty.</p>
              <Link to="/" className="btn-primary">Continue Shopping</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-4 border border-slate-100 flex gap-4 items-center">
                  <img
                    src={item.imageUrl || '/images/product-placeholder.svg'}
                    alt={item.name}
                    onError={(e) => { e.currentTarget.src = '/images/product-placeholder.svg'; }}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800">{item.name}</h3>
                    <p className="text-slate-500 text-sm">{item.category}</p>
                    <p className="text-primary-600 font-bold mt-1">${Number(item.price).toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded-lg bg-slate-100 font-bold"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      className="w-8 h-8 rounded-lg bg-slate-100 font-bold"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="text-sm text-red-600 hover:underline"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="glass-card p-6 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-slate-600">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>
          <div className="border-t border-slate-200 my-4" />
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total</span>
            <span className="text-2xl font-black text-primary-600">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="btn-primary w-full"
            disabled={cartItems.length === 0}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </aside>
      </main>
    </div>
  );
};

export default CartPage;
