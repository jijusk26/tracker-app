import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import AppBar from './src/components/appbar';
import StatusCard from './src/components/statscard';
import { Color } from './src/helpers/colors';
import { LocalStorageEnums } from './src/helpers/enums';
import { LocalStorage } from './src/helpers/localstorage';
import { setDate } from './src/helpers/store/reducers/dateslice';
const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

function Main() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const dispatch = useDispatch();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const storedDate = await LocalStorage.getItem(
      LocalStorageEnums.CURRENTMONTH,
    );

    const dateToSet = storedDate ? Number(storedDate) : new Date().getTime();
    await LocalStorage.setItem(
      LocalStorageEnums.CURRENTMONTH,
      dateToSet.toString(),
    );
    dispatch(setDate(dateToSet));
  };

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={isDarkMode ? Color.dark : Color.primary}
      />
      <AppBar />
      <StatusCard />
      <NavigationContainer>
        <Tab.Navigator
          screenListeners={{
            state: e => {
              const index = e.data.state.index;
              setCurrentIndex(index);
            },
          }}
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: Color.primary,
              height: 3,
            },
            tabBarLabelStyle: { fontWeight: '600' },
            tabBarStyle: {
              backgroundColor: '#fff',
              marginHorizontal: 5,
              borderRadius: 5,
            },
          }}
        >
          <Tab.Screen name="All">
            {() => (
              <Screen
                title="🏠 Home Screen"
                index={0}
                currentIndex={currentIndex}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Spent">
            {() => (
              <Screen
                title="🔍 Explore Screen"
                index={1}
                currentIndex={currentIndex}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="incoming">
            {() => (
              <Screen
                title="👤 Profile Screen"
                index={2}
                currentIndex={currentIndex}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Screen = ({ title, index, currentIndex }: any) => {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withTiming(currentIndex === index ? 1 : 0, {
      duration: 400,
    });
  }, [currentIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(progress.value, [0, 1], [0.95, 1]) },
        { translateY: interpolate(progress.value, [0, 1], [20, 0]) },
      ],
      opacity: interpolate(progress.value, [0, 1], [0.6, 1]),
    };
  });

  return (
    <Animated.View style={[styles.screen, animatedStyle]}>
      <Text style={styles.title}>{title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
  },
});

export default Main;
