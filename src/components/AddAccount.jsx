import React, {useState, forwardRef, useImperativeHandle, memo, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import icon_close_modal from '../assets/icon_close_modal.png';
import {saveStore, getStorage, removeStorage} from '../utils/storage';
import {getUUID} from '../utils/UUID';

const AddAccount = (props, ref) => {
  /* Modal */
  const [visible, setVisible] = useState(false);

  const show = () => {
    accountId.current = getUUID()
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

  /* 标题部分 */
  const renderTitle = () => {
    const titleStyles = StyleSheet.create({
      titleLayout: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      },
      titleTxt: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
      },
      closeBtn: {
        position: 'absolute',
        right: 6,
      },
      closeIMG: {
        width: 28,
        height: 28,
        resizeMode: 'contain',
      },
    });

    return (
      <View style={titleStyles.titleLayout}>
        <Text style={titleStyles.titleTxt}>添加账号</Text>
        <TouchableOpacity style={titleStyles.closeBtn} onPress={hide}>
          <Image style={titleStyles.closeIMG} source={icon_close_modal} />
        </TouchableOpacity>
      </View>
    );
  };
  /* 标题部分 end */

  /* 账户类型选择框 */
  const [type, setType] = useState('游戏');
  const renderType = () => {
    const TypeStyle = StyleSheet.create({
      typesLayout: {
        width: '100%',
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'red',
        marginTop: 8,
      },
      tab: {
        flex: 1,
        height: '100%',
        borderWidth: 1,
        borderColor: '#c0c0c0',
        justifyContent: 'center',
        alignItems: 'center',
      },
      leftTab: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
      },
      rightTab: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
      },
      moveLeftOnePix: {
        marginLeft: -1,
      },
      tabTxt: {
        fontSize: 14,
      },
    });

    const typeArray = ['游戏', '平台', '银行卡', '其他'];

    return (
      <View style={TypeStyle.typesLayout}>
        {typeArray.map((item, index) => {
          return (
            <TouchableOpacity
              style={[
                TypeStyle.tab,
                index === 0 ? TypeStyle.leftTab : '',
                index === 3 ? TypeStyle.rightTab : '',
                index > 0 && TypeStyle.moveLeftOnePix,
                {backgroundColor: type === item ? '#3050ff' : 'transparent'},
              ]}
              key={`${item}`}
              onPress={() => {
                setType(item);
              }}>
              <Text
                style={[
                  TypeStyle.tabTxt,
                  {color: type === item ? '#fff' : '#666'},
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  /* 账户类型选择框end */

  /* 账户名称输入框 */
  const [name, setName] = useState('');
  const renderName = () => {
    const nameStyle = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
      },
    });

    return (
      <TextInput
        value={name}
        style={nameStyle.input}
        maxLength={20}
        onChangeText={text => {
          setName(text || '');
        }}
      />
    );
  };
  /* 账户名称输入框end */

  /* 账户 */
  const [account, setAccount] = useState('');
  const renderAccount = () => {
    const nameStyle = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
      },
    });

    return (
      <TextInput
        value={account}
        style={nameStyle.input}
        maxLength={20}
        onChangeText={text => {
          setAccount(text || '');
        }}
      />
    );
  };
  /* 账户end */

  /* 账户密码 */
  const [password, setPassword] = useState('');
  const renderPassword = () => {
    const nameStyle = StyleSheet.create({
      input: {
        width: '100%',
        height: 40,
        backgroundColor: '#f0f0f0',
        marginTop: 8,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#333',
      },
    });

    return (
      <TextInput
        value={password}
        style={nameStyle.input}
        maxLength={20}
        onChangeText={text => {
          setPassword(text || '');
        }}
      />
    );
  };
  /* 账户密码 */

  /* 提交 */
  // const [id, setId] = useState('');
  const accountId = useRef('')

  const onSavePress = async () => {
    try {
      if (!type || (!name && !account)) {
        Alert.alert( '亲','请输入任意一项内容!');
        return;
      }
      const newAccount = {id: accountId.current, type, name, account, password};
      const accountList = JSON.parse(await getStorage('accountList')) || [];
      console.log(accountList);
      accountList.push(newAccount);
      saveStore('accountList', JSON.stringify(accountList)).then(() => {
        hide();
        resetData();
      });
    } catch (err) {
      console.log(err);
    }
  };
  const resetData = () => {
    setAccount('');
    setName('');
    setPassword('');
    setType('游戏');
  };

  const renderBtn = () => {
    const btnStyle = StyleSheet.create({
      saveBtn: {
        width: '100%',
        height: 44,
        backgroundColor: '#3050ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 8,
        marginBottom: 6,
      },
      saveTxt: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
      },
    });

    return (
      <TouchableOpacity style={btnStyle.saveBtn} onPress={onSavePress}>
        <Text style={btnStyle.saveTxt}>保存</Text>
      </TouchableOpacity>
    );
  };
  /* 提交end */

  return (
    <Modal
      visible={visible}
      onRequestClose={hide}
      transparent={true}
      statusBarTranslucent={true}
      animationType="fade">
      <KeyboardAvoidingView
        style={styles.root}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          {renderTitle()}
          <Text style={styles.subTitleTxt}>账号类型</Text>
          {renderType()}
          <Text style={styles.subTitleTxt}>名称</Text>
          {renderName()}
          <Text style={styles.subTitleTxt}>账户</Text>
          {renderAccount()}
          <Text style={styles.subTitleTxt}>密码</Text>
          {renderPassword()}

          {renderBtn()}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default forwardRef(AddAccount);

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  subTitleTxt: {
    fontSize: 12,
    color: '#666',
    marginTop: 16,
  },
});
