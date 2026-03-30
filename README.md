# CodeWander 🚀

A modern, production-ready tech blog and tools website built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

![CodeWander](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)

---

## ✨ Features

- **🏠 Home Page** — Animated hero, featured posts, category explorer, AI idea generator
- **📝 Blog System** — Dynamic routing, Markdown rendering, syntax highlighting, search & filter
- **📊 Dashboard** — Admin panel with post stats, category breakdown, and post creation form
- **🤖 AI Idea Generator** — Powered by Claude API (falls back to mock data without key)
- **🌙 Dark/Light Mode** — Persisted to localStorage with no flash
- **📱 Fully Responsive** — Mobile-first design
- **⚡ Loading Skeletons** — Smooth loading states throughout
- **🔍 SEO Optimized** — Dynamic metadata, Open Graph tags
- **🎨 Premium UI** — Custom fonts (Fraunces + DM Sans), refined animations

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Markdown | react-markdown + remark-gfm |
| Syntax Highlighting | react-syntax-highlighter |
| AI | Anthropic Claude API |
| Icons | Lucide React |

---

## 🚀 Getting Started

### 1. Clone or extract the project

```bash
cd codewander
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your keys:

```env
# Optional: enables the AI Blog Idea Generator
ANTHROPIC_API_KEY=your_key_here
```

> **Note:** The AI Idea Generator works without an API key — it returns mock data instead.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 📁 Project Structure

```
codewander/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Navbar, Footer, ThemeProvider)
│   │   ├── page.tsx            # Home page
│   │   ├── loading.tsx         # Global loading state
│   │   ├── not-found.tsx       # 404 page
│   │   ├── blog/
│   │   │   ├── page.tsx        # Blog listing (search + filter)
│   │   │   └── [slug]/
│   │   │       ├── page.tsx    # Post metadata + static params
│   │   │       └── BlogPostClient.tsx  # Markdown renderer
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Admin dashboard
│   │   └── api/
│   │       ├── posts/route.ts  # GET /api/posts, POST /api/posts
│   │       └── generate-idea/route.ts  # POST /api/generate-idea
│   ├── components/
│   │   ├── Navbar.tsx          # Sticky navbar with mobile menu
│   │   ├── Footer.tsx          # Site footer
│   │   ├── ThemeProvider.tsx   # Dark/light mode context
│   │   ├── PostCard.tsx        # Reusable blog card
│   │   ├── CategoryBadge.tsx   # Filterable category pill
│   │   ├── Skeleton.tsx        # Loading skeleton components
│   │   └── AIIdeaGenerator.tsx # AI-powered idea widget
│   ├── data/
│   │   └── posts.ts            # Mock blog data + query helpers
│   ├── lib/
│   │   └── utils.ts            # cn(), formatDate(), constants
│   ├── styles/
│   │   └── globals.css         # Global styles, fonts, utilities
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── .env.example                # Environment variable template
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub and import the repo at [vercel.com](https://vercel.com).

Add your `ANTHROPIC_API_KEY` in the Vercel dashboard under **Settings → Environment Variables**.

---

## 🔌 Adding Real Database (MongoDB)

1. Install MongoDB driver: `npm install mongodb mongoose`
2. Add `MONGODB_URI` to `.env.local`
3. Create `src/lib/mongodb.ts` connection helper
4. Replace mock data in `src/data/posts.ts` with DB queries
5. Update `src/app/api/posts/route.ts` to read/write from MongoDB

---

## 🎨 Customization

### Change brand colors
Edit `tailwind.config.ts` → `theme.extend.colors.brand`

### Change fonts
Edit `src/styles/globals.css` → `@import url(...)` and `:root` font variables

### Add a blog post
Edit `src/data/posts.ts` and add a new object to the `posts` array.

---

## 📜 License

MIT — free to use, modify, and deploy.

---

Built with ❤️ using Next.js + Tailwind CSS
