# Inaura Jewelry Website

A clean, minimalist storefront that links to your Etsy shop.

## Quick Start

1. Open `index.html` in your browser to preview the site
2. Add your content (see below)
3. Deploy to Netlify (free)

---

## Adding Your Content

### 1. Add Your Logo

Place your logo file in the `images/` folder, then edit `index.html`:

Find this line (around line 21):
```html
<span class="logo-text">Inaura</span>
```

Replace with:
```html
<img src="images/your-logo.png" alt="Inaura Jewelry">
```

### 2. Add Product Images

1. Save your product photos in the `images/` folder
2. Name them consistently: `product-1.jpg`, `product-2.jpg`, etc.
3. **Recommended:** Square images (1:1 ratio), at least 600x600px

### 3. Update Products

Each product in `index.html` looks like this:

```html
<article class="product-card">
    <a href="https://inaurajewelry.etsy.com/listing/YOUR-LISTING-ID" target="_blank" rel="noopener" class="product-link">
        <div class="product-image">
            <img src="images/product-1.jpg" alt="Product Name" loading="lazy">
        </div>
        <div class="product-info">
            <h3 class="product-name">Pearl Drop Earrings</h3>
            <p class="product-price">$45</p>
            <span class="product-cta">Shop on Etsy</span>
        </div>
    </a>
</article>
```

**To update a product:**
1. Replace `YOUR-LISTING-ID` with your actual Etsy listing ID
   - Example: `https://www.etsy.com/listing/1234567890/pearl-drop-earrings`
2. Update the image `src` to match your image filename
3. Update the product name, price, and alt text

**To add more products:**
- Copy the entire `<article class="product-card">...</article>` block
- Paste it below the last product
- Update the details

**To remove a product:**
- Delete the entire `<article class="product-card">...</article>` block

### 4. Update About Section

Find this section in `index.html` (around line 35) and add your brand story:

```html
<p class="about-text">
    Your brand story here...
</p>
```

### 5. Update Footer Links

Find the footer section and update:
- Instagram URL: Replace `YOUR-HANDLE` with your Instagram username
- Email: Replace `your@email.com` with your contact email

---

## Finding Your Etsy Listing IDs

1. Go to your Etsy shop
2. Click on a product listing
3. Copy the URL - it looks like: `https://www.etsy.com/listing/1234567890/product-name`
4. Use the full URL in the product link

---

## Deploying to Netlify (Free)

### Option A: Drag & Drop (Easiest)

1. Go to [netlify.com](https://www.netlify.com) and sign up (free)
2. From your dashboard, drag the entire `inaura-jewelry` folder onto the page
3. Done! Your site is live at a random URL like `random-name-123.netlify.app`

### Option B: Connect Custom Domain

After deploying:

1. In Netlify dashboard, go to **Site settings** > **Domain management**
2. Click **Add custom domain**
3. Enter your domain (e.g., `inaurajewelry.com`)
4. Follow Netlify's instructions to update your domain's DNS settings
5. Netlify provides free HTTPS automatically

---

## Customization Tips

### Change Colors

Edit `styles.css` - the colors are defined at the top:

```css
:root {
    --bg-primary: #0d0d0d;      /* Main background */
    --bg-secondary: #141414;     /* Section backgrounds */
    --text-primary: #f5f5f5;     /* Main text */
    --text-secondary: #a0a0a0;   /* Subtle text */
    --accent: #c0c0c0;           /* Silver accent */
}
```

### Add a Hero Background Image

1. Add a large image to `images/` folder (e.g., `hero-bg.jpg`)
2. In `styles.css`, find the `.hero` section and uncomment these lines:

```css
.hero {
    /* Uncomment these: */
    background-image: url('images/hero-bg.jpg');
    background-size: cover;
    background-position: center;
}
```

### Adjust the Grain Texture

In `styles.css`, find `.grain` and adjust `opacity`:
- More visible: `opacity: 0.08;`
- More subtle: `opacity: 0.02;`
- Remove entirely: `opacity: 0;`

---

## File Structure

```
inaura-jewelry/
├── index.html      # Your website (edit this)
├── styles.css      # Styling (customize colors here)
├── images/         # Put all images here
│   ├── logo.png
│   ├── product-1.jpg
│   ├── product-2.jpg
│   └── ...
└── README.md       # This file
```

---

## Need Help?

- **Etsy Links Not Working?** Make sure you're using the full URL including `https://`
- **Images Not Showing?** Check that filenames match exactly (including .jpg vs .png)
- **Site Looks Broken?** Make sure `styles.css` is in the same folder as `index.html`
