import express from 'express'
import { addBlogPost, getBlogPostByID, getBlogPosts } from '../controllers/blogPostController.js'

const blogRoutes = express.Router()

import { protect, admin } from '../middleware/authMiddleware.js'

blogRoutes.route('/').post(protect, admin, addBlogPost).get(getBlogPosts)
blogRoutes.route('/:id').get(getBlogPostByID)

export default blogRoutes;
