import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
// material
import { styled } from '@material-ui/core/styles';
import { Stack, Typography, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { blogNewComment } from '../../../redux/actions/blogActions';

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral
}));

// ----------------------------------------------------------------------

export default function BlogPostCommentForm({ postId, dispatch }) {
  const { enqueueSnackbar } = useSnackbar();

  const CommentSchema = Yup.object().shape({
    post: Yup.string().required('post Id is required'),
    author_name: Yup.string().required('Author Name is required'),
    author_email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    content: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      post: postId,
      author_name: '',
      author_email: '',
      content: ''
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
        dispatch(blogNewComment(values));
        setSubmitting(false);
        resetForm();
        enqueueSnackbar('Post success', { variant: 'success' });
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Add Comment
      </Typography>

      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              minRows={3}
              maxRows={5}
              label="Comment *"
              {...getFieldProps('content')}
              error={Boolean(touched.content && errors.content)}
              helperText={touched.content && errors.content}
            />

            <TextField
              fullWidth
              label="Name *"
              {...getFieldProps('author_name')}
              error={Boolean(touched.author_name && errors.author_name)}
              helperText={touched.author_name && errors.author_name}
            />

            <TextField
              fullWidth
              label="Email *"
              {...getFieldProps('author_email')}
              error={Boolean(touched.author_email && errors.author_email)}
              helperText={touched.author_email && errors.author_email}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Post comment
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyles>
  );
}
