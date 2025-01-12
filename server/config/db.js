import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.DB_URL||''; 

const connectDB = async()=>{
    try{
        await mongoose.connect(dbURL).then((data=>{
            console.log("Db connection successfully");
        }))
    } catch (err) {
        console.log("Db connection failed");
        setTimeout(connectDB,5000);
    }
}

export default connectDB;
