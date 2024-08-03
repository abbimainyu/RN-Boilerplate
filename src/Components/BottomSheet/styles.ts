import {Dimensions, StyleSheet} from 'react-native';

const {height, width} = Dimensions.get('window');

export const ModalContainer = (maxHeight: number) => ({
  backgroundColor: '#f2f2f2',
  borderTopRightRadius: 16,
  borderTopLeftRadius: 16,
  borderTopWidth: 2,
  borderTopColor: '#FF3131',
  maxHeight: (Dimensions.get('window').height * maxHeight) / 100,
  overFlow: 'hidden',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(52,52,52,0.5)',
  },
  headerModal: {
    paddingTop: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    width: '100%',
    zIndex: 1,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 16,
  },
  lineModal: {
    height: 4,
    backgroundColor: '#f1f1f1',
    width: 30,
    borderRadius: 20,
    marginBottom: 16,
  },
});

export default styles;
