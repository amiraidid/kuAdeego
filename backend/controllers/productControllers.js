import Stripe from 'stripe'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

export const getProducts = async (req, res) => {
    const { category, type } = req.query;
    try {
        if (category) {
            const products = await Product.find({ category });
            return res.status(200).json({ found: products.length, products });
        } 
        else if (category && type) {
            const products = await Product.find({ category, type });
            return res.status(200).json({ found: products.length, products });
        } 
        else if (type) {
            const products = await Product.find({ type });
            return res.status(200).json({ found: products.length, products });
        } 
        else {
            const products = await Product.find({});
            res.status(200).json({ found: products.length, products });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getSingleProduct = async(req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(400).json({message: 'not found that product'})
        }
        res.status(200).json({product})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const findUser = async(req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json({user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


export const paymentIntent = async(req, res) => {
    const { totalPrice } = req.body
    try {
        const paymentIntent = await Stripe.paymentIntents.create({
            amount: totalPrice * 100,
            currency: 'usd',
            payment_method_types: ['card'],
        });
        res.status(200).json({clientSecret: paymentIntent.client_secret})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}