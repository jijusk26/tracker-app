import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomePage from './src/screens/homepage';
import { Color } from './src/helpers/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={isDarkMode ? Color.dark : Color.primary}
      />
      <HomePage />
    </SafeAreaProvider>
  );
}

export default App;
