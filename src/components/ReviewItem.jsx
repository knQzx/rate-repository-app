import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  row: {
    flexDirection: 'row',
  },
  rating: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  content: {
    flexShrink: 1,
  },
  text: {
    marginTop: 5,
  },
  actions: {
    marginTop: 15,
  },
});

const ReviewItem = ({ review, title, children }) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <View style={styles.rating}>
        <Text color="primary" fontWeight="bold" fontSize="subheading">
          {review.rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontWeight="bold" fontSize="subheading">
          {title ?? review.user.username}
        </Text>
        <Text color="textSecondary">{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        {review.text ? <Text style={styles.text}>{review.text}</Text> : null}
      </View>
    </View>
    {children && <View style={styles.actions}>{children}</View>}
  </View>
);

export default ReviewItem;
