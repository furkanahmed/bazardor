# 🛒 BazarDor (বাজার দর) — Daily Commodity Price Tracker

A modern, responsive web application designed to track, compare, and analyze daily essential commodity prices across major wholesale and retail markets in Bangladesh.

---

## 🌐 Live URL & Repository

- **Live Application**: [https://live-bazardor.netlify.app/](https://live-bazardor.netlify.app/)
- **GitHub Repository**: [https://github.com/furkanahmed/bazardor](https://github.com/furkanahmed/bazardor)

---

## 📸 Preview Banner

<p align="center">
  <img src="public/bazar-hero.png" width="80%" alt="BazarDor Banner" />
</p>

---

## 📖 About The Project

**BazarDor (বাজার দর)** empowers consumers, researchers, and daily shoppers across Bangladesh with transparent, real-time market insights. It collects and displays daily wholesale and retail prices of essential grocery items—such as rice, lentils, oil, onions, vegetables, fish, and meat—across key urban centers including Karwan Bazar, Mirpur, and Sadar Bazar. 

With an intuitive Bengali-first user interface and authentic typography, users can easily monitor market fluctuations, compare prices across different locations, and make smarter purchasing decisions.

---

## 🛠️ Technologies Used

- **Framework:** [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Frontend Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography:** Google Fonts ([Hind Siliguri](https://fonts.google.com/specimen/Hind+Siliguri) for native Bengali rendering)
- **Authentication:** [BetterAuth](https://www.better-auth.com/) Client implementation with Protected Routes
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Data Source:** Live RESTful Market API (Programming Hero Open API)
- **Language:** JavaScript (ES6+)

---

## ✨ 5 Key Features

1. **⚡ Live Scrolling Price Ticker:**
   - An infinite animated marquee strip running right beneath the navigation bar showcasing real-time commodity prices along with percentage changes (▲/▼ %) for instant market awareness.

2. **📈 Dynamic Price Rise & Fall Trends (Market Movers):**
   - Dedicated algorithmic sections for *"আজ দাম বেড়েছে ▲"* (Top risers) and *"আজ দাম কমেছে ▼"* (Top fallers), helping buyers spot real-time price fluctuations at a single glance.

3. **🔍 Category Filtering & Bengali Numeral Sorting:**
   - Interactive category filtering across Rice, Lentils, Oil, Vegetables, Fish, Meat, Dairy, and Spices, paired with an intelligent dropdown sorting algorithm (Default, Low to High, High to Low) that accurately parses Bengali numerical digits.

4. **🔒 Protected Route & Multi-Market Product Details:**
   - Dynamic product routes (`/product/[slug]`) guarded by authentication. Shows statistical market breakdowns (Minimum, Maximum, Average prices) across different physical markets (Karwan Bazar, Mirpur-1, Mohammadpur, etc.).

5. **👤 User Profile & Information Management:**
   - Full user profile view (`/profile`) and edit functionality (`/profile/update`) allowing users to manage their display credentials, profile avatars, and preferences with real-time feedback.

---

## 💡 Challenges & Solutions

- **Bengali Numeral Sorting:** Built a custom parser (`toEnglishDigits`) to convert Bengali digits into standard numbers for accurate price sorting.
- **Next.js Hydration & Auth Guards:** Wrapped dynamic routes with `<Suspense>` and BetterAuth client guards to prevent hydration warnings on protected pages.

---

## 📦 Key Dependencies

- `next`: `^16.4.0`
- `react`: `^19.3.0`
- `react-dom`: `^19.3.0`
- `tailwindcss`: `^4.0.0`
- `better-auth`: `^1.7.7`
- `lucide-react`: `^1.54.0`
- `react-hot-toast`: `^2.6.1`
- `clsx`: `^2.1.1`
- `tailwind-merge`: `^3.7.0`

---

## 🚀 Getting Started Locally

Follow these steps to set up and run the project locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/furkanahmed/bazardor.git
   cd bazardor
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to explore the application.

5. **Build for production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 👨‍💻 Author

**Furkan Ahmed** — [GitHub Profile](https://github.com/furkanahmed) • [Website](https://dremoy.com) • [Email](mailto:furkanbitm@gmail.com)
