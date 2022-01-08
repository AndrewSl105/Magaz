import {
    BLOG_LIST_REQUEST,
    BLOG_LIST_SUCCESS,
    BLOG_LIST_FAIL,
    BLOG_POST_REQUEST,
    BLOG_POST_SUCCESS,
    BLOG_POST_FAIL,
    BLOG_COMMENTS_LIST_REQUEST,
    BLOG_COMMENTS_LIST_SUCCESS,
    BLOG_COMMENTS_LIST_FAIL,
  
  } from '../constants/blogConstants';
  
  export const blogListReducer = (state = { blogPosts: [] }, action) => {
    switch (action.type) {
      case BLOG_LIST_REQUEST:
        return { loading: true, blogPosts: [] };
      case BLOG_LIST_SUCCESS:
        return {
          loading: false,
          blogPosts: action.payload,
        };
        
      case BLOG_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const blogPostReducer= (state = { post: [] }, action) => {
    switch (action.type) {
      case BLOG_POST_REQUEST:
        return { loading: true, post: [] };
      case BLOG_POST_SUCCESS:
        return {
          loading: false,
          post: action.payload,
        };
        
      case BLOG_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};

export const blogCommentsListReducer = (state = { blogCommentsList: [] }, action) => {
    switch (action.type) {
      case BLOG_COMMENTS_LIST_REQUEST:
        return { loadingComments: true, blogCommentsList: [] };
      case BLOG_COMMENTS_LIST_SUCCESS:
        return {
        loadingComments: false,
          blogCommentsList: action.payload,
        };
        
      case BLOG_COMMENTS_LIST_FAIL:
        return { loadingComments: false, error: action.payload };
      default:
        return state;
    }
};

export const blogNewCommentReducer = (state = {}, action) => {
    switch (action.type) {
      case BLOG_POST_REQUEST:
        return { loading: true };
      case BLOG_POST_SUCCESS:
        return {
          loading: false,
          success: true,
          comment: action.payload,
        };
        
      case BLOG_POST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
};