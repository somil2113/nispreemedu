# 🚀 Offline Mode - LocalStorage Implementation

The project has been migrated to run entirely in the browser using `localStorage`. No backend server or MongoDB is required.

## How to Run:
1. Open the `edtech-website` folder in VS Code.
2. Right-click `index.html` → "Open with Live Server".
3. That's it!

## Features:
- **Authentication**: You can "register" new users and "login" (data is saved in your browser).
- **Courses**: Loaded from a local data file (`data/courses_data.js`).
- **Enrollment**: Buying a course updates your local user profile.
- **Data Persistence**: Refreshing the page keeps your login state and purchases.

## Default Users:
- **Admin**: `admin@gurukul.com` / `password123`
- **Student**: `student@gurukul.com` / `password123`

## Reset Data:
To clear all data, open the browser's Developer Tools -> Application -> Local Storage, and delete the entries for `http://127.0.0.1...`.
