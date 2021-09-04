import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
      language: user.language,
      isSuperAdmin: user.isSuperAdmin,
      bonuses: user.bonuses,
      sizeInfo: user.sizeInfo,
      coupons: user.coupons,
      paymentInfo: user.paymentInfo,
      deliveryInfo: user.deliveryInfo,
      preferences: user.preferences
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phoneNumber } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    phoneNumber
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastName: '',
      email: user.email,
      isAdmin: user.isAdmin,
      isSuperAdmin: false,
      token: generateToken(user._id),
      gender: '',
      phoneNumber: user.phoneNumber,
      birthDay: '',
      language: '',
      bonuses: 0,
      sizeInfo: {},
      coupons: [],
      paymentInfo: {},
      deliveryInfo: {},
      preferences: []
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      gender: user.gender,
      phoneNumber: user.phoneNumber,
      birthDay: user.birthDay,
      language: user.language,
      bonuses: user.bonuses,
      sizeInfo: user.sizeInfo,
      coupons: user.coupons,
      paymentInfo: user.paymentInfo,
      deliveryInfo: user.deliveryInfo,
      preferences: user.preferences
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.gender = req.body.gender ||user.gender ,
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber,
    user.birthDay = req.body.birthDay || user.birthDay,
    user.language = req.body.language || user.language,
    user.bonuses = req.body.bonuses || user.bonuses,
    user.sizeInfo = req.body.sizeInfo || user.sizeInfo,
    user.coupons = req.body.coupons || user.coupons,
    user.paymentInfo = req.body.paymentInfo || user.paymentInfo,
    user.deliveryInfo = req.body.deliveryInfo || user.deliveryInfo,
    user.preferences = req.body.preferences || user.preferences
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
      gender: updatedUser.gender,
      phoneNumber: updatedUser.phoneNumber,
      birthDay: updatedUser.birthDay,
      language: updatedUser.language,
      bonuses: updatedUser.bonuses,
      sizeInfo: updatedUser.sizeInfo,
      coupons: updatedUser.coupons,
      paymentInfo: updatedUser.paymentInfo,
      deliveryInfo: updatedUser.deliveryInfo,
      preferences: updatedUser.preferences,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin
    user.gender = req.body.gender ||user.gender ,
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber,
    user.birthDay = req.body.birthDay || user.birthDay,
    user.language = req.body.language || user.language,
    user.bonuses = req.body.bonuses || user.bonuses,
    user.sizeInfo = req.body.sizeInfo || user.sizeInfo,
    user.coupons = req.body.coupons || user.coupons,
    user.paymentInfo = req.body.paymentInfo || user.paymentInfo,
    user.deliveryInfo = req.body.deliveryInfo || user.deliveryInfo,
    user.preferences = req.body.preferences || user.preferences

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      gender: updatedUser.gender,
      phoneNumber: updatedUser.phoneNumber,
      birthDay: updatedUser.birthDay,
      language: updatedUser.language,
      bonuses: updatedUser.bonuses,
      sizeInfo: updatedUser.sizeInfo,
      coupons: updatedUser.coupons,
      paymentInfo: updatedUser.paymentInfo,
      deliveryInfo: updatedUser.deliveryInfo,
      preferences: updatedUser.preferences,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
