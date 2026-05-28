# BAG_WEBSITE
# HUIT Bag Shop Website

**HUIT Bag Shop** is a modern, responsive e-commerce website for selling fashion handbags. The project is built with HTML, CSS, Bootstrap, and vanilla JavaScript. It provides a complete front-end shopping experience, including product browsing, product details, cart management, checkout simulation, customer login, admin dashboard, wishlist, customer reviews, and an AI-powered chatbot using Gemini API.

The brand concept of the website is:

> **“Pure Beauty Beyond Time”**
> Vietnamese: **“Vẻ Đẹp Thuần Khiết Vượt Thời Gian”**

The main visual identity uses a clean aqua-blue color palette with the primary color:

```text
#99FFFF
```

---

## 1. Project Overview

This project is designed as a front-end e-commerce website for a handbag store named **HUIT**. It focuses on a clean user interface, smooth user experience, consistent page navigation, and practical shopping features.

The system does not use a real backend server or database. Instead, it uses `localStorage` to simulate user accounts, products, cart data, orders, wishlist, and admin data.

---

## 2. Main Technologies

| Technology      | Purpose                             |
| --------------- | ----------------------------------- |
| HTML5           | Page structure                      |
| CSS3            | Custom styling and layout           |
| Bootstrap 5     | Responsive layout and UI components |
| Bootstrap Icons | Icons                               |
| JavaScript      | Website logic and interactivity     |
| LocalStorage    | Simulated database                  |
| Gemini API      | AI chatbot integration              |

---

## 3. Main Features

### Customer Features

* View homepage with hero section and featured products
* Browse all handbag products
* Filter products by category
* Sort products by price/name
* Search products
* View product detail page
* Select product size, color, and add-ons
* Add products to cart
* Update product quantity in cart
* Remove products from cart
* Apply discount codes
* Checkout simulation
* Save order information
* Add products to wishlist
* Login as customer
* Register new customer account
* View news/blog pages
* Read FAQ, policy, about, and contact pages
* Use chatbot for product consultation

### Admin Features

* Login as admin
* Access admin dashboard
* View product statistics
* Manage products
* Add new products
* Edit existing products
* Delete products
* View and manage orders
* Update order status
* View revenue summary
* Admin menu is only visible for admin accounts

### Chatbot Features

* Integrated chatbot UI
* Gemini API support
* Offline fallback consultation when Gemini is unavailable
* Friendly error handling for quota or API issues
* Product recommendation support
* Long-form answers when needed
* Short answers when the user asks for summary or short response
* Product suggestion cards

---

## 4. Demo Accounts

### Admin Account

```text
Email: admin@huit.vn
Password: admin123
Role: Admin
```

### Customer Account

```text
Email: khach@huit.vn
Password: khach123
Role: Customer
```

When logging in as a customer, the **Admin** menu will be hidden.
When logging in as an admin, the **Admin** menu will be displayed.

---

## 5. Project Structure

```text
TRANG_WEB_TUI_XACH/
│
├── index.html
├── products.html
├── product-detail.html
├── cart.html
├── checkout.html
├── login.html
├── register.html
├── admin.html
├── wishlist.html
├── news.html
├── about.html
├── contact.html
├── faq.html
├── policy.html
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── blue-theme.css
│   │
│   └── js/
│       ├── data.js
│       ├── helpers.js
│       ├── main.js
│       ├── products.js
│       ├── detail.js
│       ├── cart.js
│       ├── checkout.js
│       ├── login.js
│       ├── register.js
│       ├── admin.js
│       ├── wishlist.js
│       ├── news.js
│       ├── reviews.js
│       ├── contact.js
│       ├── chatbot.js
│       ├── gemini-config.js
│       └── zoom.js
│
├── .gitignore
└── README.md
```

---

## 6. Page Description

### `index.html`

The homepage introduces the HUIT brand, hero banner, featured products, customer reviews, and main shopping sections.

### `products.html`

Displays all handbag products. Users can filter, search, and sort products.

### `product-detail.html`

Shows detailed product information, image gallery, product options, add-ons, quantity selection, and add-to-cart action.

### `cart.html`

Displays products added to the shopping cart. Users can update quantities, remove items, and proceed to checkout.

### `checkout.html`

Simulates the checkout process. Users can enter delivery information and create an order.

### `login.html`

Allows customers and admins to log in. The login design is customized for the HUIT brand.

### `register.html`

Allows new customers to create an account.

### `admin.html`

Admin dashboard for product management, order management, and revenue statistics.

### `wishlist.html`

Displays products that users have added to their wishlist.

### `news.html`

Displays fashion news and blog content.

### `about.html`

Introduces the HUIT brand story and design concept.

### `contact.html`

Provides contact form and store information.

### `faq.html`

Displays frequently asked questions.

### `policy.html`

Displays store policies such as shipping, return, warranty, and privacy policy.

---

