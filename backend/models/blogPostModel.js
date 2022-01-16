import mongoose from 'mongoose'

const blogPostSchema = mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    coverImage: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        },
    author: {
        type: String,
        required: true,
        },
    rating: {
        type: Number,
        },
    metaTitle: {
        type: String,
        },
    seen: {
        type: Number,
        },
    metaDescription: {
        type: String,
    },
    tags: [
        {
            type: String,
        }
    ],
    metaKeywords: [
        {
            type: String,
        }
    ],
    publish: {
        type: Boolean,
        required: true,
    },
    enableComments: {
        type: Boolean,
        required: true,
    },
    replies: [
        {
            author: {
                type: String,
                required: true,
            },
            content: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
        }
    ]
    },
  {
    timestamps: true,
  }
)

const BlogPost = mongoose.model('BlogPost', blogPostSchema)
export default BlogPost