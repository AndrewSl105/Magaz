import asyncHandler from 'express-async-handler'
import BlogPost from '../models/blogPostModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addBlogPost = asyncHandler(async (req, res) => {
    const post = new Board({
        title: req.title,
        coverImage: req.coverImage,
        content: req.content,
        author: req.author,
        rating: 0,
        seen: 0,
        metaTitle: req.metaTitle,
        metaDescription: req.metaDescription,
        tags: req.tags,
        metaKeywords: req.metaKeywords,
        publish: req.publish,
        enableComments: req.enableComments,
        replies: []
    })
    const createdPost = await post.save()
    res.status(201).json(createdPost)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getBlogPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find({})
  res.json(posts)
})

const getBlogPostByID = asyncHandler(async (req, res) => {
    const post = await BlogPost.findById(req.params.id)
  
    if (post) {
      res.json(post)
    } else {
      res.status(404)
      throw new Error('Product not found')
    }
  })

export {
    addBlogPost,
    getBlogPosts,
    getBlogPostByID
}
