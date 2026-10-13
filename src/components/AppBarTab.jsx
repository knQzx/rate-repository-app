import { Pressable, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

const AppBarTab = ({ children }) => (
  <Pressable style={styles.tab}>
    <Text color="white" fontWeight="bold" fontSize="subheading">
      {children}
    </Text>
  </Pressable>
);

export default AppBarTab;
