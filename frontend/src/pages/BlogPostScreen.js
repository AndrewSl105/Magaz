import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Box, Card, Divider, Skeleton, Container, Typography, Pagination } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from 'react-redux';
// components
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
import Markdown from 'src/components/Markdown';
import Page from 'src/components/Page';
import { 
    BlogPostHero,
    BlogPostCommentList,
    BlogPostCommentForm
 } from 'src/components/_dashboard/blog';
import { PATH_DASHBOARD } from 'src/routes/paths';

import { blogPost } from '../redux/actions/blogActions'

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    <Skeleton width="100%" height={560} variant="rectangular" sx={{ borderRadius: 2 }} />
    <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
      <Skeleton variant="circular" width={64} height={64} />
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
        <Skeleton variant="text" height={20} />
      </Box>
    </Box>
  </>
);

export default function BlogPostScreen() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { post, loading } = useSelector((state) => state.blogPost);

  
  useEffect(() => {
    dispatch(blogPost(id))
  },[dispatch, id]);

  return (
    <Page sx={{
        marginTop: '5rem',
        marginBottom: '5rem',
    }} title="Blog: Post Details | Minimal-UI">
      <Container sx={{maxWidth: '1024px !important'}} >
        <HeaderBreadcrumbs
          heading="Post Details"
          links={[
            { name: 'Home', href: '/' },
            { name: 'Blog', href: PATH_DASHBOARD.blog.root },
          ]}
        />

        {post && (
          <Card>
            <BlogPostHero post={post} />

            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                  {post.title && post.title.rendered}
              </Typography>

              <Markdown children={post.content && post.content.rendered} />

              <Box sx={{ my: 5 }}>
                <Divider />
                <Divider />
              </Box>

              <Box sx={{ display: 'flex', mb: 2 }}>
                <Typography variant="h4">Comments</Typography>
              </Box>

              <BlogPostCommentList dispatch={dispatch} id={id} />

              <Box sx={{ mb: 5, mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination count={1} color="primary" />
              </Box>

              <BlogPostCommentForm dispatch={dispatch} postId={id} />
            </Box>
          </Card>
        )}

        {loading && SkeletonLoad}
      </Container>
    </Page>
  );
}
