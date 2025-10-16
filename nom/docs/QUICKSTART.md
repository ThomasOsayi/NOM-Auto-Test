# 🚀 NOM MVP - Quick Start Guide

Get the app running in 15 minutes!

---

## ⏱️ Step 1: Firebase Setup (5 minutes)

### Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click **"Add project"**
3. Name it **"NOM-MVP"**
4. Disable Google Analytics (optional)
5. Click **"Create project"**

### Enable Authentication
1. Click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Click **"Email/Password"**
4. Toggle **"Enable"** and save

### Create Firestore Database
1. Click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Select **"Start in test mode"**
4. Choose a location close to you
5. Click **"Enable"**

### Enable Storage
1. Click **"Storage"** in left sidebar
2. Click **"Get started"**
3. Start in **"test mode"**
4. Click **"Next"** and **"Done"**

### Get Firebase Config
1. Click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"**
4. Click the **web icon** `</>`
5. Register app with nickname: **"NOM Web"**
6. Copy the `firebaseConfig` object

---

## ⏱️ Step 2: Local Project Setup (3 minutes)

### Create .env File
```bash
# In nom/ directory, create .env file
cp .env.example .env
```

Then paste your Firebase config values:
```env
EXPO_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=nom-mvp.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=nom-mvp
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=nom-mvp.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
```

### Install Dependencies
```bash
cd nom
npm install
```

---

## ⏱️ Step 3: Start Development Server (2 minutes)
```bash
npx expo start
```

You should see a QR code in the terminal.

---

## ⏱️ Step 4: Test on Your Phone (3 minutes)

### Install Expo Go
- **iOS**: Download from App Store
- **Android**: Download from Play Store

### Connect to Dev Server
1. **iOS**: Open Camera app and scan QR code
2. **Android**: Open Expo Go app and scan QR code

### Test Authentication Flow
1. App should open to **Login screen**
2. Tap **"Sign Up"**
3. Fill in:
   - Full Name: "Test User"
   - Email: "test@nom.com"
   - Password: "password123"
4. Select a dietary preference (optional)
5. Tap **"Create Account"**
6. Should navigate to **Explore screen** with mock NOMs
7. Tap logout icon (top right)
8. Should return to **Login screen**
9. Log back in with same credentials
10. Should see Explore screen again ✅

---

## ✅ Success Checklist

You'll know it's working when:
- [ ] QR code appears in terminal
- [ ] App loads on your phone
- [ ] Login screen shows beautiful gradient UI
- [ ] You can create an account
- [ ] You see 3 food posts in Explore feed
- [ ] Welcome message shows your name
- [ ] Like button turns red when tapped
- [ ] You can logout and login again

---

## 🐛 Troubleshooting

### "Firebase not defined" error
```bash
# Make sure .env file exists and has correct values
# Restart Expo server after creating .env
npx expo start -c
```

### Images not loading in Explore
- Wait 5-10 seconds (images take time to load)
- Check your internet connection

### "Unable to connect"
- Make sure phone and computer are on same WiFi
- Try tunnel mode: `npx expo start --tunnel`

---

**You're now running a fully functional auth system! 🎉**
