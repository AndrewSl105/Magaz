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
    BLOG_AUTHOR_DATA_REQUEST,
    BLOG_AUTHOR_DATA_SUCCESS,
    BLOG_AUTHOR_DATA_FAIL,
    BLOG_COVER_IMAGE_REQUEST,
    BLOG_COVER_IMAGE_SUCCESS,
    BLOG_COVER_IMAGE_FAIL,
    NEW_BLOG_POST_REQUEST,
    NEW_BLOG_POST_SUCCESS,
    NEW_BLOG_POST_FAIL
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

  export const newBlogPostReducer= (state = {}, action) => {
    switch (action.type) {
      case NEW_BLOG_POST_REQUEST:
        return { loading: true, post: [] };
      case NEW_BLOG_POST_SUCCESS:
        return {
          loading: false,
          post: action.payload,
        };
        
      case NEW_BLOG_POST_FAIL:
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

export const blogAuthor = (state = { authorData: [] }, action) => {
  switch (action.type) {
    case BLOG_AUTHOR_DATA_REQUEST:
      return { loading: true, authorData: [] };
    case BLOG_AUTHOR_DATA_SUCCESS:
      return {
      loading: false,
      authorData: action.payload,
    };
      
    case BLOG_AUTHOR_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const blogCoverImage = (state = { coverImage: [] }, action) => {
  switch (action.type) {
    case BLOG_COVER_IMAGE_REQUEST:
      return { loading: true, coverImage: [] };
    case BLOG_COVER_IMAGE_SUCCESS:
      return {
      loading: false,
      coverImage: action.payload,
    };
      
    case BLOG_COVER_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};