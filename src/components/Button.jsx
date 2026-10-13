import { Pressable, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    padding: 15,
    alignItems: 'center',
  },
  danger: {
    backgroundColor: theme.colors.error,
  },
});

const Button = ({ children, onPress, danger, style, ...props }) => (
  <Pressable style={[styles.button, danger && styles.danger, style]} onPress={onPress} {...props}>
    <Text color="white" fontWeight="bold">
      {children}
    </Text>
  </Pressable>
);

export default Button;
