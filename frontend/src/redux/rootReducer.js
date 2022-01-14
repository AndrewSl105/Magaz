import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import userReducer from './slices/user';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import {
  categoriesListReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productUpdateReducer,
  hashTagsListReducer
} from './reducers/productReducers';
import {
  userListReducer
} from './reducers/userReducers';

import { userLoginReducer } from './reducers/userReducers';
import { blogAuthor, blogCommentsListReducer, blogCoverImage, blogListReducer, blogNewCommentReducer, blogPostReducer, newBlogPostReducer } from './reducers/blogReducer';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogListReducer,
  blogPost: blogPostReducer,
  blogComments: blogCommentsListReducer,
  blogNewComment: blogNewCommentReducer,
  blogCoverImage: blogCoverImage,
  blogAuthor: blogAuthor,
  newBlogPost: newBlogPostReducer,
  user: userReducer,
  productList: productListReducer,
  categories: categoriesListReducer,
  hashtags: hashTagsListReducer,
  userLogin: userLoginReducer,
  userList: userListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer)
});

export { rootPersistConfig, rootReducer };