## 7. How to Run the Project Locally

Because this project is a static website, it can be opened directly in a browser. However, running it through a local server is recommended for better compatibility.

### Option 1: Open Directly

Open the file:

```text
index.html
```

in your browser.

### Option 2: Run with Python Local Server

Open Terminal in the project folder and run:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://127.0.0.1:8080/index.html
```

---

## 8. Gemini Chatbot Setup

The chatbot supports Gemini API integration.

Open this file:

```text
assets/js/gemini-config.js
```

Then configure your API key:

```javascript
window.HUIT_GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
window.HUIT_GEMINI_MODEL = "gemini-2.5-flash";
window.HUIT_GEMINI_MAX_OUTPUT_TOKENS = 1400;
```

### Important Security Note

Do not upload your real Gemini API key to a public GitHub repository.

Before publishing the project, change the key to:

```javascript
window.HUIT_GEMINI_API_KEY = "";
```

or:

```javascript
window.HUIT_GEMINI_API_KEY = "PASTE_YOUR_API_KEY_HERE";
```

Because this is a front-end-only project, any API key stored in JavaScript can be viewed from the browser DevTools.

For production, the Gemini API key should be stored in a backend server, not directly in front-end code.

---

## 9. LocalStorage Data

This project uses browser `localStorage` to simulate a database.

The system may store data such as:

```text
users
currentUser
cart
wishlist
orders
products
```

To reset the project data, open browser DevTools and clear the localStorage of the website.

In Chrome or Safari:

```text
Developer Tools → Application/Storage → LocalStorage → Clear
```

Then refresh the page.

---

## 10. Main User Flow

### Shopping Flow

```text
Homepage
→ Products
→ Product Detail
→ Add to Cart
→ Cart
→ Checkout
→ Order Created
```

### Customer Flow

```text
Register/Login
→ Browse Products
→ Add to Wishlist
→ Add to Cart
→ Checkout
```

### Admin Flow

```text
Login as Admin
→ Admin Dashboard
→ Manage Products
→ Manage Orders
→ View Statistics
```

### Chatbot Flow

```text
User opens chatbot
→ User asks for advice
→ Gemini API responds
→ If Gemini is unavailable, offline recommendation is used
```

---

## 11. Design Concept

The website follows a clean, elegant, and timeless fashion style.

### Brand Name

```text
HUIT
```

### Main Slogan

```text
Pure Beauty Beyond Time
```

### Primary Color

```text
#99FFFF
```

### Design Direction

* Clean and elegant layout
* Aqua-blue theme
* Soft gradient from deep blue to light cyan
* Modern product cards
* Clear navigation menu
* Responsive layout
* Friendly shopping experience
* Luxury handbag brand feeling

---

## 12. Responsive Design

The website is designed to work on different screen sizes:

* Desktop
* Laptop
* Tablet
* Mobile

Bootstrap and custom responsive CSS are used to improve layout flexibility.

---

## 13. Current Limitations

This project is currently a front-end simulation. Some limitations include:

* No real backend server
* No real database
* No real payment gateway
* No real email sending system
* Login is simulated using localStorage
* Admin authentication is not secure for production
* Gemini API key should not be stored in front-end code for real deployment

---

## 14. Suggested Future Improvements

The project can be improved further by adding:

* Backend using Node.js, PHP, Java Spring Boot, or ASP.NET
* Real database such as MySQL, SQL Server, or MongoDB
* Secure authentication system
* Password hashing
* Product image upload
* Real order management
* Payment integration
* Email confirmation
* Admin role management
* Search engine optimization
* Product review system with real user accounts
* Deployment with secure environment variables

---

## 15. GitHub Deployment

This project can be deployed using GitHub Pages.

### Step 1: Push Project to GitHub

```bash
git init
git add .
git commit -m "Initial commit HUIT bag shop website"
git branch -M main
git remote add origin https://github.com/your-username/your-repository.git
git push -u origin main
```

### Step 2: Enable GitHub Pages

Go to:

```text
Repository → Settings → Pages
```

Choose:

```text
Source: Deploy from a branch
Branch: main
Folder: /root
```

Then save.

After deployment, the website will be available at:

```text
https://your-username.github.io/your-repository/
```

---

## 16. Notes Before Publishing

Before uploading to GitHub, make sure to check for exposed API keys:

```bash
grep -R "AIza" .
```

If the command returns a Gemini API key, remove it before pushing the project.

Also make sure the repository root contains:

```text
index.html
assets/
products.html
cart.html
checkout.html
```

This ensures GitHub Pages can open the website correctly.

---

## 17. Author

Developed by:

```text
Nhan Nguyen
```

Project type:

```text
Front-end e-commerce website
```

Brand:

```text
HUIT Bag Shop
```

---

## 18. License

This project is created for learning, practice, and academic demonstration purposes.

You may customize, improve, and expand the project based on your study or presentation requirements.
