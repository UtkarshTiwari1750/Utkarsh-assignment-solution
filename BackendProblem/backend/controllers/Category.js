const { use } = require('bcrypt/promises');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCategory = async(req, res) => {
    try {
        const { name } = req.body;
        console.log("first line of createCategory")

        if(!name) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            })
        }
        
        const existingCategory = await Category.findOne({ name });
        const userDetails = await User.findById(req.user.id);
        if(existingCategory) {
            if(userDetails.categories.indexOf(existingCategory._id) !== -1) {
                return res.status(400).json({
                    success: false,
                    message: "Category already exists"
                })
            }
    
            if(userDetails.categories.indexOf(existingCategory._id) === -1) {
                userDetails.categories.push(existingCategory._id);
                await userDetails.save();
                const updatedUser = await User.findById(req.user.id)
                    .populate("categories");
    
                await Category.findByIdAndUpdate(existingCategory._id, {
                    $push: {
                        users: req.user.id,
                    }
                }, { new: true });
                return res.status(200).json({
                    success: true,
                    message: "Category Added Successfully",
                    data: updatedUser.categories
                })
            }
        }

        const categoryDetails = await Category.create({
            name,
            users: [req.user.id],
        });

        userDetails.categories.push(categoryDetails._id);
        await userDetails.save();

        const updatedUser = await User.findById(req.user.id)
            .populate("categories");

        return res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: updatedUser.categories
        })

    } catch(error) {
        console.log("Error in createCategory: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error..."
        })
    }
}

exports.getCategories = async(req, res) => {
    try {
        const userDetails = await User.findById(req.user.id)
            .populate("categories");

        return res.status(200).json({ 
            success: true,
            data: userDetails.categories,
        })
    } catch(error) {
        console.log("Error in getCategories: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error..."
        })
    }
}