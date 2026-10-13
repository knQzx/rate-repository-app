import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';

const useMe = () => {
  const { data, ...result } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });

  return { me: data?.me, ...result };
};

export default useMe;
