# Optimized EV Charging

A React Native app that helps an electric-vehicle driver pick a charging station. It reads the car's live state of charge (SOC) from Firebase, shows nearby stations on a map, works out the driving distance and time to each one with the Google Directions API, and lets the driver send a charging request and accept the station's response.

<!-- Add a screenshot or short GIF of the app here, e.g. docs/demo.gif -->

## Features

- Sign up and log in with Firebase Authentication (email + password)
- Live SOC updates from Firebase Realtime Database
- Map with the driver's current location and three charging stations
- Route distance and travel time to each station (Google Directions)
- Request / accept flow for a charging slot, synced through Realtime Database

## Tech stack

- React Native 0.71 + TypeScript
- Redux Toolkit for auth state
- NativeBase UI
- Firebase Authentication + Realtime Database
- react-native-maps + react-native-maps-directions
- @react-native-community/geolocation, react-native-permissions

## How it works

1. The user signs up or logs in (`util/auth.ts` calls the Firebase Auth REST API).
2. On the home screen (`src/screens/Welcome.tsx`) the app asks for location permission and gets the current position.
3. It subscribes to `message/<userId>` in Realtime Database to receive SOC updates.
4. `src/components/mapComp/MapShow.tsx` draws the stations and requests a route to each one, collecting distance and duration.
5. Pressing **Request Initiate** sends the request; `src/components/Ui/actionAccept.tsx` listens on `initiateRequest/<userId>` for the station's response and shows the options with their travel times.

The three station locations are fixed demo points in `src/constants/LocationPlaces.ts`.

## Project structure

```text
.
├── App.tsx                  # Entry point: providers, auth gate, navigation
├── config.example.ts        # Template for your own keys (copy to config.ts)
├── src
│   ├── screens              # Login, SignUp, Welcome
│   ├── components
│   │   ├── Auth             # Auth form and inputs
│   │   ├── mapComp          # Map + routing
│   │   └── Ui               # Buttons, loading overlay, accept sheet
│   ├── features             # Redux auth slice
│   ├── constants            # Colors and station coordinates
│   ├── helpers              # Shared types and screen names
│   ├── permissions          # Location permission helper
│   └── MainNavigation       # Alternate navigation module
├── store                    # Redux store
├── util                     # Firebase init and auth helper
├── android
└── ios
```

## Configuration

No keys are stored in this repository. Before running the app you need your own Firebase project and Google Maps key.

1. **App config.** Copy the template and fill it in:

   ```bash
   cp config.example.ts config.ts
   ```

   Values come from Firebase Console → Project settings → Your apps (web app). `config.ts` is git-ignored.

2. **Firebase native config.** Download `google-services.json` from Firebase Console and place it at `android/app/google-services.json` (git-ignored). For iOS, add `GoogleService-Info.plist` to `ios/`.

3. **Google Maps key (Android).** Add this line to `android/local.properties` (git-ignored):

   ```properties
   MAPS_API_KEY=your_key_here
   ```

   Enable the Maps SDK for Android and the Directions API for this key, and restrict it to your app's package name and SHA-1 in Google Cloud Console.

4. **Database rules.** Make sure your Realtime Database rules only allow signed-in users to read and write their own nodes, not open "test mode" rules.

## Getting started

Requirements: Node.js (LTS), a React Native development environment, Android Studio (Android) or Xcode + CocoaPods (iOS, macOS only).

```bash
npm install
npm start          # Metro bundler
npm run android    # in a second terminal
npm run ios        # macOS only
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the Metro bundler |
| `npm run android` | Build and run on Android |
| `npm run ios` | Build and run on iOS |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |

## Limitations and next steps

- Station locations are hardcoded demo points; a real version would load them from an API.
- The SOC listener uses a fixed demo user ID (`DEMO_USER_ID` in `config.ts`) rather than the signed-in user.
- Station choice is shown by travel time only; ranking by SOC, charger availability and price would be the natural next step.
