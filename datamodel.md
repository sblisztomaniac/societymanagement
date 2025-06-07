# 🗃️ Data Model – Society Management Tool (MVP)

## 1. `users`
Holds both residents and committee members.

| Field           | Type        | Constraints                  | Description                       |
|----------------|-------------|------------------------------|-----------------------------------|
| id             | UUID        | PK, auto-generated           | Unique user ID                    |
| name           | Text        | NOT NULL                     | Full name                         |
| email          | Text        | UNIQUE, NOT NULL             | Login email                       |
| phone          | Text        | UNIQUE                       | Optional phone number             |
| role           | Enum        | ['resident', 'admin']        | Role in the system                |
| flat_id        | UUID        | FK → flats.id (nullable)     | Associated flat                   |
| created_at     | Timestamp   | DEFAULT now()                | Account creation time             |

---

## 2. `flats`
Represents all units in the society.

| Field       | Type      | Constraints              | Description                     |
|------------|-----------|--------------------------|---------------------------------|
| id         | UUID      | PK, auto-generated       | Unique flat/unit ID             |
| block      | Text      |                          | Block name/letter (e.g., A, B)  |
| number     | Text      |                          | Flat number (e.g., 201)         |
| type       | Text      |                          | Optional (e.g., 1BHK, 2BHK)     |
| owner_name | Text      |                          | Flat owner’s name               |

---

## 3. `maintenance_invoices`
Tracks dues per flat per month.

| Field         | Type      | Constraints                  | Description                            |
|---------------|-----------|------------------------------|----------------------------------------|
| id            | UUID      | PK, auto-generated           | Unique invoice ID                      |
| flat_id       | UUID      | FK → flats.id                | Linked flat                            |
| amount        | Decimal   | NOT NULL                     | Maintenance amount                     |
| due_date      | Date      | NOT NULL                     | Payment due date                       |
| paid          | Boolean   | DEFAULT false                | Status of payment                      |
| paid_on       | Timestamp |                              | When payment was made (if any)         |
| created_at    | Timestamp | DEFAULT now()                | Invoice creation timestamp             |

---

## 4. `complaints`
Residents can raise issues (plumbing, lift, etc.).

| Field         | Type      | Constraints                  | Description                           |
|---------------|-----------|------------------------------|---------------------------------------|
| id            | UUID      | PK, auto-generated           | Unique complaint ID                   |
| raised_by     | UUID      | FK → users.id                | User who submitted the complaint      |
| flat_id       | UUID      | FK → flats.id                | Flat from which complaint originated  |
| category      | Text      |                              | e.g., plumbing, security, elevator    |
| description   | Text      |                              | Detailed issue                        |
| status        | Enum      | ['open', 'in_progress', 'resolved'] | Current status of complaint   |
| created_at    | Timestamp | DEFAULT now()                | When it was submitted                 |
| updated_at    | Timestamp |                              | Last status update                    |

---

## 5. `announcements`
Society-wide messages from admins.

| Field         | Type      | Constraints              | Description                          |
|---------------|-----------|--------------------------|--------------------------------------|
| id            | UUID      | PK, auto-generated       | Announcement ID                      |
| title         | Text      | NOT NULL                 | Brief title                          |
| body          | Text      | NOT NULL                 | Full message                         |
| posted_by     | UUID      | FK → users.id            | Committee member who posted it       |
| created_at    | Timestamp | DEFAULT now()            | When it was posted                   |

---

## Optional Future Tables (Backlog)
- `visitors` – for gate logbook integration.
- `vendors` – recurring service providers.
- `polls` – for voting on decisions.
- `events` – community gatherings or bookings.

