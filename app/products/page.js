'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Ambil data produk dari API
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const updatedProducts = data.map((product) => ({
          ...product,
          quota: 10, // Set initial quota for each product
        }));
        setProducts(updatedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    }

    // Cek apakah ada data cart di localStorage dan set ke state cart
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    fetchProducts();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (product) => {
    if (product.quota === 0) return; // Prevent adding if out of stock

    // Update the cart and quota state
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        updatedCart[productIndex].quantity += 1; // Increase quantity if product is already in cart
      } else {
        updatedCart.push({ ...product, quantity: 1 }); // Add product if it's not in the cart
      }

      // Save the updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });

    // Update the quota
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const productIndex = updatedProducts.findIndex((item) => item.id === product.id);
      if (productIndex !== -1) {
        updatedProducts[productIndex].quota -= 1; // Decrease quota for the added product
      }
      return updatedProducts;
    });
  };

  // Handle Remove Item from Cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
      return updatedCart;
    });

    // Restore quota for removed item
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      const productIndex = updatedProducts.findIndex((item) => item.id === productId);
      if (productIndex !== -1) {
        updatedProducts[productIndex].quota += 1; // Restore quota for removed product
      }
      return updatedProducts;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-700">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-4"
                />
                <h3 className="text-xl font-semibold truncate">{product.title}</h3>
                <p className="text-lg text-gray-800 mt-2">Price: ${product.price}</p>
                <p className="text-sm text-gray-500 mt-2">Stock: {product.quota}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.quota === 0}
                  className={`mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${product.quota === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {product.quota === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Icon in the bottom-right */}
      <Link href="/cart">
        <div className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition">
          <span className="text-xl">{cart.length} items</span>
        </div>
      </Link>
    </div>
  );
}
