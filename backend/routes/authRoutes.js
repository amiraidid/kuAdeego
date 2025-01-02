import express from 'express';
import { login, createUser } from '../controllers/authController.js';


const router = express.Router()

router.route('/signup').post(createUser)
router.route('/login').post(login)

export default router