import React, {useRef, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SectionList,
  LayoutAnimation,
} from 'react-native';
import {useSetState} from 'ahooks';

import {getStorage} from '../../utils/storage';

import AddAccount from '../../components/AddAccount';

import icon_add from '../../assets/icon_add.png';
import icon_game from '../../assets/icon_game.png';
import icon_platform from '../../assets/icon_platform.png';
import icon_bank from '../../assets/icon_bank.png';
import icon_other from '../../assets/icon_other.png';
import icon_arrow from '../../assets/icon_arrow.png';

const Home = () => {
  /* AddAccount */
  const addAccountRef = useRef(null);
  // 列表数据
  const [sectionData, setSectionData] = useState([]);

  // 读取账号信息
  const getAccountList = async () => {
    try {
      const accountList = JSON.parse(await getStorage('accountList'));
      const gameList = accountList.filter(item => item.type === '游戏') || [];
      const platformList =
        accountList.filter(item => item.type === '平台') || [];
      const bankList = accountList.filter(item => item.type === '银行卡') || [];
      const otherList = accountList.filter(item => item.type === '其它') || [];
      const sectionData = [
        {type: '游戏', data: gameList},
        {type: '平台', data: platformList},
        {type: '银行卡', data: bankList},
        {type: '其它', data: otherList},
      ];
      setSectionData(sectionData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAccountList();
  }, []);
  /* AddAccount end */

  const renderTitle = () => {
    return (
      <View style={styles.titleLayout}>
        <Text style={styles.titleText}>账号管理</Text>
      </View>
    );
  };

  /* 列表数据 */

  // 判断是否收缩展开
  const [sectionState, setSectionState] = useSetState({
    游戏: true,
    平台: true,
    银行卡: true,
    其它: true,
  });

  // 头部列表数据图表
  const iconMap = {
    游戏: icon_game,
    平台: icon_platform,
    银行卡: icon_bank,
    其它: icon_other,
  };
  // 每一项的列表数据
  const renderSectionItem = ({item, index}) => {
    if (!sectionState[item.type]) {
      return null;
    }

    return (
      <View style={styles.itemLayout}>
        <Text style={styles.nameText}>{item.name}</Text>
        <View style={styles.accPwdLayout}>
          <Text style={styles.accPwdTxt}>{`账户: ${item.account}`}</Text>
          <Text style={styles.accPwdTxt}>{`密码: ${item.password}`}</Text>
        </View>
      </View>
    );
  };
  // 每一项的列表头部
  const renderSectionHeader = ({section}) => {
    return (
      <TouchableOpacity
      activeOpacity={0.9}
        style={[
          styles.groupHeader,
          {
            borderBottomLeftRadius: !section.data.length || !sectionState[section.type] ? 12 : 0,
            borderBottomRightRadius: !section.data.length || !sectionState[section.type] ? 12 : 0,
          },
        ]}
        onPress={() => {
          LayoutAnimation.easeInEaseOut();
          setSectionState({
            [section.type]: !sectionState[section.type],
          });
        }}>
        <Image style={styles.typeImg} source={iconMap[section.type]} />
        <Text style={styles.typeText}>{section.type}</Text>
        <View style={styles.arrowBtn}>
          <Image
            style={[
              styles.arrowImg,
              {
                transform: [
                  {rotate: sectionState[section.type] ? '0deg' : '270deg'},
                ],
              },
            ]}
            source={icon_arrow}
          />
        </View>
      </TouchableOpacity>
    );
  };
  /* 列表数据 end */

  return (
    <View style={styles.root}>
      {renderTitle()}
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={renderSectionItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.addBtn}
        activeOpacity={0.6}
        onPress={() => {
          addAccountRef.current.show();
        }}>
        <Image source={icon_add} style={styles.addImg} />
      </TouchableOpacity>
      <AddAccount ref={addAccountRef} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
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
  groupHeader: {
    width: '100%',
    height: 46,
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  typeImg: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  listContainer: {
    paddingHorizontal: 12,
  },
  typeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  arrowBtn: {
    position: 'absolute',
    right: 0,
    padding: 16,
  },
  arrowImg: {
    width: 20,
    height: 20,
  },
  itemLayout: {
    width: '100%',
    flexDirection: 'column',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  accPwdLayout: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  accPwdTxt: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    marginTop: 12,
    marginBottom: 6,
  },
});
