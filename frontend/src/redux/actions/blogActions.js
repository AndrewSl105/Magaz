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
    BLOG_NEW_COMMENT_FAIL,
    BLOG_AUTHOR_DATA_REQUEST,
    BLOG_AUTHOR_DATA_SUCCESS,
    BLOG_AUTHOR_DATA_FAIL,
    BLOG_COVER_IMAGE_SUCCESS,
    BLOG_COVER_IMAGE_REQUEST,
    BLOG_COVER_IMAGE_FAIL,
    NEW_BLOG_POST_REQUEST,
    NEW_BLOG_POST_SUCCESS,
    NEW_BLOG_POST_FAIL
 } from '../constants/blogConstants';

export const blogPostsList = (searchQuery) => async (
  dispatch
) => {
  try {
    dispatch({ type: BLOG_LIST_REQUEST })
    const { data } = await axios.get(`/api/blogposts`);

    const sorderdData = data.filter(post => post.title.includes(searchQuery));

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
      const { data } = await axios.get(`/api/blogposts/${id}`);
    
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


export const newBlogPost = (values) => async (
  dispatch
) => {
  try {
    dispatch({ type: NEW_BLOG_POST_REQUEST })

    const { data } = await axios.post(`/api/blogposts`, values);

    console.log(values);
  
    dispatch({
      type: NEW_BLOG_POST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: NEW_BLOG_POST_FAIL,
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
      const { data } = await axios.get(`https://lookmetest.000webhostapp.com/wp-json/wp/v2/comments?post=${id}`);
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
      const { comment } = axios.post(`https://lookmetest.000webhostapp.com/wp-json/wp/v2/comments`, values)
    
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

export const blogGetPostAuthor = (id) => async (
  dispatch
) => {
  try {
    dispatch({ type: BLOG_AUTHOR_DATA_REQUEST })
    const { author } = axios.get(`https://lookmetest.000webhostapp.com/wp-json/wp/v2/users/${id}`)
    console.log(id, author)
    dispatch({
      type: BLOG_AUTHOR_DATA_SUCCESS,
      payload: author
    })

  } catch (error) {
    dispatch({
      type: BLOG_AUTHOR_DATA_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const blogGetCoverImage = (id) => async (
  dispatch
) => {
  try {
    dispatch({ type: BLOG_COVER_IMAGE_REQUEST })
    const { coverImage } = axios.get(`https://lookmetest.000webhostapp.com/wp-json/wp/v2/media/${id}`)
  
    dispatch({
      type: BLOG_COVER_IMAGE_SUCCESS,
      payload: coverImage
    })

  } catch (error) {
    dispatch({
      type: BLOG_COVER_IMAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}