import { Linking, Platform } from 'react-native';
import NativeUtilityBridge from './NativeUtilityBridge';

export class UtilityBridge {
  requestReview = () => {
    if (Platform.OS === 'ios') {
      // Call native iOS module if present (TurboModule or old-arch)
      try {
        NativeUtilityBridge.requestReview?.();
      } catch {}
    } else {
      Linking.openURL('market://details?id=com.cicddemo');
    }
  };
}

export default new UtilityBridge();

