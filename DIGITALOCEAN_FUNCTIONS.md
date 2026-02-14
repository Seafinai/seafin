# DigitalOcean Functions Deployment Guide

This guide ensures flawless deployment of serverless functions to DigitalOcean App Platform.

## Function Format (CRITICAL)

DigitalOcean Functions use a **different signature** than Next.js/Vercel/Express:

### ✅ Correct Format
```javascript
export async function main(event, context) {
  // Access request data from event object
  const { userInput } = event;  // POST body or query params
  const method = event.http.method;
  const headers = event.http.headers;

  return {
    body: { success: true, data: "response" },
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' }
  };
}
```

### ❌ Wrong Format (Next.js/Express style)
```javascript
// DO NOT USE THIS - It won't work!
export default async function handler(req, res) {
  res.status(200).json({ data });
}
```

## Event Object Structure

```javascript
{
  http: {
    method: "POST",
    path: "/api/default/function-name",
    headers: {
      "content-type": "application/json",
      // ... other headers
    }
  },
  // POST body fields become top-level properties:
  userInput: "example value",
  message: "example message"
}
```

## Required Directory Structure

```
website/api/
├── package.json              # { "type": "module" }
├── project.yml               # Function declarations
└── packages/
    └── default/
        ├── analyze-form.js   # export async function main(event)
        ├── chat.js           # export async function main(event)
        ├── rag-query.js      # export async function main(event)
        ├── _budget.js        # Shared utilities (prefixed with _)
        ├── _cors.js
        └── _middleware.js
```

## Configuration Files

### package.json (at api/ root)
```json
{
  "type": "module"
}
```

### project.yml (at api/ root)
```yaml
packages:
  - name: default
    functions:
      - name: analyze-form
        runtime: nodejs:default
        web: true

      - name: chat
        runtime: nodejs:default
        web: true

      - name: rag-query
        runtime: nodejs:default
        web: true
```

## Return Value Format

```javascript
{
  body: data,          // string | object | array
  statusCode: 200,     // HTTP status code
  headers: {}          // Optional response headers
}
```

**Body auto-conversion:**
- Objects/arrays → JSON with `Content-Type: application/json`
- Strings → Plain text or specified content-type
- Omit `body` for empty responses

## URL Pattern

Functions are accessible at:
```
https://your-app.ondigitalocean.app/api/default/function-name
```

Example:
- `POST /api/default/analyze-form`
- `POST /api/default/chat`
- `POST /api/default/rag-query`

## Environment Variables

Set in App Platform UI or app spec, NOT in project.yml:

```json
{
  "functions": [{
    "envs": [
      { "key": "OPENROUTER_API_KEY", "type": "SECRET", "scope": "RUN_TIME" },
      { "key": "MAX_DAILY_COST", "value": "5", "scope": "RUN_TIME" },
      { "key": "NODE_ENV", "value": "production", "scope": "RUN_TIME" }
    ]
  }]
}
```

Access in code:
```javascript
const apiKey = process.env.OPENROUTER_API_KEY;
```

## Common Deployment Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| "Nothing deployed" | Missing project.yml | Add project.yml at api/ root |
| "runtime type could not be determined" | package.json in wrong location | Move to api/ root, not packages/default/ |
| "All environment values must be strings" | Unquoted values in project.yml | Remove environment block (use app spec instead) |
| "Action does not exist in project" | Wrong directory structure | Use packages/default/ structure |
| 400 Bad Request at runtime | Wrong function signature | Use `main(event)` not `handler(req, res)` |

## Deployment Workflow

1. **Make changes** to function files in `website/api/packages/default/`
2. **Test locally** (optional, with doctl sandbox)
3. **Commit** to git: `git add . && git commit -m "Update functions"`
4. **Push** to main: `git push origin main`
5. **Auto-deploy** triggers in 60-90 seconds
6. **Verify** at https://seafin-website-jj4bi.ondigitalocean.app

## Testing Functions

```bash
# Test analyze-form
curl -X POST https://your-app.ondigitalocean.app/api/default/analyze-form \
  -H "Content-Type: application/json" \
  -d '{"userInput": "We need to automate email processing"}'

# Test chat
curl -X POST https://your-app.ondigitalocean.app/api/default/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What services do you offer?"}'

# Test rag-query
curl -X POST https://your-app.ondigitalocean.app/api/default/rag-query \
  -H "Content-Type: application/json" \
  -d '{"query": "How does RAG work?", "document": "..."}'
```

## References

- [DigitalOcean Functions Node.js Runtime](https://docs.digitalocean.com/products/functions/reference/runtimes/node-js/)
- [Functions Project Configuration](https://docs.digitalocean.com/products/functions/reference/project-configuration/)
- [How to Configure Functions](https://docs.digitalocean.com/products/functions/how-to/configure-functions/)
