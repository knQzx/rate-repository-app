import { View, StyleSheet, ScrollView } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import useMe from '../hooks/useMe';
import useAuthStorage from '../hooks/useAuthStorage';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  tabs: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { me } = useMe();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabs}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {me ? (
          <>
            <AppBarTab to="/create-review">Create a review</AppBarTab>
            <AppBarTab to="/my-reviews">My reviews</AppBarTab>
            <AppBarTab onPress={signOut}>Sign out</AppBarTab>
          </>
        ) : (
          <>
            <AppBarTab to="/signin">Sign in</AppBarTab>
            <AppBarTab to="/signup">Sign up</AppBarTab>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
