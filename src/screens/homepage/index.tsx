import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Color } from '../../helpers/colors';

function HomePage() {
  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.background,
  },
  text: {
    color: Color.dark,
    fontSize: 24,
  },
});

export default HomePage;
