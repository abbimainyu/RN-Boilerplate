import {PropsWithChildren} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';

export type RowProps = PropsWithChildren<{
    testID?: string;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    justifyStart?: boolean;
    justifyEnd?: boolean;
    justifyCenter?: boolean;
    justifyBetween?: boolean;
    justifyAround?: boolean;
    justifyEvently?: boolean;
    itemsStart?: boolean;
    itemsEnd?: boolean;
    itemsCenter?: boolean;
    itemsBaseline?: boolean;
    itemsStretch?: boolean;
    flex?: number;
}>;
