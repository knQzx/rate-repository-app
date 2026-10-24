# Rate Repository App

React Native app for the Full Stack Open React Native course (Expo SDK 55).

## Open the app

Scan the QR code with Expo Go (SDK 55):

![QR code for the published app](docs/qr-code.png)

The app is published with EAS Update to the `main` branch and uses the course's pre-deployed Rate Repository API.

## Run locally

```
npm install
npx expo start
```

Set `APOLLO_URI` in `.env` (or `EXPO_PUBLIC_APOLLO_URI`) to point to a running Rate Repository API.
