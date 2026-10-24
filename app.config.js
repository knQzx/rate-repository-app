import 'dotenv/config';

export default {
  name: 'rate-repository-app',
  slug: 'rate-repository-app',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  updates: {
    url: 'https://u.expo.dev/7d9e256f-6aa9-4b08-92ce-bb29d375bdc1',
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  extra: {
    apolloUri: process.env.APOLLO_URI,
    eas: {
      projectId: '7d9e256f-6aa9-4b08-92ce-bb29d375bdc1',
    },
  },
};
