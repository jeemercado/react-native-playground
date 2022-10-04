import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StatusBar, Text, useColorScheme } from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import EStyleSheet from 'react-native-extended-stylesheet';
import FastImage from 'react-native-fast-image';
import 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { gyroscope } from 'react-native-sensors';

LogBox.ignoreAllLogs(true);

EStyleSheet.build({});

const styles = {
  box: {
    alignSelf: 'center',
    backgroundColor: 'red',
    height: 300,
    marginTop: 32,
    width: 300,
  },
  button: {
    height: 80,
    width: 100,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  image: {
    borderRadius: 30,
    borderWidth: 1,
    elevation: 11,
    height: '100%',
    width: '100%',
  },
};

const imageSource =
  'https://images.unsplash.com/photo-1529066792305-5e4efa40fde9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2624&q=80';

function Application() {
  const isDarkMode = useColorScheme() === 'dark';
  const gyro = useSharedValue({ x: 0, y: 0 });
  const prev = useSharedValue({ x: 0, y: 0 });
  const derivedRotations = useDerivedValue(() => {
    let newX = prev.value.x;
    let newY = prev.value.y;

    newX = interpolate(gyro.value.x, [-2, 2], [0.5, -0.5], Extrapolate.CLAMP);
    newY = interpolate(gyro.value.y, [-2, 2], [0.5, -0.5], Extrapolate.CLAMP);
    prev.value = { x: newX, y: newY };

    return {
      x: newX,
      y: newY,
    };
  });
  const rotateX = useDerivedValue(() =>
    withTiming(derivedRotations.value.x, { duration: 200, easing: Easing.linear }),
  );
  const rotateY = useDerivedValue(() =>
    withTiming(derivedRotations.value.y, { duration: 200, easing: Easing.linear }),
  );

  async function hideSplashScreen() {
    await RNBootSplash.hide({ fade: true });
  }

  // -1.5
  useEffect(() => {
    const subscription = gyroscope.subscribe(({ x, y }) => {
      gyro.value = { x, y };
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    hideSplashScreen();
  }, []);

  const animatedStyles = {
    box: useAnimatedStyle(() => ({
      borderRadius: 30,
      borderWidth: 1,
      transform: [
        { perspective: 800 },
        { rotateX: `${rotateX.value}rad` },
        { rotateY: `${rotateY.value}rad` },
      ],
    })),
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text>React Native Playground</Text>
      <Animated.View style={[styles.box, animatedStyles.box]}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          source={{ uri: imageSource }}
          style={styles.image}
        />
      </Animated.View>
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
