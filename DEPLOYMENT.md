# Deployment Guide

This guide covers deployment options for the AI Use Case Canvas application.

## Overview

The application is built as a static site and can be deployed to various hosting platforms. All data is stored client-side in localStorage, so no backend server is required.

## Build the Application

Before deploying, build the production version:

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

## Deployment Options

### 1. Netlify (Recommended)

Netlify provides free hosting with automatic deployments from Git.

#### Steps:

1. Push your code to GitHub/GitLab/Bitbucket
2. Log in to [Netlify](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

#### netlify.toml (Optional)

Create this file in the project root for SPA routing:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build]
  command = "npm run build"
  publish = "dist"
```

### 2. Vercel

Vercel offers seamless deployments with zero configuration.

#### Steps:

1. Push your code to GitHub
2. Log in to [Vercel](https://vercel.com)
3. Click "Add New" → "Project"
4. Import your repository
5. Vercel auto-detects Vite configuration
6. Click "Deploy"

#### vercel.json (Optional)

For SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 3. GitHub Pages

Deploy directly from your GitHub repository.

#### Steps:

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/ai-canvas",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/ai-canvas/', // Replace with your repo name
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: Deploy from branch
   - Branch: gh-pages

### 4. AWS S3 + CloudFront

For enterprise deployments with CDN.

#### Steps:

1. Build the application:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://ai-canvas-app
```

3. Enable static website hosting:
```bash
aws s3 website s3://ai-canvas-app --index-document index.html --error-document index.html
```

4. Upload files:
```bash
aws s3 sync dist/ s3://ai-canvas-app --delete
```

5. Create CloudFront distribution for HTTPS and caching
6. Update distribution to handle SPA routing (error page → index.html)

### 5. Docker

For containerized deployments.

#### Dockerfile:

```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### nginx.conf:

```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

#### Build and run:

```bash
docker build -t ai-canvas .
docker run -p 8080:80 ai-canvas
```

### 6. Firebase Hosting

Google's hosting with free SSL.

#### Steps:

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login and initialize:
```bash
firebase login
firebase init hosting
```

3. Configure `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. Deploy:
```bash
npm run build
firebase deploy
```

## Environment Configuration

### Base URL

If deploying to a subdirectory, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/your-subdirectory/',
  // ... rest of config
})
```

### Custom Domain

Most platforms support custom domains:

1. Add CNAME record pointing to platform's domain
2. Configure custom domain in platform dashboard
3. Enable HTTPS (usually automatic)

## Performance Optimization

### 1. Enable Compression

Most platforms enable gzip/brotli automatically. For self-hosting:

```nginx
gzip on;
gzip_comp_level 6;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

### 2. Cache Headers

Configure long cache for static assets:

```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### 3. CDN

Use a CDN for global distribution:
- Netlify/Vercel include CDN
- CloudFront for AWS
- Cloudflare for custom hosting

## Monitoring

### Analytics

Add analytics by including in `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Error Tracking

Integrate Sentry for error monitoring:

```bash
npm install @sentry/react
```

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
});
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Troubleshooting

### Blank Page After Deployment

1. Check browser console for errors
2. Verify `base` URL in `vite.config.ts`
3. Ensure SPA routing is configured
4. Check that all assets load (network tab)

### 404 on Page Refresh

Configure platform to route all paths to `index.html`:
- See platform-specific instructions above

### localStorage Not Persisting

1. Verify HTTPS is enabled
2. Check browser privacy settings
3. Ensure not in incognito mode

## Security Considerations

1. **HTTPS**: Always deploy with HTTPS enabled
2. **Content Security Policy**: Add CSP headers if needed
3. **CORS**: Not applicable (no backend)
4. **Data Privacy**: All data stored client-side

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test canvas creation and editing
- [ ] Test export functionality (PDF, JSON, Markdown)
- [ ] Verify auto-save works
- [ ] Test keyboard shortcuts
- [ ] Check mobile responsiveness
- [ ] Test in multiple browsers
- [ ] Verify localStorage persists data
- [ ] Check console for errors
- [ ] Test 404 page

## Support

For deployment issues, refer to:
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- Platform-specific documentation
- Project GitHub issues

---

**Last Updated**: October 2025
