import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Color } from '../helpers/colors';
import { CustomMonthPicker } from './monthpicker';

const AppBar = () => {
  return (
    <View
      style={{
        height: 50,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        elevation: 10,
        backgroundColor: Color.primary,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          color: Color.background,
          fontWeight: '700',
        }}
      >
        Jiju S
      </Text>
      <CustomMonthPicker />
    </View>
  );
};

export default AppBar;
