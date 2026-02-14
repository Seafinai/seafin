#!/bin/bash
# Fix DigitalOcean Functions Deployment
# Usage: ./fix-digitalocean-functions.sh YOUR_DIGITALOCEAN_API_TOKEN

if [ -z "$1" ]; then
  echo "Error: Please provide your DigitalOcean API token as an argument"
  echo "Usage: ./fix-digitalocean-functions.sh YOUR_TOKEN"
  exit 1
fi

TOKEN="$1"

echo "🔧 Fixing DigitalOcean App Functions Deployment..."
echo ""

# Download doctl if not in /tmp
cd /tmp
if [ ! -f "./doctl" ] && [ ! -f "./doctl.exe" ]; then
  echo "📥 Downloading doctl..."
  curl -fsSL https://github.com/digitalocean/doctl/releases/download/v1.115.0/doctl-1.115.0-windows-amd64.zip -o doctl.zip
  unzip -o -q doctl.zip
  rm doctl.zip
fi

# Authenticate
echo "🔐 Authenticating with DigitalOcean..."
./doctl auth init --access-token "$TOKEN"

if [ $? -ne 0 ]; then
  echo "❌ Authentication failed. Please check your API token."
  exit 1
fi

echo ""
echo "📋 Listing your apps..."
./doctl apps list

echo ""
echo "🔍 Finding seafin-website app..."
APP_ID=$(./doctl apps list --format ID,Name --no-header | grep "seafin-website" | awk '{print $1}')

if [ -z "$APP_ID" ]; then
  echo "❌ Could not find seafin-website app. Here are your apps:"
  ./doctl apps list
  exit 1
fi

echo "✅ Found app ID: $APP_ID"
echo ""
echo "🚀 Updating app with functions component..."
./doctl apps update "$APP_ID" --spec /c/Projects/seafin/digitalocean-app-spec.json

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ App updated successfully!"
  echo ""
  echo "🔄 Deployment status:"
  ./doctl apps get-deployment "$APP_ID"
  echo ""
  echo "⏳ The functions component will deploy automatically."
  echo "📍 Check status at: https://cloud.digitalocean.com/apps/$APP_ID"
else
  echo "❌ Update failed. You may need to update manually in the DigitalOcean dashboard."
  echo "📍 Go to: https://cloud.digitalocean.com/apps"
  echo "   1. Click on 'seafin-website'"
  echo "   2. Go to Settings > App Spec"
  echo "   3. Replace the spec with the contents of digitalocean-app-spec.json"
fi
