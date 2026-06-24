# Authentication Domain Foundation

## Scope

This domain defines authentication constants, validation rules, cookie options, JWT payload shape, and security settings. It does not create routes, controllers, middleware protection, token signing, password hashing, cookies, or database connections.

## Cookie Strategy

Access and refresh tokens are designed for HTTP-only cookies. `httpOnly` keeps browser JavaScript from reading token values. `secure` is required in production so cookies travel only over HTTPS. `sameSite` is `strict` in production to reduce cross-site request risk and `lax` in development to keep local testing practical.

## JWT Strategy

JWT payloads are planned to include `userId`, `tokenType`, `iat`, and `exp`. Access tokens are short-lived at 15 minutes. Refresh tokens are longer-lived at 7 days and must be handled separately from access tokens by future route and middleware code.

## Password Policy

Passwords require 8 to 72 characters, at least one lowercase letter, one uppercase letter, and one number. Symbols are allowed but not required. This keeps the policy understandable while avoiding overly strict rules that push users toward predictable passwords.

## Future Compatibility

The authentication foundation is user-centric and keeps product domains decoupled. Public profiles, weekly reports, roadmaps, streaks, retention, and interview readiness can all reference a stable user identity without depending on auth implementation details. Future OAuth integrations can reuse normalized email handling and add provider identities without changing the token and cookie contracts.
