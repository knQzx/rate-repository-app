import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => (
  <View>
    <RepositoryItem item={repository} showGithubButton />
    <ItemSeparator />
  </View>
);

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore, loading } = useRepository({ id, first: 8 });

  if (!repository) {
    return <Text>{loading ? 'Loading...' : 'Repository not found'}</Text>;
  }

  const reviews = repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
