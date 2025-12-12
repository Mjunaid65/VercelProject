# Vercel Deployment Guide

This guide will help you deploy your Library Management System to Vercel for free.

## Prerequisites

1. A GitHub account (recommended) or GitLab/Bitbucket
2. A Vercel account (sign up at https://vercel.com)
3. MongoDB Atlas account (free tier available) or your MongoDB connection string

## Step 1: Prepare Your Repository

1. Make sure your code is pushed to a Git repository (GitHub, GitLab, or Bitbucket)
2. Ensure all dependencies are listed in `package.json` files

## Step 2: Set Up MongoDB Atlas (if not already done)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string (it will look like: `mongodb+srv://username:password@cluster.mongodb.net/librarydb`)
4. Whitelist all IPs (0.0.0.0/0) for Vercel deployment, or add Vercel's IP ranges

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: Leave as root (`.`)
   - **Build Command**: Leave empty (Vercel will auto-detect)
   - **Output Directory**: `frontend/dist` (for frontend build)
   - **Install Command**: `npm install` (runs in root, then in subdirectories)

5. Add Environment Variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string (generate one: `openssl rand -base64 32`)
   - `LOAN_PERIOD_DAYS`: `14` (or your preferred value)
   - `FINE_PER_DAY`: `2` (or your preferred value)
   - `VITE_API_URL`: Will be set automatically after first deployment (use your Vercel URL + `/api`)

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables:
   ```bash
   vercel env add MONGO_URI
   vercel env add JWT_SECRET
   vercel env add LOAN_PERIOD_DAYS
   vercel env add FINE_PER_DAY
   ```

5. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

## Step 4: Configure Frontend API URL

After the first deployment:

1. Go to your Vercel project dashboard
2. Copy your deployment URL (e.g., `https://your-project.vercel.app`)
3. Add environment variable:
   - `VITE_API_URL`: `https://your-project.vercel.app/api`
4. Redeploy the project

## Step 5: Seed the Database (Optional)

You can seed your database by:

1. Running the seed script locally with your production MongoDB URI:
   ```bash
   cd backend
   MONGO_URI=your-production-mongo-uri node seed.js
   ```

   Or create a Vercel serverless function to seed data (not recommended for production).

## Important Notes

### File Uploads ⚠️ IMPORTANT

- **The current setup stores uploads locally in `backend/uploads`**
- **This will NOT work on Vercel** because serverless functions have ephemeral file systems
- **You MUST use cloud storage for production:**
  - **Recommended:** Cloudinary (free tier available) - easiest to integrate
  - **Alternative:** AWS S3, Google Cloud Storage, or similar
  - Uploads stored locally will be lost on each deployment/restart
- To fix this, you'll need to:
  1. Sign up for Cloudinary (or another service)
  2. Install the SDK: `npm install cloudinary` in backend
  3. Update `backend/src/routes/bookRoutes.js` to use Cloudinary instead of multer disk storage
  4. Update the book controller to store Cloudinary URLs instead of local paths

### Database Connection

- Make sure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0) or add Vercel's IP ranges
- The connection string should include the database name: `mongodb+srv://.../librarydb`

### CORS

- CORS is already configured in the backend to allow all origins
- For production, consider restricting CORS to your Vercel domain

### Environment Variables

All environment variables are automatically available to:
- Backend serverless functions (via `process.env`)
- Frontend build process (variables prefixed with `VITE_`)

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (Vercel uses Node 18+ by default)
- Check build logs in Vercel dashboard

### API Routes Not Working

- Verify that routes start with `/api/`
- Check that `vercel.json` routing is correct
- Ensure the Express app is properly exported

### Database Connection Issues

- Verify `MONGO_URI` is set correctly
- Check MongoDB Atlas network access settings
- Ensure the connection string includes authentication credentials

### Frontend Can't Connect to API

- Verify `VITE_API_URL` is set to your Vercel URL + `/api`
- Check browser console for CORS errors
- Ensure the API routes are working (test `/api` endpoint)

## Production Checklist

- [ ] MongoDB Atlas cluster is set up and accessible
- [ ] Environment variables are configured in Vercel
- [ ] `VITE_API_URL` points to your production API
- [ ] Database is seeded with initial data
- [ ] File uploads are configured (if using cloud storage)
- [ ] CORS is properly configured for your domain
- [ ] JWT_SECRET is a strong, random string
- [ ] Test all major features after deployment

## Support

For issues specific to Vercel deployment, check:
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions

