import NfcManager, {NfcTech, NfcError} from 'react-native-nfc-manager';
import {useState, useEffect} from 'react';

const useNfc = () => {
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    NfcManager.start()
      .then(() => console.log('[NFC] Manager started'))
      .catch(error => console.warn('[NFC] Failed to start manager', error));

    return () => {
      NfcManager.cancelTechnologyRequest();
    };
  }, []);

  const readNfc = async () => {
    if (isReading) {
      console.log('[NFC] Reading already in process');
      return;
    }

    setIsReading(true);

    try {
      const isSupported = await NfcManager.isSupported();
      if (!isSupported) {
        console.log('[NFC] Device does not support NFC');
        setIsReading(false);
        return;
      }

      await NfcManager.requestTechnology(NfcTech.Ndef);

      const readTimeout = setTimeout(async () => {
        console.log('[NFC] Reading timed out');
        await NfcManager.cancelTechnologyRequest();
        setIsReading(false);
      }, 5000);

      const tag = await NfcManager.getTag();
      clearTimeout(readTimeout);

      if (tag) {
        console.log('[NFC] Tag found', tag);
      } else {
        console.log('[NFC] No tag found');
      }
      
    } catch (error) {
      if (error instanceof NfcError && error.type === 'cancelled') {
        console.log('[NFC] Reading cancelled');
      } else {
        console.error('[NFC] Error reading tag', error);
      }
    } finally {
      setIsReading(false);
      await NfcManager.cancelTechnologyRequest();
    }
  };

  const cancelReadNfc = async () => {
    console.log('[NFC] Cancelling read process');
    await NfcManager.cancelTechnologyRequest();
    setIsReading(false);
  };

  return {readNfc, cancelReadNfc, isReading};
};

export default useNfc;
