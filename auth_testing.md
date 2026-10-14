# Auth testing
Owner: anna@annamaniacs.com / Portfolio!2026 (see /app/memory/test_credentials.md)
curl -c c.txt -X POST $URL/api/auth/login -H "Content-Type: application/json" -d '{"email":"anna@annamaniacs.com","password":"Portfolio!2026"}'
curl -b c.txt $URL/api/auth/me
Admin routes (/api/admin/*) must return 401 without cookie. 5 bad logins -> 429 lockout.
