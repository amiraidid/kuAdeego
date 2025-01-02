import mongoose from "mongoose";

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connected to database`)
    } catch (error) {
        console.log(`could not connected to the database ${error.message}`);
        process.exit()
    }
}


export default connectDB