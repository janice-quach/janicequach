const PASSWORD = 'monsterra'
const COOKIE_NAME = 'jq_access'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

const LOGIN_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>janice quach</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "Inter", -apple-system, sans-serif;
      background: #f4f1eb;
      color: #2a2520;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 280px;
    }
    input {
      padding: 0.75rem 1rem;
      border: 1px solid rgba(42, 37, 32, 0.2);
      background: rgba(255,255,255,0.6);
      border-radius: 6px;
      font-size: 0.95rem;
      color: #2a2520;
      outline: none;
    }
    input:focus { border-color: rgba(42, 37, 32, 0.5); }
    button {
      padding: 0.75rem;
      background: #2a2520;
      color: #f4f1eb;
      border: none;
      border-radius: 6px;
      font-size: 0.85rem;
      letter-spacing: 0.08em;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    button:hover { opacity: 0.8; }
    .error { font-size: 0.8rem; color: rgba(42,37,32,0.5); text-align: center; }
  </style>
</head>
<body>
  <form method="POST">
    <input type="password" name="password" placeholder="password" autofocus autocomplete="current-password">
    <button type="submit">enter</button>
    {{ERROR}}
  </form>
</body>
</html>`

export const onRequest: PagesFunction = async ({ request, next }) => {
  const url = new URL(request.url)

  // Public: everything except individual blog posts
  if (!url.pathname.startsWith('/blog/')) return next()

  // /blog/[slug] requires auth
  const cookie = request.headers.get('cookie') || ''
  const hasAccess = cookie.split(';').some((c) => c.trim() === `${COOKIE_NAME}=${PASSWORD}`)

  if (hasAccess) return next()

  if (request.method === 'POST') {
    const body = await request.formData()
    const attempt = body.get('password')?.toString() ?? ''
    if (attempt === PASSWORD) {
      const response = Response.redirect(url.toString(), 302)
      response.headers.set(
        'Set-Cookie',
        `${COOKIE_NAME}=${PASSWORD}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax; Secure`,
      )
      return response
    }
    return new Response(
      LOGIN_HTML.replace('{{ERROR}}', '<p class="error">wrong password</p>'),
      { status: 401, headers: { 'Content-Type': 'text/html' } },
    )
  }

  return new Response(
    LOGIN_HTML.replace('{{ERROR}}', ''),
    { status: 200, headers: { 'Content-Type': 'text/html' } },
  )
}
