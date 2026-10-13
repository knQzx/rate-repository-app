import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';
import formatCount from '../utils/formatCount';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  top: {
    flexDirection: 'row',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  info: {
    flexShrink: 1,
    alignItems: 'flex-start',
  },
  description: {
    marginVertical: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  stat: {
    alignItems: 'center',
  },
});

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text fontWeight="bold">{formatCount(value)}</Text>
    <Text color="textSecondary">{label}</Text>
  </View>
);

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.top}>
      <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
      <View style={styles.info}>
        <Text fontWeight="bold" fontSize="subheading">
          {item.fullName}
        </Text>
        <Text color="textSecondary" style={styles.description}>
          {item.description}
        </Text>
        <Text style={styles.language}>{item.language}</Text>
      </View>
    </View>
    <View style={styles.stats}>
      <Stat label="Stars" value={item.stargazersCount} />
      <Stat label="Forks" value={item.forksCount} />
      <Stat label="Reviews" value={item.reviewCount} />
      <Stat label="Rating" value={item.ratingAverage} />
    </View>
  </View>
);

export default RepositoryItem;
