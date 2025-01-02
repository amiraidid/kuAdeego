import express from 'express';
import { createOrder, orderList, updateOrder, deletedOrder, orderCheckout } from '../controllers/orderController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { roleAuthorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.route('/create-order/').post(authMiddleware, createOrder)
router.route('/').get(authMiddleware, orderList)
router.route('/payment').get(authMiddleware, orderCheckout)
router.route('/update-order/:id').put(authMiddleware, roleAuthorize('admin'), updateOrder)
router.route('/delete-order/:id').delete(authMiddleware, deletedOrder)

export default router