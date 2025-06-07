# 📋 Backlog – Society Management Tool MVP

---

## 🧱 Epic 1: Project Setup & Scaffolding

### 🧩 User Story 1.1: As a developer, I want a clean, minimal scaffold so I can iterate fast.
- [ ] Initialize project repo and directory structure
- [ ] Set up environment variables or `.env` (if applicable)
- [ ] Create base folders: `routes/`, `models/`, `views/`, `components/`
- [ ] Set up mock database (e.g. Supabase, Firebase, or JSON Server)

---

## 🏢 Epic 2: Admin Management of Society

### 🧩 User Story 2.1: As an admin, I want to create and manage flats and residents.
- [ ] Create `flats` model and routes
- [ ] Add endpoint to add/edit flat details (block, number, type)
- [ ] Create `users` model with roles (admin, resident)
- [ ] Assign resident to a flat

### 🧩 User Story 2.2: As an admin, I want to generate maintenance invoices per flat.
- [ ] Create `maintenance_invoices` model and schema
- [ ] Add route to generate invoice (flat ID, amount, due date)
- [ ] View list of invoices per flat
- [ ] Toggle payment status manually (for MVP)

---

## 👤 Epic 3: Resident Portal

### 🧩 User Story 3.1: As a resident, I want to view my maintenance dues.
- [ ] Create route to fetch maintenance invoices by flat ID
- [ ] Display dues and payment status in UI
- [ ] Show due amount and due date

### 🧩 User Story 3.2: As a resident, I want to raise complaints about services.
- [ ] Create `complaints` model and schema
- [ ] Add form to submit new complaint (category, description)
- [ ] View submitted complaints with status (open/in progress/resolved)

---

## 📬 Epic 4: Communication and Notices

### 🧩 User Story 4.1: As an admin, I want to post announcements for all residents.
- [ ] Create `announcements` model and route
- [ ] UI form to post announcement (title + body)
- [ ] Residents can view announcements in a noticeboard UI component

---

## 🔌 Epic 5: Frontend Integration & Routing

### 🧩 User Story 5.1: As a user, I want different dashboards for admin and resident views.
- [ ] Implement role-based routing logic
- [ ] Resident dashboard: dues, complaints, announcements
- [ ] Admin dashboard: invoices, residents, flats, complaints, announcements

### 🧩 User Story 5.2: As a user, I want basic session-like behavior for testing.
- [ ] Use localStorage or dummy login switch for role
- [ ] Persist role and basic user info across views

---

## 🧪 Epic 6: QA & Feedback Loop

### 🧩 User Story 6.1: As a developer, I want to verify core flows through manual testing.
- [ ] Test resident login → view dues → submit complaint
- [ ] Test admin login → post invoice → resolve complaint
- [ ] Add console logs / alerts for key interactions
- [ ] Push to GitHub + optional deploy to Vercel / Firebase Hosting

---

