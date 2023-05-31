import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';

const AddAccount = (props, ref) => {
  /* Modal */
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  useImperativeHandle(ref, () => {
    console.log(ref);
    return {
      show,
      hide,
    };
  });
  /* Modal end */

  return (
    <Modal
      visible={visible}
      onRequestClose={hide}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <View style={styles.root}>
        <Text>1234</Text>
      </View>
    </Modal>
  );
};

export default forwardRef(AddAccount);

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
  },
});
