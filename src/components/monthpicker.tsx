import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { Color } from '../helpers/colors';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../helpers/store/store';
import Button from './button';
import { LocalStorage } from '../helpers/localstorage';
import { LocalStorageEnums } from '../helpers/enums';
import { setDate } from '../helpers/store/reducers/dateslice';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const CustomMonthPicker = () => {
  const [visible, setVisible] = useState(false);
  const { width } = useWindowDimensions();
  const state = useSelector((s: RootState) => s.date);
  const [selectedMonth, setSelectedMonth] = useState(
    new Date(state.selectedDate).getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState(
    new Date(state.selectedDate).getFullYear(),
  );
  const dispatch = useDispatch();

  const years = Array.from({ length: 10 }, (_, i) => 2025 + i);

  const selectAMonth = async () => {
    const selected = new Date();
    selected.setMonth(selectedMonth);
    selected.setFullYear(selectedYear);

    await LocalStorage.setItem(
      LocalStorageEnums.CURRENTMONTH,
      selected.getTime().toString(),
    );

    dispatch(setDate(selected.getTime()));
    setVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#00000088',
      alignItems: 'center',
    },
    wrapper: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: width * 0.9,
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      gap: 20,
    },
    button: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: Color.background,
      borderRadius: 8,
    },
  });

  return (
    <>
      <Text
        style={{ marginTop: 10, color: Color.background }}
        onPress={() => setVisible(true)}
      >
        {months[new Date(state.selectedDate).getMonth()]}{' '}
        {new Date(state.selectedDate).getFullYear()}
      </Text>

      <Modal
        visible={visible}
        animationType="slide"
        transparent
        statusBarTranslucent
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={{ fontSize: 20, marginBottom: 10, fontWeight: '500' }}>
              Select Month
            </Text>
            <View style={{ marginVertical: 10 }}>
              <FlatList
                data={years}
                horizontal
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedYear(item)}
                    style={{
                      padding: 10,
                      paddingHorizontal: 20,
                      backgroundColor:
                        item === selectedYear ? '#ddd' : 'transparent',
                      borderRadius: 8,
                      marginRight: 5,
                    }}
                  >
                    <Text>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>

            <FlatList
              data={months}
              keyExtractor={item => item}
              numColumns={3}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => setSelectedMonth(index)}
                  style={{
                    backgroundColor:
                      index === selectedMonth ? '#ddd' : 'transparent',
                    borderRadius: 8,
                    width: (width * 0.9 - 40) / 3,
                    paddingVertical: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <View style={styles.buttonWrapper}>
              <Button
                type="secondary"
                onPress={() => setVisible(false)}
                title="Close"
              />
              <Button type="primary" onPress={selectAMonth} title="Select" />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
