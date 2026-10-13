import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

const AppBarTab = ({ children, to }) => (
  <Link to={to} style={styles.tab} component={Pressable}>
    <Text color="white" fontWeight="bold" fontSize="subheading">
      {children}
    </Text>
  </Link>
);

export default AppBarTab;
