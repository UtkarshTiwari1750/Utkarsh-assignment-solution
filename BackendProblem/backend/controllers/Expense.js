const Expense = require("../models/Expense");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createExpense = async(req, res) => {
    try{
        const { amount, description, category: categoryId, date } = req.body;
        if(!amount || !description || !categoryId || !date) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all fields"
            })
        }

        const userDetails = await User.findById(req.user.id);
        const categoryDetails = await Category.findById(categoryId)
        if(!categoryDetails || userDetails.categories.indexOf(categoryDetails._id) === -1 ) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        const expenseDetails = await Expense.create({
            amount,
            description,
            category: categoryDetails._id,
            date,
        });

        categoryDetails.expenses.push(expenseDetails._id);
        await categoryDetails.save();

        const updatedUser = await User.findByIdAndUpdate(userDetails._id, {
            $push: {
                expenses: expenseDetails._id
            }
        }, { new: true })
            .populate({
                path: "expenses",
                populate: {
                    path: "category",
                }
            }); 

        return res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: updatedUser.expenses
        })
    } catch(err) {
        console.log("Error in createExpense: ", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.updateExpense = async(req, res) => {
    try{
        const { expenseId } = req.body;
        const updates = req.body;
        if(!expenseId) {
            return res.status(400).json({
                success: false,
                message: "Expense ID is required"
            })
        }

        const expenseDetails = await Expense.findById(expenseId);
        if(!expenseDetails) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }

        const userDetails = await User.findById(req.user.id);
        for(const key in updates) {
            if(updates.hasOwnProperty(key)) {
                if(key === "category") {
                    const categoryDetails = await Category.findById(updates[key]);
                    if(!categoryDetails || userDetails.categories.indexOf(categoryDetails._id) === -1 ){
                        return res.status(404).json({
                            success: false,
                            message: "Category not found"
                        })
                    }
                    
                    await Category.findByIdAndUpdate(expenseDetails.category, {
                        $pull: {
                            expenses: expenseDetails._id
                        },
                    }, { new: true });

                    expenseDetails[key] = categoryDetails._id;
                    categoryDetails.expenses.push(expenseDetails._id);
                    await categoryDetails.save();
                } else {
                    expenseDetails[key] = updates[key];
                }
            }
        }

        await expenseDetails.save();
        const updatedExpense = await Expense.findById(expenseId)
            .populate("category")
            .exec();
        
        const updatedUser = await User.findById(req.user.id)
            .populate({
                path: "expenses",
                populate: {
                    path: "category",
                }
            })
        return res.status(200).json({   
            success: true,
            message: "Expense updated successfully",
            data: updatedUser.expenses
        })
    } catch(error) {
        console.log("Error in updateExpense: ", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.deleteExpense = async(req, res) => {
    try{
        const { expenseId } = req.body;
        if(!expenseId) {
            return res.status(400).json({
                success: false,
                message: "Expense ID is required"
            })
        }

        const expenseDetails = await Expense.findById(expenseId);
        if(!expenseDetails) {
            return res.status(404).json({
                success: false,
                message: "Expense not found"
            })
        }

        await Category.findByIdAndUpdate(expenseDetails.category, {
            $pull: {
                expenses: expenseDetails._id
            }
        }, { new: true });

        const updatedUser = await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                expenses: expenseDetails._id
            }
        }, { new: true })
            .populate({
                path: "expenses",
                populate: {
                    path: "category",
                }
            });

        await Expense.findByIdAndDelete(expenseId);

        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: updatedUser.expenses
        })
    } catch(error) {
        console.log("Error in deleteExpense: ", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

exports.getExpenses = async(req, res) => {
    try{
        const userDetails = await User.findById(req.user.id)
            .populate({ 
                path: "expenses",
                populate: {
                    path: "category"
                }
            })
            .exec();
        return res.status(200).json({
            success: true,
            data: userDetails.expenses
        })  
    } catch(error) {
        console.log("Error in getExpenses: ", error)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}