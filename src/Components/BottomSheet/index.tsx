import React, {createRef, RefObject} from 'react';

import BottomSheetComponent from './BottomSheetComponent';
import {BottomSheetProps, BottomSheetRefObject} from './types';

const BottomSheetRef = createRef<BottomSheetRefObject>();

const BottomSheet: React.FC<BottomSheetProps & {btSheetRef?: RefObject<BottomSheetRefObject>}> = props => {
    return (
        <BottomSheetComponent {...props} ref={props.btSheetRef ?? BottomSheetRef}>
            {props.children}
        </BottomSheetComponent>
    );
};

export class BottomSheetMng {
    public static show() {
        BottomSheetRef.current?.show();
    }

    public static dissmiss() {
        BottomSheetRef.current?.dismiss();
    }
}

export default BottomSheet;
