# Quick Start: Deploy to Vercel in 5 Minutes

## Prerequisites
- GitHub account
- MongoDB Atlas account (free tier)
- Vercel account (sign up at vercel.com)

## Step-by-Step Deployment

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `.` (root)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install --prefix backend && npm install --prefix frontend`

**Option B: Via Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel
```

### 3. Set Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/librarydb
JWT_SECRET=your-super-secret-random-string-min-32-chars
LOAN_PERIOD_DAYS=14
FINE_PER_DAY=2
VITE_API_URL=https://your-project.vercel.app/api
```

**Important:** Replace `your-project.vercel.app` with your actual Vercel URL after first deployment.

### 4. Deploy & Test

1. Click "Deploy" (or run `vercel --prod` if using CLI)
2. Wait for deployment to complete
3. Visit your Vercel URL
4. Test the API: `https://your-project.vercel.app/api` should return `{"status":"Library API ok"}`

### 5. Seed Database (Optional)

Run locally with production MongoDB URI:
```bash
cd backend
MONGO_URI=your-production-mongo-uri node seed.js
```

Default login after seeding:
- Email: `admin@example.com`
- Password: `Admin@123`

## Troubleshooting

**Build fails?**
- Check that all dependencies are in package.json
- Verify Node.js version (Vercel uses 18+)

**API not working?**
- Verify environment variables are set
- Check MongoDB connection string
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

**Frontend can't connect to API?**
- Set `VITE_API_URL` to `https://your-project.vercel.app/api`
- Redeploy after setting the variable

## File Uploads Limitation

⚠️ **Important:** File uploads won't persist on Vercel (serverless functions have ephemeral storage). For production, use Cloudinary or AWS S3. See `VERCEL_DEPLOYMENT.md` for details.

## Need Help?

Check `VERCEL_DEPLOYMENT.md` for detailed documentation.

