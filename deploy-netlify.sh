#!/bin/bash
set -e

echo "🚀 Deploying Grace Church to Netlify..."

# Set Netlify token
export NETLIFY_AUTH_TOKEN="nfp_eVrF9uf6Ybz7a6QJ834GA1qDnTKta9Y3bc9a"

# Install netlify-cli if not available
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Build the application
echo "🔨 Building application..."
source ~/.bashrc && bun run build

# Deploy to Netlify
echo "🌐 Deploying to Netlify..."
netlify deploy --prod --dir=.next --site=graces-church

echo "✅ Deployment complete!"
