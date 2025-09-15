# Welcome to Aimigo-test! 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).
It is a test for a job at Aimigo!

## How to run the app?

1. **Android / iOS**

If your phone is an Android, install Expo Go with the Play Store. Otherwise, you won't need to install anything.

2. **Download this project**

3. **Start the app**

Open a terminal in the root of the project folder, and enter:

   ```bash
   npx expo start
   ```

4. **Run on your device**

You can open your phone’s camera, scan the QR code, and the app will run on your device.

## Technical choices

I am new to React Native, so I chose tools that are easy to learn while still being effective.

- React Native + Expo → cross-platform mobile app, fast development, easy access to native features.

- Redux → centralized state management for favorites and theme; avoids prop drilling and keeps global state predictable.

- Expo Router → file-based routing and tab navigation, which simplifies screen structure.

## The architecture of the project

- __app__: Manages the screens, main content, navigation bar, and footer.

- __assets and images__: Contains logos, icons, and other media used in the project.

- __components__: Includes reusable components like themed views/texts for light and dark mode, and the animated ParallaxScrollView.

- __constants__: Contains colors, fonts, and other constants used for themes.

- __hooks__: Provides reusable logic, such as managing light/dark mode globally across the app.

- __store__: Contains the Redux setup for managing global state. It centralizes state that needs to be shared across multiple screens.