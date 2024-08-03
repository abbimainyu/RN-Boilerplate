/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import NfcManager from 'react-native-nfc-manager';

NfcManager.start()
  .then(() => console.log('[NFC] Manager started'))
  .catch(error => console.warn('[NFC] Failed to start manager', error));

AppRegistry.registerComponent(appName, () => App);
