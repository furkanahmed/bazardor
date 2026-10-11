# 🛒 BazarDor (বাজার দর) — Daily Commodity Price Tracker

A modern and responsive web application designed to track and compare daily essential commodity prices across major wholesale and retail markets in Bangladesh.

---

## 🌐 Live URL & Repository

- **Live Demo**: https://bazardor2-gilt.vercel.app/
- **GitHub Repository**: https://github.com/furkanahmed/bazardor.git

---

## 🛠️ Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server & Client Components)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: Google Fonts (`Hind Siliguri` for authentic Bengali typography)
- **Authentication**: BetterAuth client implementation with Protected Route guards
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Data Source**: Live RESTful API (Programming Hero Open API)

---

## ✨ 5 Key Features

1. **Live Scrolling Price Ticker**:
   - An infinite animated marquee strip directly beneath the navigation bar showcasing real-time product prices along with percentage changes (▲/▼ %) for rapid market updates.

2. **Dynamic Price Rise & Fall Trends (Home Page)**:
   - Dedicated algorithmic sections for "আজ দাম বেড়েছে ▲" (Top 6 risers) and "আজ দাম কমেছে ▼" (Top 6 fallers), helping buyers spot real-time price fluctuations instantly.

3. **Category Filtering & Bengali Numeral Sorting (Challenge C1)**:
   - Filter items across categories (Rice, Lentils, Oil, Vegetables, Fish, Meat, Dairy, Spices) with an intelligent dropdown sorting system (Default, Low to High, High to Low) properly parsing Bengali numerical values.

4. **Authentication Protected Product Details (Protected Route)**:
   - Secure dynamic route (`/product/[slug]`) requiring login. Features top summary cards, statistical price ranges (Min, Max, Average), and multi-market breakdown (Karwan Bazar, Mirpur, Sadar Bazar, etc.).

5. **User Profile & Information Update (Challenge C3)**:
   - Complete profile management (`/profile`) paired with a dedicated update interface (`/profile/update`) allowing users to easily modify and persist their display information in real time.

---

## 🚀 Getting Started Locally

1. Clone the repository:

```bash
git clone https://github.com/furkanahmed/bazardor.git
cd bazardor
```
