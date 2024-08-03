import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {BottomTabBarButtonProps} from '@react-navigation/bottom-tabs';

interface TabArrList {
  name: string;
  activeIcon: any;
  inActiveIcon: any;
}

interface TabButtonProps extends BottomTabBarButtonProps {
  item: TabArrList;
}

const TabButton: React.FC<TabButtonProps> = ({
  item,
  accessibilityState,
  onPress,
}) => {
  const focused = accessibilityState?.selected;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={focused ? item.activeIcon : item.inActiveIcon}
        style={styles.icon}
      />
      <Text style={[styles.label, focused && styles.focusedLabel]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 5,
  },
  label: {
    fontSize: 12,
    color: '#FF3131',
  },
  focusedLabel: {
    color: '#FF3131',
    fontWeight: '500',
    fontSize: 14,
  },
});

export default TabButton;
