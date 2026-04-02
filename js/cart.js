/**
 * Inaura Jewelry - Shopping Cart
 * Handles cart state, localStorage persistence, and UI updates
 */

class Cart {
    constructor() {
        this.items = [];
        this.shipping = 5.00; // Flat rate shipping
        this.load();
        this.bindEvents();
        this.updateCartCount();
    }

    // Load cart from localStorage
    load() {
        const saved = localStorage.getItem('inaura-cart');
        if (saved) {
            try {
                this.items = JSON.parse(saved);
            } catch (e) {
                this.items = [];
            }
        }
    }

    // Save cart to localStorage
    save() {
        localStorage.setItem('inaura-cart', JSON.stringify(this.items));
        this.updateCartCount();
    }

    // Add item to cart
    add(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                etsyUrl: product.etsyUrl,
                quantity: 1
            });
        }
        this.save();
        this.showNotification(`${product.name} added to cart`);
        this.openDrawer();
    }

    // Remove item from cart
    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.renderDrawer();
    }

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.remove(productId);
            } else {
                item.quantity = quantity;
                this.save();
                this.renderDrawer();
            }
        }
    }

    // Get cart subtotal
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Get total item count
    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Get cart total (subtotal + shipping)
    getTotal() {
        const subtotal = this.getSubtotal();
        return subtotal > 0 ? subtotal + this.shipping : 0;
    }

    // Clear cart
    clear() {
        this.items = [];
        this.save();
        this.renderDrawer();
    }

    // Update cart count badge in nav
    updateCartCount() {
        const badge = document.querySelector('.cart-count');
        const count = this.getItemCount();
        if (badge) {
            badge.textContent = count;
        }
    }

    // Show notification toast
    showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.cart-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Open cart drawer
    openDrawer() {
        const drawer = document.querySelector('.cart-drawer');
        const overlay = document.querySelector('.cart-overlay');
        if (drawer && overlay) {
            this.renderDrawer();
            drawer.classList.add('open');
            overlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    // Close cart drawer
    closeDrawer() {
        const drawer = document.querySelector('.cart-drawer');
        const overlay = document.querySelector('.cart-overlay');
        if (drawer && overlay) {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // Render cart drawer contents
    renderDrawer() {
        const container = document.querySelector('.cart-items');
        const subtotalEl = document.querySelector('.cart-subtotal-amount');
        const shippingEl = document.querySelector('.cart-shipping-amount');
        const totalEl = document.querySelector('.cart-total-amount');
        const emptyMessage = document.querySelector('.cart-empty');
        const cartContent = document.querySelector('.cart-content');
        const checkoutBtn = document.querySelector('.cart-checkout-btn');

        if (!container) return;

        if (this.items.length === 0) {
            if (emptyMessage) emptyMessage.style.display = 'block';
            if (cartContent) cartContent.style.display = 'none';
            return;
        }

        if (emptyMessage) emptyMessage.style.display = 'none';
        if (cartContent) cartContent.style.display = 'block';

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="qty-btn qty-minus" data-id="${item.id}">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn qty-plus" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">&times;</button>
            </div>
        `).join('');

        // Update totals
        const subtotal = this.getSubtotal();
        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = `$${this.shipping.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${this.getTotal().toFixed(2)}`;

        // Bind quantity and remove buttons
        this.bindCartItemEvents();
        this.updateCartCount();
    }

    // Bind events for cart item buttons
    bindCartItemEvents() {
        // Quantity minus
        document.querySelectorAll('.qty-minus').forEach(btn => {
            btn.onclick = (e) => {
                const id = e.target.dataset.id;
                const item = this.items.find(i => i.id === id);
                if (item) this.updateQuantity(id, item.quantity - 1);
            };
        });

        // Quantity plus
        document.querySelectorAll('.qty-plus').forEach(btn => {
            btn.onclick = (e) => {
                const id = e.target.dataset.id;
                const item = this.items.find(i => i.id === id);
                if (item) this.updateQuantity(id, item.quantity + 1);
            };
        });

        // Remove item
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.onclick = (e) => {
                const id = e.target.dataset.id;
                this.remove(id);
            };
        });
    }

    // Bind global events
    bindEvents() {
        // Cart icon click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-cart')) {
                e.preventDefault();
                this.openDrawer();
            }
        });

        // Close drawer
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cart-close') || e.target.closest('.cart-overlay')) {
                this.closeDrawer();
            }
        });

        // Add to cart buttons
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-to-cart');
            if (btn) {
                e.preventDefault();
                const product = {
                    id: btn.dataset.id,
                    name: btn.dataset.name,
                    price: parseFloat(btn.dataset.price),
                    image: btn.dataset.image,
                    etsyUrl: btn.dataset.etsy
                };
                this.add(product);
            }
        });

        // Escape key closes drawer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDrawer();
            }
        });
    }
}

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});
