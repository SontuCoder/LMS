import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
    },
});

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
    },
});

const bannerSchema = new mongoose.Schema({
    public_id: {
        type: String,
    },
    url: {
        type: String,
    },
});

const layoutSchema = new mongoose.Schema({
    type:{
        type: String,
    },
    faqs: [faqSchema],
    categories: [categorySchema],
    banner: {
        image: bannerSchema,
        title: {
            type: String,
        },
        subtitle: {
            type: String,
        },
    }
});


const Layout = mongoose.model('Layout', layoutSchema);
export default Layout;

