# Recursive Grid - Deployment Guide

## Quick Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Navigate to project directory:
```bash
cd recursive-grid
```

3. Login to Vercel:
```bash
vercel login
```

4. Deploy:
```bash
vercel
```

5. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **recursive-grid** (or your preferred name)
   - Directory? **./** (current directory)
   - Override settings? **N**

6. For production deployment:
```bash
vercel --prod
```

### Method 2: GitHub + Vercel Dashboard

1. **Create GitHub Repository:**
```bash
cd recursive-grid
git init
git add .
git commit -m "Initial commit: The Recursive Grid"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure project:
     - Framework Preset: **Next.js**
     - Root Directory: **./recursive-grid** (if in subdirectory)
     - Build Command: `npm run build` (auto-detected)
     - Output Directory: `.next` (auto-detected)
   - Click "Deploy"

3. **Get your live URL:**
   - Vercel will provide a URL like: `https://recursive-grid-xxx.vercel.app`
   - Update README.md with this URL

## Environment Configuration

No environment variables required for this project.

## Build Settings

- **Framework:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

## Post-Deployment Checklist

- [ ] Verify the live URL loads correctly
- [ ] Test all grid interactions on the deployed site
- [ ] Test on mobile devices
- [ ] Update README.md with live URL
- [ ] Prepare submission email

## Submission Template

**To:** anurag@audacity.ltd  
**Subject:** The Recursive Grid - Frontend Challenge Submission

---

Hello,

I'm submitting my solution for The Recursive Grid challenge.

**Live Demo:** [Your Vercel URL]  
**GitHub Repository:** [Your GitHub URL]

**Tech Stack:**
- Next.js 16.1.6 with App Router
- TypeScript
- Tailwind CSS
- Deployed on Vercel

**Key Features Implemented:**
✅ 3x3 Grid with centered layout  
✅ Click interaction (increment by 1)  
✅ Rule A: Divisible by 3 → Right box -1  
✅ Rule B: Divisible by 5 → Below box +2  
✅ Locked state at value ≥ 15 (red background)  
✅ Edge case handling (last column, bottom row)  
✅ Dynamic styling (even/odd numbers)  
✅ Premium UI with gradients and animations  

Thank you for reviewing my submission!

Best regards,  
[Your Name]

---

## Troubleshooting

### Build Fails
- Ensure Node.js version is 18 or higher: `node --version`
- Clear cache: `rm -rf .next node_modules && npm install`

### Deployment Issues
- Check Vercel build logs for errors
- Ensure all dependencies are in `package.json`
- Verify TypeScript has no errors: `npm run build`

### Local Development
- Port 3000 in use? Change port: `npm run dev -- -p 3001`
- Hot reload not working? Restart dev server

## Performance Optimization

The app is already optimized with:
- Next.js automatic code splitting
- Turbopack for faster builds
- Tailwind CSS purging unused styles
- TypeScript for type safety

## Browser Compatibility

Tested and works on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)
