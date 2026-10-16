// Copy this file to `config.ts` and fill in your own values:
//
//   cp config.example.ts config.ts
//
// `config.ts` is listed in .gitignore, so your keys never get committed.
// See the README section "Configuration" for where to find each value.

export const FIREBASE_CONFIG = {
  apiKey: 'YOUR_FIREBASE_WEB_API_KEY',
  authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_PROJECT_ID.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Google Maps key with the Directions API enabled.
// Restrict it in Google Cloud Console to your app (package name + SHA-1).
export const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';

// Firebase Realtime Database user node the demo listens to for SOC updates.
export const DEMO_USER_ID = 'YOUR_DEMO_USER_ID';
