import * as Font from 'expo-font';
import { useEffect } from 'react';

export function useFonts() {
  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          Inter: require('@expo-google-fonts/inter').default,
        });
      } catch (error) {
        console.warn('Failed to load Inter font:', error);
      }
    }
    loadFonts();
  }, []);
}
