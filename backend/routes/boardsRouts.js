import express from 'express'
const router = express.Router()
import {
  addBoard,
  getBoards,
} from '../controllers/boardsController.js'
import { protect} from '../middleware/authMiddleware.js'


router.route('/').post(protect, addBoard).get(getBoards)


export default router
