import {StyleSheet} from 'react-native';
import {appColors} from '../../const';

export default styles = StyleSheet.create({
  listContainer: {
    // paddingHorizontal: 20,
  },
  listSection: {
    marginTop: 12,
    marginBottom: 12,
    marginHorizontal: 20,
  },
  itemDate: {
    fontSize: 16,
    fontWeight: '500',
  },
  rowContainer: {
    flexDirection: 'row',
    columnGap: 8,
    marginHorizontal: 20,
  },
  iconTodoPlaceholder: {
    backgroundColor: '#FF9999',
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  iconDoingPlaceholder: {
    backgroundColor: '#99FF99',
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  iconDonePlaceholder: {
    backgroundColor: '#CCCCFF',
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  textContainer: {
    flex: 1,
    rowGap: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  itemTime: {
    fontSize: 12,
    fontStyle: 'italic',
    alignSelf: 'flex-start',
    color: appColors.inactiveText,
  },
  itemDesc: {
    fontSize: 14,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
});
