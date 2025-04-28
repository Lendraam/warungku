'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  // Mendapatkan data keranjang dari localStorage jika ada
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedItems);
  }, []);

  const handleQuantityChange = (index, quantity) => {
    // Ensure the quantity is within range (1 - item.stock)
    if (quantity < 1) quantity = 1;
    if (quantity > cartItems[index].stock) quantity = cartItems[index].stock;

    // Update quantity produk
    const updatedItems = [...cartItems];
    updatedItems[index].quantity = quantity;
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));  // Simpan perubahan ke localStorage
  };

  const handleRemoveItem = (index) => {
    // Hapus produk dari keranjang
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));  // Simpan perubahan ke localStorage
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment = () => {
    // Simulasi proses pembayaran
    setPaymentSuccessful(true);
    localStorage.removeItem('cart'); // Kosongkan keranjang setelah pembayaran
    setCartItems([]); // Clear the cart in the UI
  };

  const handleAddToCart = (newItem) => {
    // Check if item already exists in the cart
    const existingItemIndex = cartItems.findIndex(item => item.id === newItem.id);

    if (existingItemIndex !== -1) {
      // Item exists, update the quantity
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += newItem.quantity; // Add quantity if item already in cart
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems)); // Save to localStorage
    } else {
      // Item doesn't exist, add new item to cart
      const updatedItems = [...cartItems, newItem];
      setCartItems(updatedItems);
      localStorage.setItem('cart', JSON.stringify(updatedItems)); // Save to localStorage
    }
  };

  return (
    <section className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>

      {paymentSuccessful ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
          <p className="text-lg">Thank you for shopping. Your order is being processed.</p>
          <Link href="/products">
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Back to Product Catalog
            </button>
          </Link>
        </div>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-300 rounded-lg">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover mb-4 sm:mb-0" />
                  <div className="flex-1 sm:ml-4">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(index, item.quantity - 1)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md text-lg"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        max={item.stock}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                        className="w-16 text-center border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => handleQuantityChange(index, item.quantity + 1)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-600 hover:text-red-800 mt-4 sm:mt-0"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="flex justify-between mt-6">
                <h3 className="text-xl font-semibold">Total: ${calculateTotal().toFixed(2)}</h3>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handlePayment}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Pay Now
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
