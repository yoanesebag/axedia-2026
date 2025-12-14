# Login Portal Implementation Plan

## Overview
Create a login portal for the Axedia dashboard with two user types:
1. **Admin (You)** - Can see all clients and switch between them
2. **Client** - Can only see their own data

## Key Question Before Proceeding

**Is this dashboard meant to be a functional system with a real backend, or should it remain a static demo/prototype?**

### Option A: Static Demo (Recommended for now)
- Create a login page that simulates authentication
- Store "user state" in browser localStorage
- Hard-code a few demo accounts (your admin account + a couple client demos)
- Good for presentations and demos, but no real security
- Can be built quickly with just HTML/CSS/JS

### Option B: Real Backend (More complex)
- Would require setting up a backend (Node.js, Firebase, Supabase, etc.)
- Real authentication, database for users/clients
- More work, but production-ready

---

## Proposed Implementation (Option A - Static Demo)

### Files to Create:
1. `login.html` - Login page
2. `login.css` - Login page styles
3. `auth.js` - Authentication simulation logic

### Files to Modify:
1. `dashboard.html` - Add client selector for admin, protect with auth check
2. `dashboard.js` - Add auth state handling, client switching logic

### Features:

#### Login Page (`login.html`)
- Clean, branded login form matching Axedia's dark theme
- Email/password fields
- Error handling for invalid credentials
- Redirect to dashboard on success

#### Demo Accounts:
```
Admin:
- Email: admin@axedia.io
- Password: demo123
- Role: admin
- Can see: All clients + client selector dropdown

Clients:
- Email: contact@sharplaw.com / Password: sharp123 → Sharp Law LLP
- Email: contact@russofirm.com / Password: russo123 → The Russo Firm
```

#### Admin Features:
- Client selector dropdown in sidebar header
- Switch between clients to see their specific data
- See all clients' aggregate data in overview

#### Client Features:
- Only sees their own dashboard
- No client selector visible
- User info in sidebar shows their firm name

#### Auth Flow:
1. User visits `login.html`
2. Enters credentials
3. JS validates against hardcoded accounts
4. On success: stores user info in localStorage, redirects to `dashboard.html`
5. `dashboard.html` checks for valid session on load
6. If no session, redirects back to `login.html`
7. Logout button clears session and redirects to login

### Implementation Steps:

1. **Create login page** with form and styling
2. **Create auth.js** with:
   - Demo user accounts
   - Login validation function
   - Session management (localStorage)
   - Logout function
3. **Modify dashboard.html**:
   - Add script tag for auth.js
   - Add client selector dropdown for admin
   - Add logout button
4. **Modify dashboard.js**:
   - Add auth check on page load
   - Add client switching functionality
   - Update displayed data based on selected client

---

## Waiting for Approval

Please confirm:
1. **Option A (Static Demo)** or **Option B (Real Backend)**?
2. Any specific client names you want me to use as demos?
3. Should the client selector show different mock data for each client, or just change the display name?
