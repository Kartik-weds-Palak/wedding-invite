# 🚀 Deployment Guide - GitHub Pages

Complete step-by-step guide to deploy your wedding website to GitHub Pages.

## Prerequisites

- GitHub account (free) - [Sign up here](https://github.com/signup)
- Your wedding photos ready
- Git installed on your computer (optional but recommended)

---

## Method 1: Deploy Using GitHub Web Interface (Easiest)

Perfect if you're not familiar with Git or command line.

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **+** icon (top right) → **New repository**
3. Configure your repository:
   - **Repository name**: `wedding-invite` (or `YOUR_USERNAME.github.io` for root domain)
   - **Description**: "Our Wedding Invitation Website"
   - **Public** repository (required for free GitHub Pages)
   - ✅ Check "Add a README file"
4. Click **Create repository**

### Step 2: Upload Files

1. Click **Add file** → **Upload files**
2. Drag and drop ALL files and folders from your wedding-invite folder:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `images/` folder
   - `README.md`
   - `.gitignore`
   - All other files
3. Scroll down, add commit message: "Initial wedding website"
4. Click **Commit changes**

### Step 3: Enable GitHub Pages

1. Go to **Settings** tab in your repository
2. Scroll down to **Pages** section (left sidebar)
3. Under **Source**:
   - Branch: Select `main` (or `master`)
   - Folder: `/ (root)`
4. Click **Save**
5. Wait 1-2 minutes for deployment
6. Your website will be live at: `https://YOUR_USERNAME.github.io/wedding-invite/`

### Step 4: Verify Deployment

1. Visit your website URL
2. Check all sections load properly
3. Test the RSVP form
4. View on mobile device

---

## Method 2: Deploy Using Git (Recommended)

Better for future updates and version control.

### Step 1: Install Git

**Windows:**
- Download from [git-scm.com](https://git-scm.com/download/win)
- Install with default settings

**Mac:**
```bash
# Install via Homebrew
brew install git

# Or install Xcode Command Line Tools
xcode-select --install
```

**Linux:**
```bash
# Debian/Ubuntu
sudo apt-get install git

# Fedora
sudo yum install git
```

### Step 2: Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Create GitHub Repository

1. Go to GitHub → **New repository**
2. Name: `wedding-invite`
3. **Don't** initialize with README (we already have files)
4. Click **Create repository**

### Step 4: Push Your Code

```bash
# Navigate to your project folder
cd /Users/kartik.madaan/personal/wedding-invite

# Initialize Git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial wedding website"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/wedding-invite.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 5: Enable GitHub Pages

Follow Method 1, Step 3 above.

### Step 6: Future Updates

When you want to update your website:

```bash
# Make your changes to files

# Check what changed
git status

# Add changed files
git add .

# Commit changes
git commit -m "Updated gallery photos"

# Push to GitHub
git push

# Website will auto-update in 1-2 minutes!
```

---

## 🌐 Custom Domain Setup (Optional)

Want to use `www.kartiandpalak.com` instead of GitHub's URL?

### Step 1: Buy a Domain

Popular registrars:
- **Namecheap** - $8-15/year
- **GoDaddy** - $12-20/year
- **Google Domains** - $12/year
- **Cloudflare** - $8-10/year (recommended)

### Step 2: Configure GitHub

1. In your repository → **Settings** → **Pages**
2. Under **Custom domain**, enter your domain: `www.kartiandpalak.com`
3. Click **Save**
4. ✅ Check **Enforce HTTPS** (wait 24 hours for certificate)

### Step 3: Configure DNS

Add these records in your domain registrar's DNS settings:

**For www subdomain:**
```
Type: CNAME
Name: www
Value: YOUR_USERNAME.github.io
TTL: 3600
```

**For root domain (optional):**
```
Type: A
Name: @ (or leave blank)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @ (or leave blank)
Value: 185.199.111.153
TTL: 3600
```

### Step 4: Wait and Verify

- DNS changes take 1-48 hours to propagate
- Check status: https://www.whatsmydns.net
- Visit your custom domain!

---

## 🔧 Common Issues & Solutions

### Issue: "404 - Page Not Found"

**Solutions:**
1. Wait 5-10 minutes after enabling Pages
2. Check repository is **Public**, not Private
3. Verify `index.html` is in root folder (not in subfolder)
4. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
5. Try incognito/private window

### Issue: Images Not Loading

**Solutions:**
1. Verify image paths in `index.html` are correct
2. Check image files are uploaded to GitHub
3. Ensure file names match exactly (case-sensitive!)
4. Check browser console (F12) for errors

### Issue: RSVP Form Not Working

**Solutions:**
1. Verify Google Apps Script URL is correct in `js/main.js`
2. Check script is deployed with "Anyone" access
3. Test script URL in browser - should show "Wedding RSVP Script is working!"
4. Check browser console (F12) for JavaScript errors

### Issue: Website Not Updating

**Solutions:**
1. Clear browser cache (Ctrl+Shift+R)
2. Wait 2-3 minutes for GitHub Pages to rebuild
3. Try incognito/private window
4. Check GitHub Actions tab for deployment status

### Issue: Custom Domain Not Working

**Solutions:**
1. Wait up to 48 hours for DNS propagation
2. Check DNS records are correct using: https://dnschecker.org
3. Remove and re-add custom domain in GitHub settings
4. Ensure CNAME file exists in repository root

---

## 📱 Testing Checklist

Before sharing with guests, test:

- [ ] Website loads on desktop
- [ ] Website loads on mobile
- [ ] All images load properly
- [ ] Countdown timer works
- [ ] Smooth scrolling works
- [ ] Gallery modal opens/closes
- [ ] Google Maps shows correct location
- [ ] RSVP form submits successfully
- [ ] RSVP data appears in Google Sheet
- [ ] All links work (Instagram, Google Maps, Uber)
- [ ] Website looks good on different browsers (Chrome, Safari, Firefox)

---

## 📊 Monitor Your Website

### Google Analytics (Optional)

Track visitors and their behavior:

1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get your tracking ID (G-XXXXXXXXXX)
3. Add before `</head>` in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### View GitHub Pages Stats

1. Go to repository **Insights** → **Traffic**
2. See:
   - Total visits
   - Unique visitors
   - Top referrers
   - Popular pages

---

## 🔄 Update Workflow

Regular updates you might want to make:

### Add More Gallery Photos

1. Upload new photos to `images/gallery/`
2. Add gallery item HTML in `index.html`
3. Commit and push changes

### Update Event Details

1. Edit event information in `index.html`
2. Commit and push changes

### Change Styling

1. Edit colors/fonts in `css/styles.css`
2. Commit and push changes

---

## 🎉 Launch Checklist

Before sharing with guests:

- [ ] All personal information is correct
- [ ] All photos are uploaded and optimized
- [ ] Google Sheets integration is working
- [ ] Google Maps shows correct venue
- [ ] Instagram links work
- [ ] Countdown timer shows correct date
- [ ] Tested on mobile and desktop
- [ ] Custom domain is working (if applicable)
- [ ] HTTPS is enabled
- [ ] All placeholder text is replaced
- [ ] Contact information is correct
- [ ] Dress codes are specified
- [ ] RSVP deadline is correct

---

## 📞 Need Help?

- GitHub Pages Documentation: https://docs.github.com/pages
- Contact: Open an issue on the repository
- Community: GitHub Community Forum

---

## 🎊 You're All Set!

Your wedding website is now live! Share it with:

- Physical invitations (print the URL or QR code)
- WhatsApp/SMS to guests
- Email invitations
- Social media
- Wedding invitation cards

**Generate QR Code for easy sharing:**
- Go to: https://qr-code-generator.com
- Enter your website URL
- Download and print on invitations!

---

**Happy Wedding! 💑✨**

*Made with ❤️ for Kartik & Palak*

