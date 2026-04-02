/**
 * Inaura Jewelry - Product Data
 * Modern industrial style - inspired by Justine Clenquet
 */

const products = [
    {
        id: "aurelia-necklace",
        name: "Aurelia Necklace",
        price: 68.00,
        image: "images/products/aurelia/necklace01.png",
        images: [
            "images/products/aurelia/necklace01.png",
            "images/products/aurelia/necklace02.png",
            "images/products/aurelia/model01.png"
        ],
        description: "Delicate freshwater pearl pendant on stainless steel chain. Waterproof, hypoallergenic, made to last.",
        etsyUrl: "https://www.etsy.com/shop/inaurajewelry"
    },
    {
        id: "luna-choker",
        name: "Luna Choker",
        price: 54.00,
        image: "images/products/luna choker/necklace01.jpg",
        images: [
            "images/products/luna choker/necklace01.jpg",
            "images/products/luna choker/necklace02.jpg",
            "images/products/luna choker/model01.jpg"
        ],
        description: "Celestial-inspired choker with crescent moon charm. Stainless steel, waterproof.",
        etsyUrl: "https://www.etsy.com/shop/inaurajewelry"
    },
    {
        id: "selene-earrings",
        name: "Selene Earrings",
        price: 42.00,
        image: "images/products/selene earrings/moon01.jpg",
        images: [
            "images/products/selene earrings/moon01.jpg",
            "images/products/selene earrings/moon02.jpg",
            "images/products/selene earrings/moon03.jpg"
        ],
        description: "Moon phase drop earrings in polished stainless steel. Lightweight, everyday elegance.",
        etsyUrl: "https://www.etsy.com/shop/inaurajewelry"
    },
    {
        id: "polaris-necklace",
        name: "Polaris Necklace",
        price: 58.00,
        image: "images/products/polaris/necklace01.jpg",
        images: [
            "images/products/polaris/necklace01.jpg",
            "images/products/polaris/necklace02.jpg",
            "images/products/polaris/model01.jpg"
        ],
        description: "North star pendant with genuine gemstone center. Your guiding light.",
        etsyUrl: "https://www.etsy.com/shop/inaurajewelry"
    },
    {
        id: "elara-necklace",
        name: "Elara Necklace",
        price: 62.00,
        image: "images/products/elara necklace/necklace01.jpg",
        images: [
            "images/products/elara necklace/necklace01.jpg",
            "images/products/elara necklace/necklace02.jpg",
            "images/products/elara necklace/model01.jpg"
        ],
        description: "Raw crystal pendant suspended on minimalist chain. One-of-a-kind natural beauty.",
        etsyUrl: "https://www.etsy.com/shop/inaurajewelry"
    },
    {
        id: "elara-earrings",
        name: "Elara Earrings",
        price: 45.00,
        image: "images/products/elara earrings/earrings01.jpg",
        images: [
            "images/products/elara earrings/earrings01.jpg",
            "images/products/elara earrings/earrings02.jpg",
            "images/products/elara earrings/model01.jpg"
        ],
        description: "Matching earrings to the Elara collection. Natural crystals, stainless steel.",
        etsyUrl: "https://www.etsy.com/shop/inaurajewelry"
    },
    {
        id: "aurora-choker",
        name: "Aurora Choker",
        price: 72.00,
        image: "images/products/aurora choker/necklace01.jpg",
        images: [
            "images/products/aurora choker/necklace01.jpg",
            "images/products/aurora choker/necklace02.jpg",
            "images/products/aurora choker/model01.jpg"
        ],
        description: "Iridescent aurora-inspired choker with opal accents. Statement piece.",
        etsyUrl: "https://www.etsy.com/shop/inaurajewelry"
    },
    {
        id: "black-star-necklace",
        name: "Black Star Necklace",
        price: 52.00,
        image: "images/products/black star/necklace01.jpg",
        images: [
            "images/products/black star/necklace01.jpg",
            "images/products/black star/necklace02.jpg",
            "images/products/black star/model01.jpg"
        ],
        description: "Dark celestial pendant with black onyx star. Industrial edge meets mysticism.",
        etsyUrl: "https://www.etsy.com/shop/inaurajewelry"
    }
];

/**
 * Render product grid - Industrial style with (+) buttons
 */
function renderProducts(containerId = 'product-grid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = products.map(product => `
        <article class="product-card" data-product-id="${product.id}">
            <div class="product-link">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-details">
                        <h3 class="product-name">${product.name}</h3>
                        <p class="product-price">$${product.price.toFixed(0)}</p>
                    </div>
                    <button class="add-to-cart"
                        data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.price}"
                        data-image="${product.image}"
                        data-etsy="${product.etsyUrl}"
                        aria-label="Add to cart">+</button>
                </div>
            </div>
        </article>
    `).join('');

    // Add click handlers for quick view
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking add to cart button
            if (e.target.classList.contains('add-to-cart')) return;

            const productId = card.dataset.productId;
            const product = products.find(p => p.id === productId);
            if (product && typeof openQuickView === 'function') {
                openQuickView(product);
            }
        });
    });
}

/**
 * Get product by ID
 */
function getProductById(id) {
    return products.find(p => p.id === id);
}

// Auto-render when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
