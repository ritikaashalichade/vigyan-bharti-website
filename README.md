# Vigyan Bharti – Student / Mentor / Admin portal

Run it:

    npm install
    npm run dev

## Pages
| Who | Address | Notes |
|---|---|---|
| Everyone | `/`, `/login`, `/register`, `/forgot` | Website + sign-in |
| Student | `/student/...` | Dashboard, assignments, lectures, doubts, results, **My Profile** (photo + details), settings |
| Mentor | `/mentor` | Sees the students the admin assigned to them |
| Admin | `/admin/...` | Separate panel. Students / Mentors (view, edit, add, deactivate, delete, reset password), Mentor Allocation, and the rest |

Logging in sends each person to their own area automatically (admin -> `/admin`).

## Demo accounts (password `demo1234`)
- Admin: `admin@school.edu`
- Mentor: `mentor@school.edu`
- Student: `demo@school.edu`

## Notes
- All data is saved in the browser (localStorage) through `src/lib/store.ts`. Replace the functions in that one file with API calls when the backend is ready.
- Font: one font stack for all pages, set in `src/index.css`.
- Admin accounts cannot be created from the public Register page.
