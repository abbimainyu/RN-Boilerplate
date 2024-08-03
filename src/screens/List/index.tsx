// screens/HomeScreen.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../utils/store';
import {increment, decrement} from '../../utils/reducers/nfcList';

const ListScreen = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.list.value);

  return (
    <View>
      <Text>List Screen</Text>
      <Text>Value: {value}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default ListScreen;
