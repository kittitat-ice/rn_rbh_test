import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  Text,
  Animated,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearDoneList,
  getDones,
  selectTaskReducer,
  setDoneList,
} from '../../redux/slices/taskSlice';
import {getFullDate, getTimeString, isSameDay} from '../../utils/util';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useTranslation} from 'react-i18next';
import styles from './listStyles';

const defaultQuery = {
  limit: 10,
  isAsc: true,
  sortBy: 'createdAt',
};

const DoneList = props => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const {doneList} = useSelector(selectTaskReducer);
  const [limit, setLimit] = useState(defaultQuery.limit);
  const [isAsc, setIsAsc] = useState(defaultQuery.isAsc);
  const [sortBy, setSortBy] = useState(defaultQuery.sortBy);
  const [loading, setLoading] = useState(false);
  const [loadmore, setLoadmore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const useBuddhist = i18n.language === 'th' ? true : false;

  const getCurrentOffset = () => {
    return Math.ceil(doneList.length / limit);
  };

  // api request
  const requestDone = async (offset = 0, replaceState = false) => {
    const {payload} = await dispatch(
      getDones({
        offset: offset,
        limit: limit,
        isAsc: isAsc,
        sortBy: sortBy,
        replaceState: replaceState,
      }),
    );

    // error handling section
    if (payload.status !== 200) {
      Alert.alert(t('error'), t('something_went_wrong'));
    }
  };

  const componentDidMount = async () => {
    const offset = getCurrentOffset();
    if (offset === 0) {
      setLoading(true);
      await requestDone(offset);
      setLoading(false);
    }
    setLoadmore(false);
  };

  useEffect(() => {
    componentDidMount();
    return () => {
      // componentWillUnmount
    };
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(clearDoneList());

    // api load too fast
    // cause redux state to duplicate
    setTimeout(async () => {
      await requestDone(0, true);
      setRefreshing(false);
    }, 200);
  }, [doneList]);

  const handleLoadmore = async () => {
    if (loadmore || loading || refreshing) {
      return;
    }
    setLoadmore(true);
    const offset = getCurrentOffset();
    await requestDone(offset);
    setLoadmore(false);
  };

  const deleteItem = id => {
    const newList = doneList.filter((item, index) => item.id !== id);
    dispatch(setDoneList(newList));
  };

  const renderItem = ({item, index}) => {
    const sameDay =
      index === 0
        ? false
        : isSameDay(
            new Date(doneList[index].createdAt),
            new Date(doneList[index - 1].createdAt),
          );
    const date = new Date(item.createdAt);

    const renderRightActions = (progress, id) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [60, 0],
      });
      return (
        <Animated.View
          style={{
            paddingHorizontal: 12,
            justifyContent: 'center',
            transform: [{translateX: trans}],
          }}>
          <TouchableOpacity onPress={() => deleteItem(id)}>
            <Text style={styles.actionText}>{t('delete')}</Text>
          </TouchableOpacity>
        </Animated.View>
      );
    };

    return (
      <View style={styles.listContainer}>
        {!sameDay && (
          <View style={styles.listSection}>
            <Text style={styles.itemDate}>
              {getFullDate(date, false, useBuddhist)}
            </Text>
          </View>
        )}
        <Swipeable
          renderRightActions={progress =>
            renderRightActions(progress, item.id)
          }>
          <View style={styles.rowContainer}>
            <View style={styles.iconDonePlaceholder} />
            <View style={styles.textContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemTime}>
                  {getTimeString(date, false)}
                </Text>
              </View>
              <Text style={styles.itemDesc}>{item.description}</Text>
            </View>
          </View>
        </Swipeable>
      </View>
    );
  };

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={doneList}
        renderItem={renderItem}
        ListFooterComponent={<View style={{height: 10}} />}
        ListHeaderComponent={<View style={{height: 20}} />}
        ItemSeparatorComponent={<View style={{height: 20}} />}
        onEndReached={handleLoadmore}
      />
      {loadmore && (
        <ActivityIndicator
          size={'small'}
          animating
          style={{position: 'absolute', bottom: 0, left: 0, right: 0}}
        />
      )}
      {loading && (
        <ActivityIndicator
          size={'large'}
          animating
          style={{position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}
        />
      )}
    </>
  );
};

export default DoneList;
