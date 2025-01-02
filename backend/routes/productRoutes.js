import express from 'express'
import { findUser, getProducts, getSingleProduct } from '../controllers/productControllers.js'

const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getSingleProduct)
router.route('/user/:id').get(findUser)

export default router