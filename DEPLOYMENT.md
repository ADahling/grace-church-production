# Grace Church - Production Deployment Guide

## 🚀 **Deployment Overview**

This guide covers deploying Grace Church to production environments with enterprise-level reliability and scalability.

## 📋 **Pre-Deployment Checklist**

### **✅ Required Services Setup**
- [ ] Supabase project created and configured
- [ ] OpenAI API key with sufficient credits
- [ ] ElevenLabs account for premium audio
- [ ] Domain configured (graces.church)
- [ ] SSL certificates ready
- [ ] Environment variables secured

### **✅ Code Quality Checks**
- [ ] All tests passing
- [ ] TypeScript compilation successful
- [ ] ESLint warnings resolved
- [ ] Performance optimizations applied
- [ ] Security audit completed

## 🌐 **Netlify Deployment (Recommended)**

### **Primary Site Setup**
1. **Connect Repository**
   ```
   Repository: https://github.com/ADahling/grace-church-production
   Branch: main
   Build Command: npm run build
   Publish Directory: .next
   ```

2. **Environment Variables**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://cuijuolyvcocoplnfouu.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_anon_key]
   SUPABASE_SERVICE_ROLE_KEY=[your_service_key]
   OPENAI_API_KEY=[your_openai_key]
   ELEVENLABS_API_KEY=[your_elevenlabs_key]
   NEXT_PUBLIC_ELEVENLABS_API_KEY=[your_elevenlabs_key]
   API_BIBLE_KEY=[your_bible_api_key]
   RESEND_API_KEY=[your_resend_key]
   NEXT_PUBLIC_APP_URL=https://graces.church
   NODE_ENV=production
   ```

3. **Custom Domain**
   ```
   Primary Domain: graces.church
   SSL: Force HTTPS
   ```

### **Secondary Site Setup (Backup/Testing)**
- Same configuration as primary
- Domain: grace-church-sanctuary.netlify.app
- Used for staging and backup

## ⚙️ **Build Configuration**

### **netlify.toml**
```toml
[build]
  command = "npm install && npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=()"
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/api/*"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"

[[headers]]
  for = "/_next/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[functions]
  node_bundler = "esbuild"
```

## 🔧 **Alternative Deployment Options**

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Environment variables via Vercel dashboard
```

### **Docker Deployment**
```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### **AWS/Azure/GCP**
- Use container deployment with Docker
- Configure load balancer for high availability
- Set up auto-scaling based on traffic
- Implement CDN for global performance

## 📊 **Performance Optimization**

### **Build Optimizations**
```json
// next.config.js
{
  "experimental": {
    "optimizeCss": true,
    "optimizeImages": true
  },
  "compress": true,
  "poweredByHeader": false,
  "generateEtags": false
}
```

### **Image Optimization**
- Next.js Image component for automatic optimization
- WebP format with fallbacks
- Lazy loading for below-the-fold content
- Responsive images for different screen sizes

### **Font Optimization**
```css
/* Preload critical fonts */
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/fonts/inter.woff2') format('woff2');
}
```

## 🔒 **Security Configuration**

### **Environment Security**
- Never commit .env files to repository
- Use Netlify/Vercel environment variable management
- Rotate API keys regularly
- Monitor for exposed credentials

### **API Security**
- Rate limiting on all endpoints
- CORS configuration for allowed origins
- Input validation and sanitization
- SQL injection prevention

### **Content Security Policy**
```javascript
// Security headers
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  }
];
```

## 📈 **Monitoring & Analytics**

### **Error Tracking**
```javascript
// Sentry integration
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### **Performance Monitoring**
- Lighthouse CI for performance regression detection
- Core Web Vitals tracking
- API response time monitoring
- Database query performance

### **User Analytics**
- Privacy-compliant analytics (no personal spiritual data)
- Usage patterns for feature optimization
- Geographic distribution for CDN optimization
- Error rate monitoring

## 🚨 **Disaster Recovery**

### **Backup Strategy**
- Daily Supabase database backups
- Code repository mirroring
- Environment variable backup
- SSL certificate backup

### **Rollback Procedure**
1. Identify problematic deployment
2. Revert to previous Git commit
3. Trigger new deployment
4. Verify functionality
5. Communicate with users if needed

### **High Availability**
- Multiple deployment regions
- Database read replicas
- CDN failover
- API fallback systems

## 🔄 **CI/CD Pipeline**

### **GitHub Actions**
```yaml
name: Deploy to Production
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
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --prod
```

### **Quality Gates**
- Automated testing on pull requests
- Code quality checks (ESLint, Prettier)
- Security vulnerability scanning
- Performance regression testing

## 📞 **Post-Deployment**

### **Verification Checklist**
- [ ] Site loads correctly on all devices
- [ ] Sister Grace AI responds properly
- [ ] Authentication works
- [ ] Bible search functions
- [ ] Audio features work
- [ ] All API endpoints respond
- [ ] SSL certificate valid
- [ ] Performance metrics acceptable

### **Monitoring Setup**
- Set up uptime monitoring
- Configure error alerting
- Monitor API rate limits
- Track user engagement metrics

## 🆘 **Emergency Procedures**

### **Site Down**
1. Check Netlify deployment status
2. Verify DNS configuration
3. Check SSL certificate validity
4. Review error logs
5. Activate backup site if needed

### **API Failures**
1. Check API key validity
2. Verify rate limit status
3. Test fallback systems
4. Monitor error rates
5. Communicate with users

### **Database Issues**
1. Check Supabase status
2. Verify connection strings
3. Review query performance
4. Check backup availability
5. Implement read-only mode if needed

---

**For emergency support during deployment, contact:**
- **Technical**: alicia@graces.church
- **Spiritual**: essie@graces.church
- **Emergency**: Available through Sister Grace AI 24/7

