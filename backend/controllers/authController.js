import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js"

export const createUser = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({email})
        
        if (user) {
            return res.status(400).json({message: `${email} is already in use...`})
        }
        
        const hashPass = await bcrypt.hash(password, 10)
        req.body.password = hashPass

        await User.create(req.body)
        res.status(200).json({message: 'a new user is been created...'})

    } catch (error) {
        res.status(5000).json({message: error.message})
    }
}

export const login = async(req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({email})
        const passwordCompare = await bcrypt.compare(password, user.password)

        if (!user) {
            return res.status(401).json({message: `the email & password is incorrect pls try again...`})
        }
        if (!passwordCompare) {
            return res.status(401).json({message: `the email & password is incorrect pls try again...`})
        }

        const token = jwt.sign({
            id:user.id,
            email: user.email,
            name: user.name,
            lastName: user.lastName,
            role:user.role
        }, process.env.JWT_SECRET, {expiresIn: '1d'});

        res.status(200).json({message: 'Login successfully', token, role: user.role})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
