import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Button from './Button';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15,
  },
  error: {
    marginBottom: 10,
  },
});

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required'),
  text: yup.string(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    try {
      const review = await createReview(values);
      navigate(`/repositories/${review.repositoryId}`);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <Formik
      initialValues={{ ownerName: '', repositoryName: '', rating: '', text: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          {error && (
            <Text color="error" style={styles.error}>
              {error}
            </Text>
          )}
          <FormikTextInput name="ownerName" placeholder="Repository owner name" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
          <FormikTextInput name="text" placeholder="Review" multiline />
          <Button onPress={handleSubmit}>Create a review</Button>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;
