import CartList from "../models/cartListModel.js"
import Product from "../models/productModel.js"


export const addToCart = async(req, res) => {
    const { id } = req.params
    try {
        const selectedProduct = await Product.findById(id)

        if(!selectedProduct) {
            return res.status(404).json({message: 'Product not found'})
        }

        const product = await CartList.findOne({user: req.user.id, productId: id})
        if (product) {
            return res.status(400).json({message: 'item already exists in the cart..'})
        }
        const cartItem = new CartList({
            title: selectedProduct.title,
            description: selectedProduct.description,
            price: selectedProduct.price,
            images: selectedProduct.images,
            category: selectedProduct.category,
            type: selectedProduct.type,
            sizes: selectedProduct.sizes,
            colors: selectedProduct.colors,
            quantity: 1,
            inStock: selectedProduct.inStock,
            user: req.user.id,
            productId: id,
        })

        await cartItem.save();
        return res.status(200).json({message: 'new product to the cartlist...'})

    } catch (error) {
        console.log("error: " + error.message);
        res.status(500).json({message: error.message})
    }
}

export const getFromCartList = async(req, res) => {
    try {
        const product = await CartList.find({})
        res.status(200).json({cartProduct: product})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteFromCartList = async(req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await CartList.findByIdAndDelete(id)
        res.status(200).json({message: "successfully deleted from the cart", deletedProduct    })
    } catch (error) {
        res.status(500).json({message: error.message})  
    }
}