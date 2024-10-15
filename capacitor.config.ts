import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "fr.bdemmi.app",
    appName: "BDE MMI",
    webDir: ".output/public/",

    plugins: {
        SplashScreen: {
            showSpinner: true,
            launchShowDuration: 0,
            androidScaleType: 'CENTER_CROP',
            splashFullScreen: true,
            splashImmersive: true
        },
    },
    
    ios: {
        icon: 'resources/ios/icon/AppIcon.appiconset',
    },
    android: {
        icon: 'resources/android/icon',
    },
};

export default config;
