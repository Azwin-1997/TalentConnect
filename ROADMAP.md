# TalentConnect — Roadmap to Production

Goal: **Make the app production-grade, add modern tech, and host it.**

---

## Phase 1 — Foundation & Developer Experience

### 1.1 Environment & config
- [x] `.env.example` for backend and frontend (see repo)
- [ ] Use **Zod** (or similar) in frontend to validate `NEXT_PUBLIC_*` at build time
- [ ] Backend: validate required env on startup (e.g. `MONGO_URI`, `JWT_SECRET`, `PORT`)

### 1.2 Code quality
- [ ] **ESLint** — stricter rules for both frontend and backend
- [ ] **Prettier** — shared config at repo root (`prettier.config.js` + `.prettierignore`)
- [ ] **Husky + lint-staged** — run lint/format on pre-commit
- [ ] **TypeScript** — consider migrating backend to TS (optional) or at least JSDoc types for key APIs

### 1.3 Testing
- [ ] **Frontend:** **Vitest** + **React Testing Library** — unit + component tests for auth, dashboard, key flows
- [ ] **Backend:** **Vitest** or **Jest** — unit tests for auth, profile, and critical routes
- [ ] **E2E:** **Playwright** — login, register, dashboard, apply/save job (smoke flows)
- [ ] Add `npm run test` / `pnpm test` in root and in frontend/backend

### 1.4 API & data layer
- [ ] **OpenAPI / Swagger** — document backend API (`/api-docs`); generate types or client later
- [ ] **React Query (TanStack Query)** — replace ad‑hoc fetches for jobs, applications, profile; caching + loading/error states
- [ ] **Zod** — validate API request/response in frontend and (optional) backend
- [ ] Shared **API client** — single place for base URL, auth headers, error handling

---

## Phase 2 — Features & Product Completeness

### 2.1 Jobs & applications (backend + frontend)
- [ ] **Job model** — title, company, location, type, salary range, description, recruiter, status
- [ ] **Application model** — job, candidate, status (pending/shortlisted/rejected), timestamps
- [ ] CRUD APIs: jobs (recruiter/admin), applications (candidate + recruiter)
- [ ] Frontend: real job list, search/filter, job detail, “Apply” and “Save” wired to API
- [ ] Replace mock data in dashboard (applications, recommended jobs) with API calls

### 2.2 Profile & resume
- [ ] Profile API fully used — fetch/update from “My Profile”
- [ ] **File upload** — resume (e.g. **AWS S3** or **Cloudinary** or Vercel Blob); store URL in profile
- [ ] Optional: **PDF parsing** (e.g. pdf-parse or external service) to prefill skills/experience

### 2.3 Recruiter & admin UI
- [ ] **Recruiter app** — routes under `/hr`: post jobs, view applications, shortlist/reject
- [ ] **Admin app** — routes under `/admin`: users, roles, moderate jobs, basic analytics
- [ ] Role-based layouts and nav (reuse patterns from candidate dashboard)

### 2.4 Real-time & notifications
- [ ] **Pusher**, **Ably**, or **Socket.io** — “New application”, “Status updated” notifications
- [ ] In-app notification center (use existing header bell) + optional email digests later

### 2.5 Search & discovery
- [ ] **Full‑text search** — MongoDB Atlas Search or **Algolia** / **Meilisearch** for jobs
- [ ] Filters: location, job type, salary, date posted, skills
- [ ] “Recommended for you” using profile (skills, experience) or simple scoring

---

## Phase 3 — Reliability, Security & Performance

### 3.1 Security
- [ ] **Rate limiting** — express-rate-limit on auth and sensitive APIs
- [ ] **Helmet** — secure HTTP headers on Express
- [ ] **CORS** — restrict to real frontend origins in production (no wildcard)
- [ ] **Input sanitization** — validate/sanitize all body/query (Zod, validator, or similar)
- [ ] **CSRF** for cookie-based flows if you add non-JWT sessions later
- [ ] Secrets in env only; never commit `.env`; use **Docker secrets** or provider secrets in prod

### 3.2 Performance
- [ ] **Redis** (Upstash or self‑hosted) — session/refresh token blacklist, rate-limit store, optional cache for hot APIs
- [ ] **CDN** — host static assets and images (Vercel/Cloudflare do this if you host there)
- [ ] **Image optimization** — Next.js `<Image>`, or Cloudinary/Imgix for user uploads
- [ ] **DB indexing** — indexes on User (email), Job (status, postedAt, company), Application (job, candidate, status)

### 3.3 Observability
- [ ] **Structured logging** — e.g. **Pino** in backend; log levels, request id, user id
- [ ] **Error tracking** — **Sentry** for frontend and backend
- [ ] **Uptime / health** — `/health` with DB check; use in load balancer or orchestrator
- [ ] **Metrics** (optional) — Prometheus + Grafana or provider APM (e.g. Vercel Analytics, DataDog)

---

