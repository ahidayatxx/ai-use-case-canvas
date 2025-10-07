# GitHub Pages Setup Guide

Your AI Use Case Canvas has been deployed to GitHub! Follow these steps to enable GitHub Pages.

## Repository Information

- **Repository**: https://github.com/ahidayatxx/ai-use-case-canvas
- **Live URL** (after setup): https://ahidayatxx.github.io/ai-use-case-canvas/

## Enable GitHub Pages

1. **Go to your repository settings**:
   - Navigate to: https://github.com/ahidayatxx/ai-use-case-canvas/settings/pages

2. **Configure Pages source**:
   - Under "Build and deployment"
   - Source: **GitHub Actions** (should be auto-selected)

3. **Wait for deployment**:
   - Go to the Actions tab: https://github.com/ahidayatxx/ai-use-case-canvas/actions
   - The workflow should be running automatically
   - Wait for it to complete (usually 2-3 minutes)

4. **Access your site**:
   - Once deployed, visit: https://ahidayatxx.github.io/ai-use-case-canvas/

## Workflow Details

The GitHub Actions workflow (`.github/workflows/deploy.yml`) automatically:
- Builds the application on every push to `main`
- Optimizes assets for production
- Deploys to GitHub Pages

## Troubleshooting

### Workflow fails
- Check the Actions tab for error logs
- Ensure GitHub Pages is enabled in repository settings

### Site not loading
- Verify the workflow completed successfully
- Check that the base path is correct in `vite.config.ts`
- Clear browser cache and try again

### 404 errors
- Ensure GitHub Pages source is set to "GitHub Actions"
- Check that the `base` path in `vite.config.ts` matches your repository name

## Update the Application

To update the deployed site:

1. Make your changes locally
2. Commit and push to main:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
3. GitHub Actions will automatically rebuild and redeploy

## Custom Domain (Optional)

To use a custom domain:

1. Add a CNAME record in your DNS settings pointing to: `ahidayatxx.github.io`
2. In repository settings → Pages → Custom domain, enter your domain
3. Enable "Enforce HTTPS"
4. Update `base: '/'` in `vite.config.ts` (for root domain) and redeploy

## Local Development

To run locally:

```bash
npm install
npm run dev
```

Visit http://localhost:5173

## Need Help?

- GitHub Pages docs: https://docs.github.com/en/pages
- GitHub Actions docs: https://docs.github.com/en/actions
- Vite deployment guide: https://vitejs.dev/guide/static-deploy.html

---

**Your app is ready! 🚀**

Once GitHub Pages is enabled, your AI Use Case Canvas will be live at:
https://ahidayatxx.github.io/ai-use-case-canvas/
