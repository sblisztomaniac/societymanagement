# 🚀 1-Hour Sprint Plan – Society Management Tool MVP

## ⏱ Sprint Duration: 1 Hour
Focus on delivering a minimal working version with:
- Flat setup
- Resident creation
- Complaint system
- Maintenance billing
- Basic admin-resident switch logic

---

## 🧩 Sprint Goal
Deliver a working MVP that allows:
- Admin to add flats, residents, generate invoices
- Residents to log in, view dues, and file complaints

---

## 🔁 Sprint Structure

### ✅ H0–H0:10 — Setup Project Structure
- [ ] Initialize Git repo (or new branch)
- [ ] Scaffold backend (Node.js + Express OR Firebase)
- [ ] Set up DB (e.g., Supabase or mock JSON server)
- [ ] Basic folder structure: `models/`, `routes/`, `views/`, `components/`

---

### ✅ H0:10–H0:30 — Implement Core Models & Routes
#### Backend:
- [ ] `users` CRUD (basic schema + dummy auth logic)
- [ ] `flats` creation and assignment
- [ ] `maintenance_invoices` - generate & list per flat
- [ ] `complaints` POST + GET per flat

#### DB setup:
- [ ] Create seed data: 2 flats, 2 residents, 1 admin, 1 invoice, 1 complaint

---

### ✅ H0:30–H0:45 — Build Frontend (Minimal UI)
#### If using React/Vite:
- [ ] Resident Dashboard: view dues, raise complaint
- [ ] Admin Panel: see complaints, create invoice, post announcement
- [ ] Use conditional rendering for role-based access (resident vs admin)

---

### ✅ H0:45–H0:55 — Connect Frontend ↔ Backend
- [ ] Wire up API calls to DB
- [ ] Form submissions for complaint and invoice
- [ ] Display data tables for invoices and complaints

---

### ✅ H0:55–H1:00 — Smoke Test & Polish
- [ ] Test 3 flows: resident payment view, complaint submission, admin invoice gen
- [ ] Add console logs or toast messages for debug
- [ ] Push to GitHub / Deploy to Vercel if time permits

---

## 🧪 Bonus if Time Permits
- [ ] Add email alerts on complaint submission
- [ ] Mobile responsiveness for resident dashboard
- [ ] Dummy login with localStorage for session handling

---

## 🎯 Deliverables
- Working frontend (2 roles: admin & resident)
- REST API or Supabase backend with basic logic
- UI demo with 3 flows: add resident, submit complaint, view invoices

---

