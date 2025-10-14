import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Color } from '../helpers/colors';
import Incoming from '../assets/svg/incoming.svg';
import Outgoing from '../assets/svg/outgoing.svg';

const StatusCard = () => {
  return (
    <View
      style={{
        height: 60,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: Color.background,
        margin: 5,
        flexDirection: 'row',
      }}
    >
      <View style={styles.buttonWrapper}>
        <Incoming width={30} height={30} fill="#000" />
        <Text style={{ color: 'red' }}>Helo</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <Outgoing width={30} height={30} fill="#000" />
        <Text style={{ color: 'red' }}>Helo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    borderRightWidth: 3,
    borderRightColor: '#e2dcdcff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
});

export default StatusCard;
