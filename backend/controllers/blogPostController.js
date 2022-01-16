import asyncHandler from 'express-async-handler'
import BlogPost from '../models/blogPostModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addBlogPost = asyncHandler(async (req, res) => {
    const post = new BlogPost({
        user: req.user._id,
        title: req.body.title,
        coverImage: req.body.coverImage,
        content: req.body.content,
        author: req.user.name,
        rating: 0,
        seen: 0,
        metaTitle: req.body.metaTitle,
        metaDescription: req.body.metaDescription,
        tags: req.body.tags,
        metaKeywords: req.body.metaKeywords,
        publish: req.body.publish,
        enableComments: req.body.enableComments,
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
