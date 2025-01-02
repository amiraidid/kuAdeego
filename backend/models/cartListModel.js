import mongoose from "mongoose";

const cartListSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    price: {
        type: String, 
        required: true
    },
    images: {
        type: Array, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    type: {
        type: String, 
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    colors: {
        type: Array,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    inStock:{
        type: Boolean,
        default: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true
    }
}, { timestamps: true })

const cartList = mongoose.model('cartList', cartListSchema)
export default cartList