import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
        required: [true, "Please enter your password"],
        minlength: [6, "Passwordd must be at least 6 charecters."],
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

export default mongoose.model("User", userSchema);