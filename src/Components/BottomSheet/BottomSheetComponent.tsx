/* eslint-disable react-native/no-inline-styles */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles, {ModalContainer} from './styles';
import type {BottomSheetProps, BottomSheetRefObject} from './types';

import Gap from '../Gap';
import Row from '../Row';

const BottomSheetComponent = forwardRef<BottomSheetRefObject, BottomSheetProps>(
  (
    {
      children,
      customHeader,
      maxHeight = 86,
      onTouchOutside,
      onDismiss,
      onShow,
      showHeader = true,
      styleHeader,
      textHeader,
      childrenWrapperStyle,
      contentContainerStyle,
      scrollEnabled,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const modalHeight = useRef(0);
    const panY = useRef(
      new Animated.Value(Dimensions.get('screen').height),
    ).current;

    const resetPositionAnim = useRef(
      Animated.timing(panY, {
        toValue: 0,
        duration: 520,
        useNativeDriver: true,
      }),
    ).current;

    const closeAnim = useRef(
      Animated.timing(panY, {
        toValue: Dimensions.get('screen').height,
        duration: 400,
        useNativeDriver: true,
      }),
    ).current;

    const translateY = panY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gs) => {
          panY.setValue(gs.dy < 0 ? 0 : gs.dy);
        },
        onPanResponderRelease: (e, gs) => {
          if (gs.dy > (30 / 100) * modalHeight.current || gs.vy > 0.3) {
            return closeAnim.start(() => setVisible(v => !v));
          }
          return resetPositionAnim.start();
        },
      }),
    ).current;

    useEffect(() => {
      if (visible) {
        resetPositionAnim.start();
        if (typeof onShow === 'function') {
          onShow();
        }
      } else {
        if (typeof onDismiss === 'function') {
          onDismiss();
        }
      }
    }, [visible]);

    const dismissModal = () => {
      closeAnim.start(() => {
        setVisible(false);
      });
    };
    const show = () => {
      panY.setValue(Dimensions.get('screen').height);
      setVisible(true);
    };

    useImperativeHandle(ref, () => ({
      dismiss: dismissModal,
      show,
    }));

    const Header = useMemo(() => {
      if (!showHeader) {
        return null;
      }

      if (customHeader) {
        return customHeader();
      }

      return (
        <>
          <Row justifyBetween itemsCenter style={{width: '100%'}}>
            <Text style={{fontWeight: 'bold', color: '#000', lineHeight: 22, fontSize: 18}}>
              {textHeader}
            </Text>

            <TouchableOpacity onPress={dismissModal}>
              <Text style={{fontWeight: '400', color: '#FF3131', lineHeight: 22}}>
                Close
              </Text>
            </TouchableOpacity>
          </Row>
          <Gap height={10} />
        </>
      );
    }, [showHeader, customHeader]);

    return (
      <Modal
        animationType="none"
        visible={visible}
        transparent
        onRequestClose={() => dismissModal()}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.container}>
          {/* ========================= Overlay Bottom Sheet ========================= */}
          <TouchableWithoutFeedback
            onPress={() => {
              dismissModal();
              if (onTouchOutside) {
                onTouchOutside();
              }
            }}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[ModalContainer(maxHeight), {transform: [{translateY}]}]}
            onLayout={e => (modalHeight.current = e.nativeEvent.layout.height)}>
            {/* Title and Header Bottom Sheet */}
            <View
              {...panResponder.panHandlers}
              style={[styles.headerModal, styleHeader]}>
              <View style={styles.lineModal} />
              {Header}
            </View>

            {/* Content of Bottom Sheet */}
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={contentContainerStyle}
              style={childrenWrapperStyle}
              scrollEnabled={scrollEnabled}>
              <View>{children}</View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </Modal>
    );
  },
);

export default BottomSheetComponent;
