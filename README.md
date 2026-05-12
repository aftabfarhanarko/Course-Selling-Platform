## Course Selling Platform (Frontend)

Next.js App Router ভিত্তিক course selling platform frontend। এখানে authentication (register/login/refresh/logout), role-based redirect (student/admin), protected routes (middleware), এবং profile management (photo upload + change password) সেট করা আছে।

### Features
- Auth: Register, Login, Refresh, Logout
- Role based routing: `student` → `/student`, `superadmin/admin` → `/admin/dashboard`
- Protected routes: `/student/*`, `/admin/*` (middleware + client layout guard)
- Profile (Student): `/student/dashboard`
  - Current user: `GET /users/profile`
  - Update profile: `PATCH /users/profile` (name + photo)
  - Change password: `POST /auth/change-password`
- Image upload: ImgBB (file → url)

### Tech Stack
- Next.js (App Router)
- React + TypeScript
- Redux Toolkit + RTK Query
- Tailwind CSS

### Run Locally
```bash
npm install
npm run dev
```

### Environment Variables
`.env` ফাইলে নিচেরগুলো রাখুন:

```bash
NEXT_PUBLIC_API_BASE_URL=https://course-selling-api.up.railway.app
NEXT_PUBLIC_IMGBB_API_KEY=YOUR_IMGBB_KEY
```

### API Proxy (CORS Fix)
Frontend থেকে backend direct hit করলে CORS issue হতে পারে। তাই app এ proxy route ব্যবহার করা হয়:
- Frontend calls: `/api/...`
- Next.js rewrite করে: `${NEXT_PUBLIC_API_BASE_URL}/...`

Config: `next.config.js` এ rewrites সেট করা আছে।

### Protected Routes
- `/student/*` → role cookie না থাকলে `/login`
- `/admin/*` → role `superadmin/admin` না হলে `/login`

Middleware: `src/middleware.ts`

### Useful Scripts
```bash
npm run dev
npm run build
npm run start
```

### Important Notes
- `NEXT_PUBLIC_IMGBB_API_KEY` client-side এ expose হয় (ImgBB upload client-side বলে)। Production secure করতে চাইলে server-side upload route ব্যবহার করুন।
- Login/Register এর পর user profile fetch হয় `GET /users/profile` দিয়ে এবং role cookie set হয়। Logout করলে localStorage + role cookie clear হয়।

