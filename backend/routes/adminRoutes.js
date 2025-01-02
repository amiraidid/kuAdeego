import express from 'express'
import { createProduct, deleteProduct, deleteUser, getUsers, updateProduct } from '../controllers/adminController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { roleAuthorize } from '../middlewares/roleMiddleware.js'


const router = express.Router()

router.route('/create-product').post(authMiddleware, roleAuthorize('admin'), createProduct)
router.route('/users').get(authMiddleware, roleAuthorize('admin'), getUsers)
router.route('/user/:id').delete(authMiddleware, roleAuthorize('admin'), deleteUser)
router.route('/products/:id').put(authMiddleware, roleAuthorize('admin'), updateProduct)
router.route('/products/:id').delete(authMiddleware, roleAuthorize('admin'), deleteProduct)

export default router