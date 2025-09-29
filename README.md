# 🌱 sass-kit

Minimal monorepo starter for building your next SaaS app.  
Comes with **Next.js**, **Hono server**, and a shared **foundation** package for DB/auth/zod.

---

## 📂 Structure

```bash
.
├── apps
│   ├── web                 # Next.js app
│   └── services            # backend services (Hono, Gateway, etc.)
│       ├── server          # Hono server
│       └── gateway         # placeholder
├── packages
│   ├── foundation          # auth, db, zod-schemas, queries
│   └── ui                  # shared UI components
```

---

## 🚀 Getting Started

```bash
pnpm install
pnpm dev
```

- `pnpm web` → work in the Next.js app
- `pnpm srv` → work in the Hono server
- `pnpm fnd` → work in foundation

---

## 🌌 Roadmap

- [ ] Polar integration for payments 💸
- [ ] TanStack SPA app
- [ ] Expo mobile app
- [ ] More backend services (orders, notifications, etc.)

---

💡 Just fork it, run it, and grow your SaaS.
