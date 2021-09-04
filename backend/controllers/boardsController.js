import asyncHandler from 'express-async-handler'
import Board from '../models/boardModel.js'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addBoard = asyncHandler(async (req, res) => {
    const board = new Board({
        name: 'Sample name',
        user: req.user._id,
        type: 'default',
        items: [],
    })
    const createdBoard = await board.save()
    res.status(201).json(createdBoard)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({})
  res.json(boards)
})

export {
    getBoards,
    addBoard ,
}
