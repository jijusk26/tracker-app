import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomePage from './src/screens/homepage';
import { Color } from './src/helpers/colors';
// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import StatusCard from './src/components/statscard';
const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get('window');

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={isDarkMode ? Color.dark : Color.primary}
      />
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
            tabBarIndicatorStyle: { backgroundColor: '#007AFF', height: 3 },
            tabBarLabelStyle: { fontWeight: '600' },
            tabBarStyle: { backgroundColor: '#fff' },
          }}
        >
          <Tab.Screen name="Home">
            {() => (
              <Screen
                title="🏠 Home Screen"
                index={0}
                currentIndex={currentIndex}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Explore">
            {() => (
              <Screen
                title="🔍 Explore Screen"
                index={1}
                currentIndex={currentIndex}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Profile">
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

export default App;
