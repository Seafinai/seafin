#!/bin/bash

# Manual Security Check Script
# Run this locally to check for vulnerabilities before pushing

set -e

echo "🔍 Running security audit..."
echo ""

# Check root dependencies
echo "📦 Checking root dependencies..."
npm audit
echo ""

# Check API dependencies
echo "📦 Checking API dependencies..."
cd api
npm audit
cd ..
echo ""

# Summary
echo "✅ Security audit complete!"
echo ""
echo "To auto-fix vulnerabilities, run:"
echo "  npm audit fix"
echo "  cd api && npm audit fix"
