import { app } from "./app.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
dotenv.config();


const PORT = process.env.PORT;


app.listen(PORT,()=>{
    console.log("========================");
    console.log(`Server start on :-${PORT}`);
    connectDB();
    console.log("========================");
})