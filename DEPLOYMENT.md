# Deployment Guide

## Backend Deployment (Render)

### Step 1: Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up/Login with GitHub

### Step 2: Deploy Backend
1. Click "New +" → Select "Web Service"
2. Connect your GitHub repository
3. Enter the following details:
   - **Name**: `lost-found-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `master`
   - **Root Directory**: `backend` ⚠️ **IMPORTANT**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### Step 3: Add Environment Variables
In Render dashboard, go to Environment tab and add:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_change_this
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait for deployment to complete
- Copy the backend URL (e.g., `https://lost-found-backend.onrender.com`)

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
1. Go to [Vercel.com](https://vercel.com)
2. Sign up/Login with GitHub

### Step 2: Import Project
1. Click "Add New Project"
2. Select "Import Git Repository"
3. Find your GitHub repository: `Lost-Found-Item-Management-System`
4. Click "Import"

### Step 3: Configure
1. **Root Directory**: `frontend`
2. **Build Command**: `npm run build`
3. **Output Directory**: `build`

### Step 4: Add Environment Variables
In Environment Variables section, add:
```
REACT_APP_API_URL=https://your-render-backend-url.onrender.com/api
```
(Replace with your actual Render backend URL from Step 1)

### Step 5: Deploy
- Click "Deploy"
- Wait for deployment to complete
- Your frontend URL will be provided (e.g., `https://lost-found.vercel.app`)

---

## Post-Deployment

### Update Backend FRONTEND_URL
After Vercel deployment, update your Render backend:
1. Go to Render dashboard → Your backend service
2. Go to Environment
3. Update `FRONTEND_URL` to your Vercel URL
4. Redeploy the backend

---

## Testing Deployed Application
1. Visit your Vercel frontend URL
2. Test registration, login, item creation
3. Check that API calls work (should show items from MongoDB)

---

## Troubleshooting

**Backend not connecting?**
- Check MongoDB URI is correct
- Verify JWT_SECRET is set
- Check FRONTEND_URL matches your Vercel URL

**Frontend API calls failing?**
- Check REACT_APP_API_URL is correct
- Verify it includes `/api` at the end
- Check backend FRONTEND_URL is set to your Vercel URL (CORS)

**Database issues?**
- Verify MongoDB URI in Render environment variables
- Check MongoDB Atlas connection is allowed from Render IP

