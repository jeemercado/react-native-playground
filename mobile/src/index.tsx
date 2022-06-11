import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import 'react-native-gesture-handler';

function Application() {
  const isDarkMode = useColorScheme() === 'dark';

  async function hideSplashScreen() {
    await RNBootSplash.hide({ fade: true });
  }

  useEffect(() => {
    hideSplashScreen();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>React Native Playground</Text>
    </SafeAreaView>
  );
}

function HeadlessCheck({ isHeadless }: any) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <Application />;
}

export default HeadlessCheck;