## Phase 4 — DevOps & Hosting

### 4.1 Containers & local parity
- [x] **Docker** — `Dockerfile` for backend and (optional) frontend
- [x] **docker-compose** — app + MongoDB (+ optional Redis) so “run with Docker” matches prod-ish setup
- [ ] **Makefile** or **package.json scripts** — e.g. `make dev`, `make test`, `make build`

### 4.2 CI/CD
- [x] **GitHub Actions** — lint, test, build on push/PR
- [ ] **Deploy on merge** — e.g. deploy preview on PR, production on merge to `main`
- [ ] **Environment promotions** — e.g. staging → production with manual approval or branch rules

### 4.3 Hosting options (pick one path and refine)

| Option | Frontend | Backend | DB | Best for |
|--------|----------|---------|-----|----------|
| **A. Vercel + Railway/Render** | Vercel | Railway or Render | MongoDB Atlas | Easiest; great DX |
| **B. Full Vercel** | Vercel | Vercel Serverless (API routes or serverless functions) | MongoDB Atlas | All-in-one, serverless |
| **C. One VPS** | Next.js standalone / static export | same Node server or separate | MongoDB Atlas or Docker MongoDB | Full control, one box |
| **D. Kubernetes (GKE/EKS/AKS)** | Ingress + static or Next | Deployment + Service | Managed MongoDB or in-cluster | Scale, multi-region later |

Recommended for “make it perfect and host it”: **Option A**  
- Frontend: **Vercel** (Next.js native, previews, edge)  
- Backend: **Railway** or **Render** (Node, Docker, env vars, free/low-cost tiers)  
- DB: **MongoDB Atlas** (M0 free tier, then paid)  
- Files: **Vercel Blob** or **Cloudinary** for resumes  
- Notifications: **Pusher** or **Resend** for emails  

### 4.4 Domain & environment
- [ ] Custom domain (e.g. `talentconnect.io`) — DNS at Cloudflare or registrar; point to Vercel + backend
- [ ] **Staging** — `staging.talentconnect.io` or Vercel preview URL; separate Mongo DB and env
- [ ] **Production** — `app.talentconnect.io` or root domain; prod DB, strong secrets, rate limits on

---

## Phase 5 — Polish & “Perfect”

### 5.1 UX & accessibility
- [ ] **Accessibility** — semantic HTML, ARIA, keyboard nav, focus management; **axe-core** or **Lighthouse** in CI
- [ ] **Loading & error states** — skeletons, toasts, error boundaries on every data-heavy page
- [ ] **Responsive** — dashboard, tables, and forms usable on mobile
- [ ] **i18n** (optional) — next-intl or next-i18next if you target multiple languages

### 5.2 Legal & compliance
- [ ] **Privacy policy** and **Terms of use** — pages + links in footer
- [ ] **Cookie consent** if you use non-essential cookies or analytics
- [ ] **GDPR-style** — export my data, delete my account (backend endpoints + UI)

### 5.3 Docs & onboarding
- [ ] **README** — one-line description, prerequisites, `.env.example`, how to run (local + Docker), how to run tests
- [ ] **CONTRIBUTING.md** — branch naming, PR checklist, how to run lint/test
- [ ] In-app **empty states** and short tooltips for first-time users (e.g. “Add your first job”, “Complete your profile”)

---

## Tech summary (current → proposed)

| Area | Current | Add / upgrade to |
|------|--------|-------------------|
| Frontend | Next.js 16, React 19, Tailwind, Axios | + React Query, Zod, Vitest, Playwright, Sentry |
| Backend | Express, Mongoose, JWT | + Helmet, rate-limit, Pino, Swagger, Vitest/Jest |
| Data | MongoDB | + MongoDB Atlas, Redis (cache/rate-limit), indexes |
| Auth | JWT + cookie | + refresh rotation, optional Redis blacklist |
| Files | — | Vercel Blob or Cloudinary |
| Search | — | MongoDB Atlas Search or Algolia/Meilisearch |
| Notifications | — | Pusher/Ably or Resend (email) |
| DevOps | — | Docker, GitHub Actions, Vercel + Railway/Render |
| Observability | — | Sentry, Pino, /health |

---

## Suggested order of work

1. **Week 1–2:** Phase 1 (env, lint, format, tests, React Query + Zod for one flow).
2. **Week 3–4:** Phase 2.1–2.2 (Jobs + Applications APIs and UI, profile + resume upload).
3. **Week 5:** Phase 2.3 (recruiter and admin UIs skeleton).
4. **Week 6:** Phase 3 (security, rate limit, Helmet, Sentry, indexes).
5. **Week 7:** Phase 4 (Docker polished, CI green, deploy to Vercel + Railway, MongoDB Atlas).
6. **Week 8+:** Phase 2.4–2.5, Phase 5 (notifications, search, a11y, legal, docs).

Use this file as the single source of truth; check off items as you go and add new ones under the right phase.
