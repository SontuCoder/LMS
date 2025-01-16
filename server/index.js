import { app } from "./app.js";
import{v2 as cloudinary} from 'cloudinary';
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})




const PORT = process.env.PORT;


app.listen(PORT,()=>{
    console.log("========================");
    console.log(`Server start on :-${PORT}`);
    connectDB();
    console.log("========================");
})