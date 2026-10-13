import { FlatList, View, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigate } from 'react-router-native';

import ReviewItem from './ReviewItem';
import Button from './Button';
import Text from './Text';
import useMe from '../hooks/useMe';
import useDeleteReview from '../hooks/useDeleteReview';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  actions: {
    flexDirection: 'row',
  },
  action: {
    flex: 1,
    marginHorizontal: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const confirmDelete = (onConfirm) => {
  if (Platform.OS === 'web') {
    if (window.confirm('Are you sure you want to delete this review?')) {
      onConfirm();
    }
    return;
  }

  Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
    { text: 'Cancel', style: 'cancel' },
    { text: 'Delete', onPress: onConfirm },
  ]);
};

const MyReviews = () => {
  const { me, loading, refetch } = useMe(true);
  const deleteReview = useDeleteReview();
  const navigate = useNavigate();

  if (!me) {
    return <Text>{loading ? 'Loading...' : 'Sign in to see your reviews'}</Text>;
  }

  const reviews = me.reviews.edges.map((edge) => edge.node);

  const handleDelete = (id) =>
    confirmDelete(async () => {
      await deleteReview(id);
      refetch();
    });

  return (
    <FlatList
      data={reviews}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} title={item.repository.fullName}>
          <View style={styles.actions}>
            <Button style={styles.action} onPress={() => navigate(`/repositories/${item.repositoryId}`)}>
              View repository
            </Button>
            <Button style={styles.action} danger onPress={() => handleDelete(item.id)}>
              Delete review
            </Button>
          </View>
        </ReviewItem>
      )}
    />
  );
};

export default MyReviews;
