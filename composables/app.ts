import { StatusBar, Style } from '@capacitor/status-bar';

function configureStatusBar() {
    StatusBar.setBackgroundColor({ color: '#030712' });
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setOverlaysWebView({ overlay: true });
}

configureStatusBar();