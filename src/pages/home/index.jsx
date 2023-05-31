import React, {useRef, forwardRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import AddAccount from '../../components/AddAccount';

import icon_add from '../../assets/icon_add.png';

const Home = () => {
  /* AddAccount */
  const addAccountRef = useRef(null);
  /* AddAccount end */

  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleText}>账号管理</Text>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {renderTitle()}
      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.6}
        onPress={() => {
          addAccountRef.current.show()
        }}>
        <Image source={icon_add} style={styles.addImg} />
      </TouchableOpacity>
      <AddAccount  ref={addAccountRef}/>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  titleLayout: {
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 18,
    color: '#333',
    fontWeight: 'bold',
  },
  addBtn: {
    position: 'absolute',
    bottom: 64,
    right: 28,
  },
  addImg: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
});
