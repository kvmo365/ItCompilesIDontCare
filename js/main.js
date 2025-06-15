
fetch('data/products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(products => {
    displayProducts(products);
  })
  .catch(error => {
    console.error('Error loading products:', error);
  });

function displayProducts(products) {
  const container = document.getElementById('product-container');
  if (!products || !Array.isArray(products)) {
    console.error("Invalid products format");
    return;
  }
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <p>Price: $${product.price}</p>
    `;
    container.appendChild(productDiv);
  });
}
