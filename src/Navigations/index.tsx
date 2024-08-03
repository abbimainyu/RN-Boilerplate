/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import type {AppStackParamList} from './types';
import BottomNavigation from './Bottom';

export const Stack = createNativeStackNavigator<AppStackParamList>();

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigate = <RouteName extends keyof AppStackParamList>(
  ...args: undefined extends AppStackParamList[RouteName]
    ?
        | [screen: RouteName]
        | [screen: RouteName, params: AppStackParamList[RouteName]]
    : [screen: RouteName, params: AppStackParamList[RouteName]]
) => {
  try {
    navigationRef.current?.navigate(...args);
  } catch (error) {
    if (__DEV__) {
      console.error('Navigation', error, 'error when invoke navigate()');
    }
  }
};

const MainNavigator = () => {
  const {top} = useSafeAreaInsets();

  const onStackNavigationReady = () => {
    if (__DEV__) {
      console.log('[LOG] App is Ready');
    }
  };

  const handleStateChange = (state: any) => {
    const currentRoute = state.routes[state.index];
    console.info(
      '[LOG] Active Screen =>',
      currentRoute?.state?.routeNames[currentRoute?.state?.index],
    );
  };

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        onReady={onStackNavigationReady}
        onStateChange={handleStateChange}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={BottomNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <SafeAreaView
        style={{backgroundColor: 'transparent', marginBottom: -top}}
      />
    </>
  );
};

export default MainNavigator;
