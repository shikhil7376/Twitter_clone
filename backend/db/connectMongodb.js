import mongoose  from "mongoose";

const connectMongoDB = async()=>{
    try {
          const conn = await mongoose.connect(process.env.MONGO_URI)
          console.log(`mongodb connected`);
    } catch (error) {
console.log(`error connection to mongo:${error.message}`);
process.exit(1)
    }
}

export default connectMongoDB