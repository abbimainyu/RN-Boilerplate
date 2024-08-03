import React, {useCallback} from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabBarButtonProps,
} from '@react-navigation/bottom-tabs';

import type {BottomTabStackParamList, TabArrList} from './types';
import HomeScreen from '../../screens/Home';
import TabButton from './TabButton';
import ListScreen from '../../screens/List';

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

const BottomNavigation = () => {
  const TabArr: Array<TabArrList & {options?: BottomTabNavigationOptions}> = [
    {
      name: 'Home',
      component: HomeScreen,
      activeIcon: require('../../Assets/icons/HomeFocus.png'),
      inActiveIcon: require('../../Assets/icons/HomeUnFocus.png'),
      options: {
        headerShown: false,
      },
    },
    {
      name: 'List',
      component: ListScreen,
      activeIcon: require('../../Assets/icons/ListFocus.png'),
      inActiveIcon: require('../../Assets/icons/ListUnFocus.png'),
      options: {
        headerShown: false,
      },
    },
  ];

  const TabBarButton = useCallback(
    (props: BottomTabBarButtonProps, item: TabArrList) => (
      <TabButton {...props} item={item} />
    ),
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          alignContent: 'center',
          height: 70,
          paddingHorizontal: 12,
        },
        lazy: false,
        tabBarShowLabel: false,
      }}
      initialRouteName="Home">
      {TabArr.map((routeConfig, index) => (
        <Tab.Screen
          key={`${routeConfig.name}-${index}`}
          name={routeConfig.name}
          component={routeConfig.component}
          options={{
            tabBarButton: props => TabBarButton(props, routeConfig),
            ...routeConfig.options,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;
