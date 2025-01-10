import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ewallet.tanker.scan',
  appName: 'EWallet Tanker Scan',
  webDir: 'www',
  preferredContentMode:'mobile';
  server: {
    androidScheme: 'https'
  }
};

export default config;
