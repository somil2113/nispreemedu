# 🚀 Quick Start - One Command Fix

## For macOS/Linux:

```bash
# Make script executable
chmod +x /Users/mall/Documents/gurukul/start.sh

# Run it
/Users/mall/Documents/gurukul/start.sh
```

## For Windows:

```bash
# Run the batch file
start.bat
```

---

## What This Does:

1. ✅ Starts MongoDB
2. ✅ Seeds database with 12 courses
3. ✅ Starts Express backend server
4. ✅ Shows you all endpoints ready to use

---

## After Script Runs:

1. **Test Backend is Working:**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **View Courses:**
   ```bash
   curl http://localhost:5000/api/courses
   ```

3. **Open Website:**
   - In VS Code: Right-click `index.html` → "Open with Live Server"
   - Or: Open file directly in browser
   - Go to: `http://127.0.0.1:5500/edtech-website/index.html`

---

## Verify It's Working:

You should see:
- ✅ Courses loading from database
- ✅ No error messages
- ✅ Can register/login
- ✅ Can buy courses

---

## If Something Goes Wrong:

Check the log files:
```bash
cat logs/mongodb.log      # MongoDB errors
cat logs/backend.log      # Backend errors
cat logs/seed.log         # Database seed errors
```

---

## Manual Alternative (If Script Fails):

**Terminal 1:**
```bash
mongod
```

**Terminal 2:**
```bash
cd /Users/mall/Documents/gurukul/edtech-backend
npm install
npm run seed
npm run dev
```

**Terminal 3:**
- Open `index.html` with Live Server

---

**That's it! The platform should now be fully working.** 🎉
