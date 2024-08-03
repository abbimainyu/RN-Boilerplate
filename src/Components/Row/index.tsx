import React from 'react';
import {View, ViewStyle} from 'react-native';
import type {RowProps} from './types';

const Row: React.FC<RowProps> = props => {
  const {
    testID,
    children,
    style,
    justifyStart,
    justifyEnd,
    justifyCenter,
    justifyBetween,
    justifyAround,
    justifyEvently,
    itemsStart,
    itemsEnd,
    itemsCenter,
    itemsBaseline,
    itemsStretch,
    flex,
  } = props;

  const rowStyle = React.useMemo(() => {
    const rStyle: ViewStyle = {
      flexDirection: 'row',
    };
    if (justifyStart) {
      rStyle.justifyContent = 'flex-start';
    }
    if (justifyEnd) {
      rStyle.justifyContent = 'flex-end';
    }
    if (justifyCenter) {
      rStyle.justifyContent = 'center';
    }
    if (justifyBetween) {
      rStyle.justifyContent = 'space-between';
    }
    if (justifyAround) {
      rStyle.justifyContent = 'space-around';
    }
    if (justifyEvently) {
      rStyle.justifyContent = 'space-evenly';
    }

    if (itemsStart) {
      rStyle.alignItems = 'flex-start';
    }
    if (itemsEnd) {
      rStyle.alignItems = 'flex-end';
    }
    if (itemsCenter) {
      rStyle.alignItems = 'center';
    }
    if (itemsBaseline) {
      rStyle.alignItems = 'baseline';
    }
    if (itemsStretch) {
      rStyle.alignItems = 'stretch';
    }
    if (flex) {
      rStyle.flex = flex;
    }
    return rStyle;
  }, [props]);

  return (
    <View testID={testID} style={[rowStyle, style]}>
      {children}
    </View>
  );
};

export default React.memo(Row);
