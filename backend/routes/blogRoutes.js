import express from 'express'
import { addBlogPost, getBlogPostByID, getBlogPosts } from '../controllers/blogPostController.js'

const blogRoutes = express.Router()

import { protect} from '../middleware/authMiddleware.js'

blogRoutes.route('/').post(protect, addBlogPost).get(getBlogPosts)
blogRoutes.route('/:id').get(getBlogPostByID)

export default blogRoutes;
