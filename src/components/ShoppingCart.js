import React, { useState } from 'react';
import '../ShoppingCart.css';

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if(existingProductIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity >= 0) {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      <div className="products-section">
        <h3>Products</h3>
        <ul>
          <li>
            <button className="add-button mb-2" onClick={() => addToCart({ name: 'Product 1', price: 10, imageUrl: 'https://via.placeholder.com/150' })}>Add Product 1</button>
          </li>
          <li>
            <button className="add-button mb-2" onClick={() => addToCart({ name: 'Product 2', price: 15, imageUrl: 'https://via.placeholder.com/150' })}>Add Product 2</button>
          </li>
          <li>
            <button className="add-button mb-2" onClick={() => addToCart({ name: 'Product 3', price: 20, imageUrl: 'https://via.placeholder.com/150' })}>Add Product 3</button>
          </li>
        </ul>
      </div>
     
      <div className="cart-section">
        <h3>Cart</h3>
        <ul>
          {cart.map((product, index) => (
            <li key={index} className="cart-item">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <span>{product.name}</span> - Quantity:
              <input 
                type="number" 
                value={product.quantity} 
                onChange={(e) => updateQuantity(index, parseInt(e.target.value))} 
              />
              - Price: {product.price * product.quantity}
              <button className="remove-button mx-2" onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <p className="total-price">Total Price: {calculateTotalPrice()}</p>
      </div>
    </div>
  );
};

export default ShoppingCart;
