# Vercel Deployment Checklist

## Pre-Deployment

- [x] Created `vercel.json` configuration file
- [x] Created `api/index.js` serverless function wrapper
- [x] Updated `backend/src/config/db.js` to use environment variables
- [x] Updated `backend/src/server.js` to export Express app for Vercel
- [x] Added `vercel-build` script to `frontend/package.json`
- [x] Created root `package.json` for monorepo support
- [x] Created `.vercelignore` file
- [x] Created deployment documentation

## Environment Variables to Set in Vercel

Before deploying, make sure to set these in Vercel Dashboard → Settings → Environment Variables:

- [ ] `MONGO_URI` - Your MongoDB Atlas connection string
- [ ] `JWT_SECRET` - A secure random string (min 32 characters)
- [ ] `LOAN_PERIOD_DAYS` - Default: `14`
- [ ] `FINE_PER_DAY` - Default: `2`
- [ ] `VITE_API_URL` - Set after first deployment: `https://your-project.vercel.app/api`

## MongoDB Atlas Configuration

- [ ] Created MongoDB Atlas cluster (free tier)
- [ ] Whitelisted IP addresses (add `0.0.0.0/0` for Vercel)
- [ ] Created database user with read/write permissions
- [ ] Connection string includes database name (`/librarydb`)

## Deployment Steps

1. [ ] Push code to GitHub/GitLab/Bitbucket
2. [ ] Import repository in Vercel dashboard
3. [ ] Configure build settings:
   - Framework: Other
   - Build Command: `cd frontend && npm install && npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install --prefix backend && npm install --prefix frontend`
4. [ ] Add all environment variables
5. [ ] Deploy project
6. [ ] Update `VITE_API_URL` with your Vercel URL + `/api`
7. [ ] Redeploy to apply `VITE_API_URL` change

## Post-Deployment Testing

- [ ] Visit root URL - should show frontend
- [ ] Test API endpoint: `https://your-project.vercel.app/api` - should return `{"status":"Library API ok"}`
- [ ] Test API auth endpoint: `https://your-project.vercel.app/api/auth/login`
- [ ] Seed database (run `seed.js` locally with production MONGO_URI)
- [ ] Test login functionality
- [ ] Test book CRUD operations
- [ ] Test file uploads (note: won't persist, see file upload limitation)

## Known Limitations

- [ ] **File Uploads**: Local file storage won't work on Vercel. Consider migrating to Cloudinary/S3 for production.
- [ ] **Cold Starts**: First request after inactivity may be slow (serverless function cold start)
- [ ] **Database**: Ensure MongoDB Atlas allows connections from Vercel IPs

## Files Created/Modified

### New Files:
- `vercel.json` - Vercel deployment configuration
- `api/index.js` - Serverless function wrapper for Express
- `package.json` - Root package.json for monorepo
- `.vercelignore` - Files to ignore during deployment
- `VERCEL_DEPLOYMENT.md` - Detailed deployment guide
- `QUICK_START_VERCEL.md` - Quick start guide
- `DEPLOYMENT_CHECKLIST.md` - This file

### Modified Files:
- `backend/src/server.js` - Added Vercel export and conditional server start
- `backend/src/config/db.js` - Use environment variable for MongoDB URI
- `frontend/package.json` - Added `vercel-build` script

## Troubleshooting

If deployment fails:
1. Check Vercel build logs
2. Verify all environment variables are set
3. Ensure MongoDB connection string is correct
4. Check that Node.js version is compatible (18+)
5. Verify all dependencies are in package.json files

If API doesn't work:
1. Check that `api/index.js` exists and exports correctly
2. Verify `vercel.json` routing configuration
3. Test API endpoint directly: `/api`
4. Check serverless function logs in Vercel dashboard

If frontend can't connect to API:
1. Verify `VITE_API_URL` is set correctly
2. Check browser console for CORS errors
3. Ensure API routes are working (test `/api` endpoint)
4. Redeploy after setting `VITE_API_URL`

## Next Steps

1. Deploy to Vercel following `QUICK_START_VERCEL.md`
2. Test all functionality
3. Consider migrating file uploads to cloud storage (Cloudinary recommended)
4. Set up custom domain (optional)
5. Configure production environment variables
6. Set up monitoring/logging (optional)

