import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

const AppBarTab = ({ children, to, onPress }) => {
  const content = (
    <Text color="white" fontWeight="bold" fontSize="subheading">
      {children}
    </Text>
  );

  if (onPress) {
    return (
      <Pressable style={styles.tab} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return (
    <Link to={to} style={styles.tab} component={Pressable}>
      {content}
    </Link>
  );
};

export default AppBarTab;
