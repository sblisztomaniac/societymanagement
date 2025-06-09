# 🏢 Society Management Tool – MVP PRD

## 1. Product Summary
A lightweight web/mobile app to help housing societies streamline key operations — maintenance collection, complaint tracking, and internal communication — while giving residents a user-friendly dashboard.

## 2. Target Users
- **Residents** of apartment complexes or gated communities.
- **Society committee members** (secretary, treasurer).
- **Facility managers** or housing society staff.

## 3. Problem Statement
Society management is often manual, chaotic, and inefficient:
- Maintenance payments are hard to track.
- Residents don’t know where to raise complaints or track updates.
- Committee members rely on fragmented tools (WhatsApp + Excel).

## 4. Core MVP Features

### 👤 Resident Portal
- View profile and flat/unit info.
- See maintenance due, history, and make online payments.
- Raise and track complaints (plumbing, lift, security, etc.).
- View notices/events from the committee.

### 🛠️ Admin Dashboard (Committee)
- Add/edit residents and flats.
- Generate maintenance invoices.
- Track payments (paid/unpaid).
- View and assign complaints.
- Post society-wide announcements.

### 📬 Communication
- One-way notice board for announcements (events, water cuts, etc.).
- Optional in-app push/email alerts.

## 5. Non-MVP (Backlog for Later)
- Chat/forum for resident interaction.
- Vendor management (gardening, cleaning, etc.).
- Parking lot assignments.
- Voting/poll features.
- Visitor tracking with security gate app.

## 6. Success Metrics
- 100% adoption by committee members in test society.
- ≥60% of residents make payments or raise complaints through the app.
- ≥80% of maintenance payments tracked digitally.

## 7. Tech Stack Suggestion
- **Frontend**: React or Flutter (cross-platform)
- **Backend**: Node.js + Express / Firebase
- **Database**: PostgreSQL or Firestore
- **Payments**: Razorpay/Stripe integration
- **Hosting**: Vercel/Netlify (frontend), Supabase/Firebase (backend)

## 8. Constraints
- Must work on low-end Android devices.
- SMS/WhatsApp alerts optional, but email is default for MVP.
- Keep interface minimal and usable for non-tech-savvy users.

## 9. Design Principles
- 3-click access to any critical task.
- Clear distinction between resident and committee UI.
- Mobile-first, offline-resilient interface.
