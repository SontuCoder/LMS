import Layout from "../models/layout.model.js";
import { AsyncErrorMiddle } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

// Create layouts
export const createLayout = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { type } = req.body;
        const isTypeValid = ["BANNER", "CATEGORY", "FAQ"].includes(type);
        if (!isTypeValid) {
            return next(new ErrorHandler("Invalid layout type", 400));
        }
        const isTypeExist = await Layout.findOne({ type });
        if (isTypeExist) {
            return next(new ErrorHandler("Layout already exists", 400));
        }

        if (type === "BANNER") {
            const { image, title, subtitle } = req.body;

            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
            });

            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subtitle,
            };
            await Layout.create({
                type,
                banner,
            });
        }

        if (type === "CATEGORY") {
            const { categories } = req.body;
            if (!categories || !Array.isArray(categories)) {
                return next(
                    new ErrorHandler("Invalid or missing categories array", 400)
                );
            }
            const categoryItems = await Promise.all(
                categories.map((category) => {
                    return {
                        title: category.title,
                    };
                })
            );
            await Layout.create({
                type,
                categories: categoryItems,
            });
        }

        if (type === "FAQ") {
            const { faqs } = req.body;
            // Check if faqs is defined and is an array
            if (!faqs || !Array.isArray(faqs)) {
                return next(new ErrorHandler("Invalid or missing FAQ array", 400));
            }

            const faqItems = await Promise.all(
                faqs.map((faq) => {
                    if (!faq.question || !faq.answer) {
                        throw new Error("FAQ should have both question and answer");
                    }
                    return {
                        question: faq.question,
                        answer: faq.answer,
                    };
                })
            );

            // Create the layout with the faqItems
            await Layout.create({
                type,
                faqs: faqItems,
            });
        }

        res.status(201).json({
            success: true,
            message: "Layout created successfully",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// Edit layout
export const editLayout = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { type } = req.body;
        const isTypeValid = ["BANNER", "CATEGORY", "FAQ"].includes(type);
        if (!isTypeValid) {
            return next(new ErrorHandler("Invalid layout type", 400));
        }

        if (type === "BANNER") {
            const bannerData = await Layout.findOne({ type });

            const { image, title, subtitle } = req.body;

            await cloudinary.v2.uploader.destroy(bannerData?.banner.image.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "layout",
            });

            const banner = {
                image: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url,
                },
                title,
                subtitle,
            };
            await Layout.findByIdAndUpdate(bannerData._id, { banner });
        }

        if (type === "CATEGORY") {
            const { categories } = req.body;
            const categoryData = await Layout.findOne({ type });
            if (!categories || !Array.isArray(categories)) {
                return next(
                    new ErrorHandler("Invalid or missing categories array", 400)
                );
            }
            const categoryItems = await Promise.all(
                categories.map((category) => {
                    return {
                        title: category.title,
                    };
                })
            );
            await Layout.findByIdAndUpdate(categoryData?._id, {
                type,
                categories: categoryItems,
            });
        }

        if (type === "FAQ") {
            const { faqs } = req.body;
            const faqData = await Layout.findOne({ type });

            // Check if faqs is defined and is an array
            if (!faqs || !Array.isArray(faqs)) {
                return next(new ErrorHandler("Invalid or missing FAQ array", 400));
            }

            const faqItems = await Promise.all(
                faqs.map((faq) => {
                    if (!faq.question || !faq.answer) {
                        throw new Error("FAQ should have both question and answer");
                    }
                    return {
                        question: faq.question,
                        answer: faq.answer,
                    };
                })
            );

            // Create the layout with the faqItems
            await Layout.findByIdAndUpdate(faqData?._id, {
                type,
                faqs: faqItems,
            });
        }

        res.status(200).json({
            success: true,
            message: "Layout Updated successfully",
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

// Get layout By Type
export const getLayoutByType = AsyncErrorMiddle(async (req, res, next) => {
    try {
        const { type } = req.body;
        const layout = await Layout.findOne({ type });
        if (!layout) {
            return next(new ErrorHandler("Layout not found", 404));
        }

        res.status(200).json({
            success: true,
            layout,
        });

    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});


