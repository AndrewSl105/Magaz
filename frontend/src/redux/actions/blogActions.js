import axios from 'axios'
import { 
    BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL, BLOG_POST_REQUEST,
    BLOG_POST_SUCCESS, BLOG_POST_FAIL,
    BLOG_COMMENTS_LIST_REQUEST,
    BLOG_COMMENTS_LIST_SUCCESS,
    BLOG_COMMENTS_LIST_FAIL,
    BLOG_NEW_COMMENT_REQUEST,
    BLOG_NEW_COMMENT_SUCCESS,
    BLOG_NEW_COMMENT_FAIL
 } from '../constants/blogConstants';

export const blogPostsList = (searchQuery) => async (
  dispatch
) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST })
    const { data } = await axios.get('http://magaz.local/wp-json/wp/v2/posts?_embed');

    const sorderdData = data.filter(post => post.title.rendered.includes(searchQuery));

    dispatch({
      type: BLOG_LIST_SUCCESS,
      payload: sorderdData
    })

  } catch (error) {
    dispatch({
      type: BLOG_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const blogPost = (id) => async (
    dispatch
  ) => {
    try {
      dispatch({ type: BLOG_POST_REQUEST })
      const { data } = await axios.get(`http://magaz.local/wp-json/wp/v2/posts/${id}?_embed`);
    
      dispatch({
        type: BLOG_POST_SUCCESS,
        payload: data
      })

    } catch (error) {
      dispatch({
        type: BLOG_POST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const blogCommentsListAction = (id) => async (
    dispatch
  ) => {
    try {
      dispatch({ type: BLOG_COMMENTS_LIST_REQUEST })
      const { data } = await axios.get(`http://magaz.local/wp-json/wp/v2/comments?post=${id}`);
        console.log(data)
      dispatch({
        type: BLOG_COMMENTS_LIST_SUCCESS,
        payload: data
      })

    } catch (error) {
      dispatch({
        type: BLOG_COMMENTS_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const blogNewComment = (values) => async (
    dispatch
  ) => {
    try {
        console.log(values);
      dispatch({ type: BLOG_NEW_COMMENT_REQUEST })
      const { comment } = axios.post(`http://magaz.local/wp-json/wp/v2/comments`, values)
    
      dispatch({
        type: BLOG_NEW_COMMENT_SUCCESS,
        payload: comment
      })

    } catch (error) {
      dispatch({
        type: BLOG_NEW_COMMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}
