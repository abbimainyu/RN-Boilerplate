/* eslint-disable react-native/no-inline-styles */
// screens/HomeScreen.tsx
import React, {useRef} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../utils/store';
import {increment, decrement} from '../../utils/reducers/nfcList';
import BottomSheet from '../../Components/BottomSheet';
import {BottomSheetRefObject} from '../../Components/BottomSheet/types';
import Gap from '../../Components/Gap';
import {NfcTag} from '../../Assets/icons';
import useNfc from '../../utils/useNfc';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.list.value);
  const btSheetRef = useRef<BottomSheetRefObject>(null);

  const {readNfc, cancelReadNfc} = useNfc();

  const scanNfc = () => {
    btSheetRef.current?.show();
    readNfc();
  };

  const cancelNfc = () => {
    btSheetRef.current?.dismiss();
    cancelReadNfc();
  };
  return (
    <View>
      <Text>Home Screen</Text>
      <Text>Value: {value}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Gap height={10} />
      <Button title="Bottom Sheet" onPress={() => scanNfc()} />
      <BottomSheet
        btSheetRef={btSheetRef}
        onDismiss={cancelNfc}
        textHeader="Scanning NFC"
        contentContainerStyle={{
          paddingVertical: 20,
          paddingHorizontal: 18,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Image
          source={NfcTag}
          style={{
            height: 108,
            width: 108,
            alignSelf: 'center',
          }}
        />
        <Gap height={10} />
        <Text style={{fontWeight: '400', color: '#FF3108', lineHeight: 22}}>
          Bring your NFC close to the device reader.
        </Text>
      </BottomSheet>
    </View>
  );
};

export default HomeScreen;
