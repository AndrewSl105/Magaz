import mongoose from 'mongoose'

const boardSchema = mongoose.Schema(
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
    items: [{
        type: String,
        required: true,
      }],
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Board = mongoose.model('Board', boardSchema)

export default Board
