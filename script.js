// ====================================
// HASSI SIGNATURE NOIR - MAIN JS
// ====================================

console.log('✅ Script Loaded!');
const products = [
    {
        id: 1,
        name: 'Royal Oud',
        price: 12000,
        category: 'Men',
        image: 'images/perfume1.jpg',  // 👈 Local image
        stock: 15
    },
    {
        id: 2,
        name: 'Golden Amber',
        price: 9500,
        category: 'Women',
        image: 'images/perfume2.jpg',  // 👈 Local image
        stock: 3
    },
    {
        id: 3,
        name: 'Black Musk',
        price: 14000,
        category: 'Unisex',
        image: 'images/perfume3.jpg',  // 👈 Local image
        stock: 0
    }
];


// ====================================
// CART
// ====================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// ====================================
// FORMAT PRICE
// ====================================
function formatPrice(price) {
    return Number(price).toLocaleString('en-PK');
}

// ====================================
// DISPLAY PRODUCTS
// ====================================
function displayProducts(productsArray) {
    const container = document.getElementById('products-container');
    if (!container) {
        console.error('❌ products-container not found!');
        return;
    }

    if (productsArray.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:60px; grid-column:1/-1;"><h3>No Products Found</h3></div>`;
        return;
    }

    container.innerHTML = '';
    productsArray.forEach(product => {
        const stock = product.stock || 0;
        let stockHTML = stock > 0 ? '✓ In Stock' : '✗ Out of Stock';
        let stockColor = stock > 0 ? '#28a745' : '#ff4444';

        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/200/1a1a1a/d4af37?text=${product.name}'">
                <h3>${product.name}</h3>
                <p class="price">Rs. ${formatPrice(product.price)}</p>
                <p style="color:${stockColor}; font-size:13px;">${stockHTML}</p>
                ${stock > 0 ? `
                    <button class="product-btn" onclick="addToCart(${product.id})">
                        <i class="fa-solid fa-cart-plus"></i> Add to Cart
                    </button>
                ` : `
                    <button class="product-btn" style="background:#555; cursor:not-allowed;" disabled>
                        <i class="fa-solid fa-xmark"></i> Out of Stock
                    </button>
                `}
            </div>
        `;
    });
}

// ====================================
// LOAD PRODUCTS
// ====================================
function loadProducts() {
    displayProducts(products);
}

// ====================================
// ADD TO CART
// ====================================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    if (product.stock <= 0) {
        alert('❌ Out of stock!');
        return;
    }
    cart.push({ ...product });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    alert(`✅ ${product.name} added to cart!`);
}

// ====================================
// REMOVE FROM CART
// ====================================
function removeFromCart(index) {
    const removed = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    alert(`❌ ${removed.name} removed`);
}

// ====================================
// UPDATE CART UI
// ====================================
function updateCartUI() {
    const items = document.getElementById('cart-items');
    const total = document.getElementById('cart-total');
    const count = document.getElementById('cart-count');

    if (!items) return;

    let totalPrice = 0;
    if (cart.length === 0) {
        items.innerHTML = `<p style="color:#888; text-align:center; padding:40px 0;">Your cart is empty.</p>`;
    } else {
        items.innerHTML = '';
        cart.forEach((item, index) => {
            totalPrice += item.price;
            items.innerHTML += `
                <div style="display:flex; align-items:center; gap:15px; padding:12px 0; border-bottom:1px solid #333;">
                    <img src="${item.image || 'https://via.placeholder.com/60'}" style="width:60px; height:60px; object-fit:cover; border-radius:10px;">
                    <div style="flex:1;">
                        <h4 style="font-size:14px;">${item.name}</h4>
                        <p style="color:#d4af37; font-weight:600;">Rs. ${formatPrice(item.price)}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:transparent; border:none; color:#ff4444; font-size:18px; cursor:pointer;">
                        <i class="fa-regular fa-trash-can"></i>
                    </button>
                </div>
            `;
        });
    }
    if (total) total.textContent = formatPrice(totalPrice);
    if (count) count.textContent = cart.length;
}

// ====================================
// FILTER PRODUCTS
// ====================================
function filterProducts(category) {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
}

// ====================================
// SEARCH
// ====================================
document.getElementById('search-input')?.addEventListener('input', function () {
    const value = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(value));
    displayProducts(filtered);
});

// ====================================
// CART TOGGLE
// ====================================
document.getElementById('cart-icon')?.addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('cart-sidebar')?.classList.add('active');
});

document.getElementById('close-cart')?.addEventListener('click', function () {
    document.getElementById('cart-sidebar')?.classList.remove('active');
});

// ====================================
// NEWSLETTER
// ====================================
document.getElementById('newsletterForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('✅ Thank you for subscribing!');
    this.reset();
});

// ====================================
// MOBILE MENU
// ====================================
document.getElementById('menuBtn')?.addEventListener('click', function () {
    document.getElementById('navMenu')?.classList.toggle('active');
});

// ====================================
// LOADER
// ====================================
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function () {
            loader.classList.add('hide');
        }, 500);
    }
    loadProducts();
    updateCartUI();
    console.log('✅ HASSI Signature Noir Ready!');
});

// ====================================
// MAKE FUNCTIONS GLOBAL
// ====================================
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.filterProducts = filterProducts;
window.updateCartUI = updateCartUI;

console.log(`📦 ${products.length} products loaded`);
console.log(`🛒 ${cart.length} cart items`);
