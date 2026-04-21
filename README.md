#Mwanga Digital Wallet Backend

A secure backend system for handling digital wallet operations including user management, wallet balances, top-up requests, and transaction tracking.

---

#Tech Stack

- Node.js (Express)
- PostgreSQL
- Knex.js (Query Builder)
- Docker & Docker Compose
- REST API architecture

---

#Features

### User Management
- User authentication system
- Role-based access (Admin / User)

### Wallet System
- Wallet creation per user
- Balance tracking
- Transaction history

### Top-Up System
- Users can request wallet top-ups
- Admin approval/rejection workflow
- Secure transaction logging

### Security
- Input validation
- Transaction safety using DB transactions
- Environment variable protection

---

#Project Structure

src/
├── config/ # Database config (Knex)
├── controllers/ # Request handlers
├── services/ # Business logic
├── repositories/ # Database queries
├── routes/ # API routes
├── middlewares/ # Auth & validation
├── migrations/ # Knex migrations
└── index.js # Entry point


---

#Setup Instructions

### 1. Clone repo
```bash
git clone https://github.com/abdillah-9/mwangaza-repo.git
cd mwangaza-repo

npm install

### Edit .env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=mwangaza_wallet
DB_PORT=5432
PORT=5000

### Run migrations
npx knex migrate:latest

### Start server
npm run dev

### Docker setup
docker compose up --build

```
# Transaction Flow
  User creates top-up request
  Request stored as PENDING
  Admin reviews request
  If approved:
  Wallet balance is updated
  Transaction is recorded
  If rejected:
  Request marked as REJECTED
  
# Author
Abdillah Suleiman


