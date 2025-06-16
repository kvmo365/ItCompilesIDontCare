// Cart logic using localStorage
const CART_KEY = 'shoppingCart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
  alert(product.name + ' added to cart');
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

function updateQuantity(productId, qty) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = qty;
    if (item.quantity <= 0) removeFromCart(productId);
    else saveCart(cart);
  }
  renderCart();
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCart();
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <span>${item.name}</span>
      <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.id}', this.value)" />
      <span>R${(item.price * item.quantity).toFixed(2)}</span>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    container.appendChild(row);
    total += item.price * item.quantity;
  });
  totalEl.textContent = 'R' + total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('add-to-cart')) {
    document.getElementById('add-to-cart').addEventListener('click', () => {
      const product = {
        id: document.getElementById('product-id').value,
        name: document.getElementById('product-name').textContent,
        price: parseFloat(document.getElementById('product-price').textContent)
      };
      addToCart(product);
    });
  }
  if (document.getElementById('cart-items')) {
    renderCart();
  }
});