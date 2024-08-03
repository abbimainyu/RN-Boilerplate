import React, {type PropsWithChildren} from 'react';

import type {StyleProp, ViewStyle} from 'react-native';

export type BottomSheetProps = PropsWithChildren<{
    customHeader?: () => React.JSX.Element;
    maxHeight?: number;
    onTouchOutside?: () => void;
    onDismiss?: () => void;
    onShow?: () => void;
    showHeader?: boolean;
    styleHeader?: ViewStyle;
    textHeader?: string;
    childrenWrapperStyle?: StyleProp<ViewStyle>;
    contentContainerStyle?: StyleProp<ViewStyle>;
    scrollEnabled?: boolean;
}>;

export type BottomSheetRefObject = {
    dismiss: () => void;
    show: () => void;
};
