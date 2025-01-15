import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const emailRegexPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        validate: {
            validator: (value) => {
                return emailRegexPattern.test(value);
            },
            message: "Please enter a valid email."
        },
        unique: true,
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 charecters."],
        select: false,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    role: {
        type: String,
        default: 'user',
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    courses: [
        {
            courseId: String,

        }
    ],
},{timestamps:true});

//Hash password :-
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// Compare the entered password with the stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


// Sign access token
userSchema.methods.SignAccessToken = function(){
    return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN || '',{
        expiresIn:"5m"
    });
}

// Sign refress token
userSchema.methods.SignRefreshToken = function(){
    return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN || '',{
        expiresIn:"3d"
    });
}




export default mongoose.model("User", userSchema);