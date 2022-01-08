import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material
import { Box, List } from '@material-ui/core';
//
import BlogPostCommentItem from './BlogPostCommentItem';
import { blogCommentsListAction } from '../../../redux/actions/blogActions'

// ----------------------------------------------------------------------

BlogPostCommentList.propTypes = {
  post: PropTypes.object.isRequired
};

export default function BlogPostCommentList({ dispatch, id }) {
  
  const { blogCommentsList } = useSelector((state) => state.blogComments);

  useEffect(() => {
    dispatch(blogCommentsListAction(id))
  },[dispatch, id])

  return (
    <Box>
      <List disablePadding>
        {blogCommentsList.map((comment) => {
          const { id, replyComment, users } = comment;
          const hasReply = false;

          return (
            <Box key={id} sx={{}}>
              <BlogPostCommentItem
                name={comment.author_name}
                avatarUrl={comment.author_avatar_urls}
                postedAt={comment.date}
                message={comment.content && comment.content.rendered}
              />
              {hasReply &&
                replyComment.map((reply) => {
                  const user = users.find((user) => user.id === reply.userId);
                  return (
                    <BlogPostCommentItem
                      key={reply.id}
                      message={reply.message}
                      tagUser={reply.tagUser}
                      postedAt={reply.postedAt}
                      name={user.name}
                      avatarUrl={user.avatarUrl}
                      hasReply
                    />
                  );
                })}
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
