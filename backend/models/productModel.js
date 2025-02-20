import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
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
    }
}, {timestamps: true});

const product = mongoose.model('product', productSchema)
export default product

