// Product Data
const products = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 29.99,
        image: "images/logo.jpg",
        description: "Comfortable cotton t-shirt, perfect for everyday wear"
    },
    {
        id: 2,
        name: "Denim Jacket",
        price: 79.99,
        image: "images/product2.jpg",
        description: "Stylish denim jacket for all seasons"
    },
    {
        id: 3,
        name: "Black Jeans",
        price: 59.99,
        image: "images/product3.jpg",
        description: "Classic black jeans, slim fit"
    },
    {
        id: 4,
        name: "Running Shoes",
        price: 89.99,
        image: "images/product4.jpg",
        description: "Comfortable running shoes for active lifestyle"
    },
    {
        id: 5,
        name: "Summer Dress",
        price: 49.99,
        image: "images/product5.jpg",
        description: "Beautiful summer dress, perfect for warm weather"
    },
    {
        id: 6,
        name: "Leather Jacket",
        price: 149.99,
        image: "images/product6.jpg",
        description: "Premium leather jacket, timeless style"
    },
    {
        id: 7,
        name: "Sneakers",
        price: 69.99,
        image: "images/product7.jpg",
        description: "Casual sneakers for everyday comfort"
    },
    {
        id: 8,
        name: "Hoodie",
        price: 54.99,
        image: "images/product8.jpg",
        description: "Warm and cozy hoodie for cooler days"
    },
    {
        id: 9,
        name: "Formal Shirt",
        price: 44.99,
        image: "images/product9.jpg",
        description: "Elegant formal shirt for business occasions"
    },
    {
        id: 10,
        name: "Summer Shorts",
        price: 34.99,
        image: "images/product10.jpg",
        description: "Comfortable shorts for summer"
    },
    {
        id: 11,
        name: "Winter Coat",
        price: 129.99,
        image: "images/product11.jpg",
        description: "Warm winter coat to keep you cozy"
    },
    {
        id: 12,
        name: "Casual Sneakers",
        price: 64.99,
        image: "images/product12.jpg",
        description: "Stylish casual sneakers"
    },
    {
        id: 13,
        name: "Polo Shirt",
        price: 39.99,
        image: "images/product13.jpg",
        description: "Classic polo shirt for casual elegance"
    },
    {
        id: 14,
        name: "Skinny Jeans",
        price: 69.99,
        image: "images/product14.jpg",
        description: "Trendy skinny jeans in classic blue"
    },
    {
        id: 15,
        name: "Bomber Jacket",
        price: 89.99,
        image: "images/product15.jpg",
        description: "Modern bomber jacket with sleek design"
    },
    {
        id: 16,
        name: "High Heels",
        price: 79.99,
        image: "images/product16.jpg",
        description: "Elegant high heels for special occasions"
    },
    {
        id: 17,
        name: "Tank Top",
        price: 24.99,
        image: "images/product17.jpg",
        description: "Comfortable tank top for warm days"
    },
    {
        id: 18,
        name: "Blazer",
        price: 119.99,
        image: "images/product18.jpg",
        description: "Professional blazer for business attire"
    },
    {
        id: 19,
        name: "Athletic Leggings",
        price: 49.99,
        image: "images/product19.jpg",
        description: "Comfortable leggings for workouts and casual wear"
    },
    {
        id: 20,
        name: "Beanie",
        price: 19.99,
        image: "images/product20.jpg",
        description: "Warm beanie for cold weather"
    },
    {
        id: 21,
        name: "Cardigan",
        price: 64.99,
        image: "images/product21.jpg",
        description: "Cozy cardigan for layering"
    },
    {
        id: 22,
        name: "Sandals",
        price: 44.99,
        image: "images/product22.jpg",
        description: "Comfortable sandals for summer"
    }
];

// Cart State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    loadCart();
    updateCartUI();
});

// Render Products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='images/placeholder.jpg'; this.style.objectFit='cover';">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='images/placeholder.jpg'; this.style.objectFit='cover';">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Cart Sidebar Toggle
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Format order details for Telegram message
    let orderMessage = `🛍️ *New Order*\n\n`;
    orderMessage += `📋 *Order Details:*\n\n`;
    
    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. ${item.name}\n`;
        orderMessage += `   Quantity: ${item.quantity}\n`;
        orderMessage += `   Price: $${item.price.toFixed(2)} each\n`;
        orderMessage += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    orderMessage += `💰 *Total Amount: $${total.toFixed(2)}*\n\n`;
    orderMessage += `Thank you for your order!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(orderMessage);
    
    // Create Telegram link with order details
    const telegramLink = `https://t.me/BraxtorIDfakes?text=${encodedMessage}`;
    
    // Open Telegram in new tab/window
    window.open(telegramLink, '_blank');
    
    // Show confirmation
    showNotification('Redirecting to Telegram to complete your order...');
    
    // Clear cart after a short delay
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartUI();
        closeCartSidebar();
    }, 1000);
});

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? '#e74c3c' : '#27ae60'; // Error: red, Success: green
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            // Update active navigation state
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
            
            // Calculate offset for sticky header (approximately 80px)
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

