import Product from "../models/productModel.js"
import User from "../models/userModel.js" 

export const createProduct = async(req, res) => {
    try {
        const product = req.body
        await Product.create(product)
        res.status(200).json({message: 'created a new product'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getUsers = async(req, res) => {
    const { role } = req.body
    try {
        const users = await User.find({role: 'user'})
        res.status(200).json({users:users})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteUser = async(req, res) => {
    const { id } = req.params
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({message: 'successfully deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProduct = async(req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        if (!product) {
            return res.status(400).json({message: 'not found that product'})
        }

        await Product.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json({message: 'successfully updated'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteProduct = async(req, res) => {
    const { id } = req.params
    try {
        await Product.findByIdAndUpdate(id)
        res.status(200).json({message: 'successfully deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}