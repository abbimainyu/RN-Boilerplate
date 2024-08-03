import React from 'react';
import {View} from 'react-native';

import type {GapProps} from './types';

const Gap: React.FC<GapProps> = ({width = 0, height = 0, style}) => {
  return <View style={[style, {width: width, height: height}]} />;
};

export default React.memo(Gap);
