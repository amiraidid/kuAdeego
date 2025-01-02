import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { addToCart, deleteFromCartList, getFromCartList } from '../controllers/cartListController.js'

const router = express.Router()

router.route('/').get(authMiddleware, getFromCartList)
router.route('/add-cart/:id').post(authMiddleware, addToCart)
router.route('/product/:id').delete(authMiddleware, deleteFromCartList)

export default router