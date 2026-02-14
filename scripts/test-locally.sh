#!/bin/bash

# Local Testing Script - Run before merging PRs
# Tests that dependency updates don't break anything

set -e

echo "🧪 Running local tests for PR validation..."
echo ""

# ============================================================================
# 1. Install Dependencies
# ============================================================================

echo "📦 Installing dependencies..."
npm install
cd api && npm install && cd ..
echo "✅ Dependencies installed"
echo ""

# ============================================================================
# 2. Security Audit
# ============================================================================

echo "🔒 Running security audit..."
npm audit --audit-level=high || {
    echo "⚠️  Security vulnerabilities found"
    echo "Run 'npm audit' for details"
}
echo ""

# ============================================================================
# 3. Test API Functions (Syntax Check)
# ============================================================================

echo "🧪 Testing API function syntax..."
for file in api/*.js; do
    if [ -f "$file" ]; then
        echo "  Testing $(basename $file)..."
        node --check "$file" && echo "  ✅ $(basename $file)" || echo "  ❌ $(basename $file) has errors!"
    fi
done
echo ""

# ============================================================================
# 4. Test Puppeteer (if installed)
# ============================================================================

if grep -q "puppeteer" package.json; then
    echo "🎭 Testing Puppeteer..."
    node -e "
        const puppeteer = require('puppeteer');
        console.log('  Puppeteer version:', require('puppeteer/package.json').version);
        console.log('  ✅ Puppeteer loads successfully');
    " || echo "  ❌ Puppeteer failed to load"
    echo ""
fi

# ============================================================================
# 5. Check Website Files
# ============================================================================

echo "🌐 Checking website files..."
if [ -f "website/index.html" ]; then
    echo "  ✅ website/index.html exists"
else
    echo "  ❌ website/index.html missing!"
fi
echo ""

# ============================================================================
# 6. Check Vercel Config
# ============================================================================

echo "⚡ Checking Vercel configuration..."
if [ -f "vercel.json" ]; then
    cat vercel.json | jq empty && echo "  ✅ vercel.json is valid" || echo "  ❌ vercel.json has syntax errors"
else
    echo "  ⚠️  No vercel.json found"
fi
echo ""

# ============================================================================
# 7. Dependency Size Check
# ============================================================================

echo "📊 Checking dependency sizes..."
echo "  node_modules size: $(du -sh node_modules/ 2>/dev/null | cut -f1 || echo 'N/A')"

TOTAL_DEPS=$(npm list --depth=0 --json 2>/dev/null | jq '.dependencies | keys | length' || echo "0")
echo "  Total direct dependencies: $TOTAL_DEPS"

if [ "$TOTAL_DEPS" -gt 50 ]; then
    echo "  ⚠️  Large number of dependencies"
else
    echo "  ✅ Dependency count reasonable"
fi
echo ""

# ============================================================================
# Summary
# ============================================================================

echo "✅ Local tests complete!"
echo ""
echo "Next steps:"
echo "  1. Review test results above"
echo "  2. If all tests pass, the PR is safe to merge"
echo "  3. Merge the PR on GitHub"
echo "  4. Vercel will auto-deploy"
echo ""
