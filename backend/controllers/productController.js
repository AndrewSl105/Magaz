import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'
import axios from 'axios'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {

const { keyword, hashtags, brand, category, gender } = req.query;
const pageSize = 24;
const page = Number(req.query.pageNumber) || 1;

if (keyword) {
  const keyword = req.query.keyword
  ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
  : {}

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) })
}

if (category && gender && brand) {
  const categoryArr = category.split(",");
  const count = await Product.countDocuments( {$and:[
    {"category":{ $in: categoryArr }},
    {"gender":{ $in: gender }},
    {"brand":{ $in: brand }},
  ]});

  const products = await Product.find( {$and:[
    {"category":{ "$in": categoryArr }},
    {"gender":{ "$in": gender }},
    {"brand":{ $in: brand }},
  ]}).limit(pageSize).skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
}

const count = await Product.countDocuments({});
const products = await Product.find({}).limit(pageSize).skip(pageSize * (page - 1));
res.json({ products, page, pages: Math.ceil(count / pageSize) });

})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    sku,
    gallery,
    gender,
    category,
    hashtags,
    visibility,
    description,
    from
  } = req.body;

  const product = new Product({
    name: name,
    from: from,
    sku: sku,
    price: price,
    gallery: gallery,
    hashtags: hashtags,
    user: req.user._id,
    brand: 'Sample brand',
    category: category,
    subcategory: [],
    numReviews: 0,
    description: description,
    visibility: visibility,
    rating: 0,
    country: '',
    gender: gender
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    price,
    gallery,
    hashtags,
    brand,
    category,
    subcategory,
    numReviews,
    description,
    visibility,
    rating,
    country,
    gender
  } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.brand = brand
    product.category = category
    product.visibility = visibility,
    product.rating = rating,
    product.country = country,
    product.gender = gender,
    product.numReviews = numReviews,
    product.subcategory = subcategory,
    product.hashtags = hashtags,
    product.gallery = gallery,
    product.sku = sku

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Product already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.json(products)
})

const listCategories = (req, res) => {  
  Product.distinct('category',{},(err, products) => {    
    if (err) {      
      return res.status(400).json({        
        error: errorHandler.getErrorMessage(err)      
      })    
    }    
    res.json(products)  
})}

const listHashtags = (req, res) => {  
  Product.distinct('hashtags',{},(err, products) => {    
    if (err) {      
      return res.status(400).json({        
        error: errorHandler.getErrorMessage(err)      
      })    
    }    
    res.json(products)  
})}

const listBrands = (req, res) => {  
  Product.distinct('brand',{},(err, products) => {    
    if (err) {      
      return res.status(400).json({        
        error: errorHandler.getErrorMessage(err)      
      })    
    }    
    res.json(products)  
})}

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  listCategories,
  listHashtags,
  listBrands
}
