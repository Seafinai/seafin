# Security Vulnerability Management

## Automated Security System

This project uses a **fully automated vulnerability assessment system** that runs weekly and auto-updates vulnerable dependencies.

### System Components

1. **GitHub Dependabot** (`.github/dependabot.yml`)
   - Runs every Monday at 9:00 AM UTC
   - Automatically scans dependencies for vulnerabilities
   - Creates PRs to update vulnerable packages
   - Groups security updates to reduce PR noise

2. **GitHub Actions Security Scan** (`.github/workflows/security-scan.yml`)
   - Weekly comprehensive security audit
   - Runs `npm audit` on all package.json files
   - Automatically fixes vulnerabilities using `npm audit fix`
   - Creates PR with fixes for review
   - Creates issues for vulnerabilities that can't be auto-fixed

### How It Works

```
Every Monday 9:00 AM UTC
    ↓
Dependabot scans dependencies
    ↓
Creates PR for vulnerable packages
    ↓
GitHub Actions runs npm audit
    ↓
Auto-fixes vulnerabilities
    ↓
Creates PR with security updates
    ↓
Review & merge PR
    ↓
Vercel auto-deploys to production
```

### Manual Security Checks

**Check for vulnerabilities:**
```bash
npm run security:check
```

**Auto-fix vulnerabilities:**
```bash
npm run security:fix
```

**Force-fix (may include breaking changes):**
```bash
npm run security:fix-force
```

**Using the script:**
```bash
./scripts/security-check.sh
```

### Monitoring

- **Weekly PRs**: Check for PRs labeled `security` or `dependencies`
- **GitHub Actions**: View workflow runs at `Actions` → `Weekly Security Scan`
- **Dependabot Alerts**: View at `Security` → `Dependabot alerts`

### What Gets Updated

- Root dependencies (`package.json`)
- API dependencies (`api/package.json`)
- GitHub Actions workflows (`.github/workflows/*.yml`)

### Security Update Policy

- **Patch updates**: Auto-merged (e.g., 1.0.0 → 1.0.1)
- **Minor updates**: Requires review (e.g., 1.0.0 → 1.1.0)
- **Major updates**: Requires manual review (e.g., 1.0.0 → 2.0.0)

### Current Dependencies

**Root:**
- `puppeteer` (dev dependency for screenshots)

**API:**
- No external dependencies (uses native Node.js features)

### Notifications

Security PRs are automatically assigned to:
- Repository owner
- `Seafinai/maintainers` team (if configured)

### Troubleshooting

**If vulnerabilities can't be auto-fixed:**
1. Check the PR comments for details
2. Run `npm audit` locally to see the full report
3. Consider:
   - Manually updating to a newer version
   - Finding an alternative package
   - Accepting the risk if it doesn't apply to your use case

**If PRs aren't being created:**
1. Check Dependabot is enabled: `Settings` → `Security` → `Dependabot`
2. Check workflow permissions: `Settings` → `Actions` → `Workflow permissions`
3. Ensure permissions include "Read and write" for workflows

### Additional Resources

- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [npm audit Documentation](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [GitHub Actions Security](https://docs.github.com/en/actions/security-guides)

---

**Last Updated:** 2026-02-14
**Scan Frequency:** Weekly (Mondays @ 9:00 AM UTC)
**Auto-Fix:** Enabled
**Manual Review:** Required for major updates
