import React from 'react';

import type {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';

import type {CustomIconProps} from '@atoms/types';

export type BottomTabStackParamList = {
  Home: undefined;
  List: undefined;
};

export type TabArrList = {
  name: keyof BottomTabStackParamList;
  component: React.ComponentType<any>; // Use React.ComponentType to represent any React component
  activeIcon: CustomIconProps['name'];
  inActiveIcon: CustomIconProps['name'];
};

export interface TabButtonProps extends BottomTabBarButtonProps {
  item: TabArrList;
}
