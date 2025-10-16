import React from 'react';
import { Color } from '../helpers/colors';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

const Button = ({
  onPress,
  title,
  type,
  style,
  textStyle,
}: {
  title: string;
  onPress: () => void;
  type: 'primary' | 'secondary' | 'text' | 'custom';
  style?: ViewStyle;
  textStyle?: TextStyle;
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
          borderRadius: 8,
        },
        style,
        {
          backgroundColor:
            type === 'primary'
              ? Color.primary
              : type === 'secondary'
              ? Color.dark
              : type === 'custom'
              ? style?.backgroundColor ?? 'transparent'
              : 'transparent',
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          {
            fontWeight: '800',
            fontSize: 16,
          },
          textStyle,
          {
            color:
              type === 'primary'
                ? Color.background
                : type === 'secondary'
                ? Color.background
                : textStyle?.color ?? Color.dark,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
