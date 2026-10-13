import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';

const useMe = (includeReviews = false) => {
  const { data, ...result } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews },
    fetchPolicy: 'cache-and-network',
  });

  return { me: data?.me, ...result };
};

export default useMe;
