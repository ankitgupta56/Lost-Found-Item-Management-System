# Lost & Found Item Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing lost and found items on a college campus.

## Features

✅ **User Authentication**
- Register and login with secure JWT tokens
- Password hashing with bcryptjs
- Protected routes and API endpoints

✅ **Item Management**
- Report lost or found items
- Add item details (category, location, color, size, image)
- Search items by name or category
- View all posted items
- Edit or delete your own items

✅ **Modern UI**
- Beautiful responsive design
- Smooth animations and transitions
- Glassmorphism styling
- Gradient backgrounds

## Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password security

**Frontend:**
- React 18
- React Router v6
- Axios for API calls
- Pure CSS3 styling

## Project Structure

```
Lost-Found-Item-Management-System/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── styles/
│   │   └── api.js
│   └── package.json
└── DEPLOYMENT.md
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ankitgupta56/Lost-Found-Item-Management-System.git
cd Lost-Found-Item-Management-System
```

2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
```

3. **Frontend Setup** (in new terminal)
```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions to deploy on:
- **Backend**: Render
- **Frontend**: Vercel

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Items
- `GET /api/items` - Get all items
- `POST /api/items` - Create new item (protected)
- `GET /api/items/search` - Search items
- `GET /api/items/user/my-items` - Get user's items (protected)
- `PUT /api/items/:id` - Update item (protected)
- `DELETE /api/items/:id` - Delete item (protected)

## Usage

1. **Register**: Create a new account with email and password
2. **Login**: Sign in to your account
3. **Report Item**: Click "Add Item" to report a lost or found item
4. **Browse**: View all reported items on the dashboard
5. **Search**: Use the search bar to find items by name or category
6. **Manage**: Edit or delete your own items from "My Items" tab
7. **Logout**: Sign out from your account

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=production
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Author

Ankit Kumar Gupta

## License

This project is open source and available under the MIT License.

