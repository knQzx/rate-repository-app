import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import TextInput from './TextInput';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  header: {
    padding: 15,
  },
  search: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const orderOptions = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
};

const RepositoryListHeader = ({ order, setOrder, searchKeyword, setSearchKeyword }) => (
  <View style={styles.header}>
    <TextInput
      style={styles.search}
      placeholder="Search"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
    />
    <Picker selectedValue={order} onValueChange={setOrder}>
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  </View>
);

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { order, setOrder, searchKeyword, setSearchKeyword } = this.props;

    return (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, onPressItem } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPressItem && onPressItem(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const [order, setOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const navigate = useNavigate();

  const { repositories } = useRepositories({
    ...orderOptions[order],
    searchKeyword: debouncedKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      order={order}
      setOrder={setOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onPressItem={(id) => navigate(`/repositories/${id}`)}
    />
  );
};

export default RepositoryList;
