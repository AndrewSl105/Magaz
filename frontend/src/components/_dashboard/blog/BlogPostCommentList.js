import PropTypes from 'prop-types';

// material
import { Box, List } from '@material-ui/core';
//
import BlogPostCommentItem from './BlogPostCommentItem';

// ----------------------------------------------------------------------

BlogPostCommentList.propTypes = {
  post: PropTypes.object.isRequired
};

export default function BlogPostCommentList({ comments }) {

  return (
    <Box>
      <List disablePadding>
        {comments.map((comment) => {
          const { _id, replyComment, author, content } = comment;
          const hasReply = false;

          return (
            <Box key={_id} sx={{}}>
              <BlogPostCommentItem
                name={comment.name}
                postedAt={comment.createdAt}
                message={content}
              />
              {hasReply &&
                replyComment.map((reply) => {
                  const user = author.find((user) => user.id === reply.userId);
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
