import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const sizeSchema = mongoose.Schema(
  {
    size: { type: String },
    amount: {
      type: Number,
    }
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    from: {
      type: String,
    },
    sku: {
      type: String,
    },
    gallery: [
      { type: String },
    ],
    description: {
      type: String,
    },
    brand: {
      type: String,
    },
    category: [ {
      type: String,
    }],
    mainCategory: {type: String,},
    hashtags: [  {
      type: String,
    },],
    reviews: [reviewSchema],
    sizes: [sizeSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    gender: {
      type: String,
    },
    country: {
      type: String,
    },
    visibility: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
