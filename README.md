# Optimized EV Charging (React Native)

A React Native mobile app for EV users that authenticates with Firebase, reads live battery/SOC values, compares nearby charging options, and helps users pick a charging route based on distance/time.

## What this project does
- User sign up/login with Firebase Authentication
- Reads SOC / message updates from Firebase Realtime Database
- Shows current user location on map
- Displays 3 charging station options
- Calculates route distance and duration to each station using Google Directions
- Lets user select/accept a preferred charging option

## Tech stack
- React Native 0.71 + TypeScript
- Redux Toolkit + React Redux
- NativeBase UI
- Firebase (Auth + Realtime Database)
- react-native-maps + react-native-maps-directions
- @react-native-community/geolocation + permissions

## Project structure

```text
.
├── App.tsx                         # App entry, auth gate, navigation, providers
├── src
│   ├── screens                     # Screen-level UI (Login, SignUp, Welcome)
│   ├── components
│   │   ├── Auth                    # Auth form/input components
│   │   ├── mapComp                 # Map + routing UI logic
│   │   └── Ui                      # Reusable UI pieces (buttons, overlays, actions)
│   ├── features
│   │   └── authentication          # Redux auth slice/state actions
│   ├── constants                   # Color and fixed location constants
│   ├── helpers                     # Shared interfaces and screen constants
│   ├── permisssions                # Location permission helper
│   ├── assets                      # Static assets (e.g., SVG icons)
│   └── MainNavigation              # Alternate/experimental navigation module
├── store
│   └── store.ts                    # Redux store setup
├── util
│   ├── auth.ts                     # Firebase Auth API helper
│   └── firebase.ts                 # Firebase app/database initialization
├── android                         # Android native project
├── ios                             # iOS native project
└── __tests__                       # Jest tests
```

## Requirements

### Core tools
- Node.js (LTS recommended)
- npm or Yarn
- React Native development environment

### Android
- Android Studio
- Android SDK + emulator (or physical Android device)

### iOS (macOS only)
- Xcode
- CocoaPods

## Configuration needed before running

1. **Firebase setup**
   - Create your Firebase project (Auth + Realtime Database).
   - Replace Firebase config values in:
     - `/home/runner/work/Optimized-EV-CHARGING/Optimized-EV-CHARGING/util/firebase.ts`
     - `/home/runner/work/Optimized-EV-CHARGING/Optimized-EV-CHARGING/util/auth.ts`

2. **Google Maps Directions key**
   - Add a valid Google Maps API key in:
     - `/home/runner/work/Optimized-EV-CHARGING/Optimized-EV-CHARGING/src/components/mapComp/MapShow.tsx`
   - Replace `ADD your Google API key here`.

3. **Platform native setup**
   - Ensure Firebase and maps native setup are completed for Android/iOS (package configuration files, platform permissions, API key wiring).

## Installation

From `/home/runner/work/Optimized-EV-CHARGING/Optimized-EV-CHARGING`:

```bash
npm install
```

## Run the app

### Start Metro
```bash
npm start
```

### Android
```bash
npm run android
```

### iOS (macOS)
```bash
npm run ios
```

## Available scripts
- `npm run start` – start Metro bundler
- `npm run android` – run Android app
- `npm run ios` – run iOS app
- `npm run lint` – run ESLint
- `npm test` – run Jest tests

## Typical app flow
1. User signs up or logs in
2. App requests location permission
3. App fetches current location and SOC data
4. Map shows nearby charging stations and route stats
5. User initiates and accepts preferred charging option

## Notes
- Some files include hardcoded sample IDs/keys and placeholder values for development.
- For production, move all secrets/keys to secure environment configuration and rotate exposed keys.
