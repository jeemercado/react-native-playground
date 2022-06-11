import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import RNBootSplash from 'react-native-bootsplash';

import { Colors, Header, LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';

function Application() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  async function hideSplashScreen() {
    await RNBootSplash.hide({ fade: true });
  }

  useEffect(() => {
    hideSplashScreen();
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        >
          <LearnMoreLinks />
        </View>
      </ScrollView>
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
