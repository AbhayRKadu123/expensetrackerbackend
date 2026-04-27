import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ExpenseModel from '../models/ExpenseModel.js';

const privaterouter = express.Router();
privaterouter.get("/ExpenseDistribution", async (req, res) => {
    try {
        console.log("/ExpenseDistribution")
        let { id } = req?.user;
        let UserExist = await User.findOne({ _id: id });
        if (!UserExist) {
            return res.status(401).json({ error: "User does not exists" })
        }
        let result = await ExpenseModel.aggregate([{ $match: { email: UserExist?.email } },{
            $group: {
                _id: "$category",
                total: { $sum: "$amount" }
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                total: 1
            }
        }])
        console.log(result);
        res.status(200).json({data:result})


    } catch (err) {
        return res.status(500).json({ error: "Server side error" });

    }
})
privaterouter.get("/getUserDetails", async (req, res) => {
  try {
    console.log("/getUserDetails");
     let { id } = req?.user;
        let UserExist = await User.findOne({ _id: id });
       let total = await ExpenseModel.aggregate([
  {
    $match: { email: UserExist?.email }
  },
  {
    $group: {
      _id: null,
      totalSpent: { $sum: "$amount" }
    }
  }
]);

    // 🔥 Demo user data
    const user = {
      username: UserExist?.username,
      email: UserExist?.email,
      totalSpent: total[0]?.totalSpent || 0,
    };

    return res.status(200).json(user);

  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: "Server side error" });
  }
});
privaterouter.get("/GetAllExpenses", async (req, res) => {
    try {
        console.log("all expense route called", req?.user)
        let { id } = req?.user;
        let UserExist = await User.findOne({ _id: id });
        if (!UserExist) {
            return res.status(401).json({ error: "User does not exists" })
        }
        let expenses = await ExpenseModel.find({ email: UserExist?.email })
        // console.log(expenses)
        return res.status(200).json({ expenses: expenses });


    } catch (err) {
        return res.status(500).json({ error: "Server side error" });


    }
})
privaterouter.put("/UpdateExpense/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let { amount,
            category,
            note } = req.body;
        let result = await ExpenseModel.findByIdAndUpdate(id, {
            amount,
            category,
            note
        })

        return res.status(200).json({ message: "expense updated successfully!" })
    } catch (err) {
        return res.status(500).json({ error: "Server side error" });
    }
})
privaterouter.delete("/DeleteExpense/:id", async (req, res) => {
    try {
        console.log(req.params)
        let { id } = req.params;
        let deletedexpenses = await ExpenseModel.findByIdAndDelete(id);

        return res.status(200).json({ message: "Expense deleted successfully!" })
    } catch (err) {
        return res.status(500).json({ error: "Server side error" });

    }
})

privaterouter.post("/Addexpense", async (req, res) => {
    try {
        let { amount, category, note } = req.body;
        let { id } = req?.user;
        let UserExist = await User.findOne({ _id: id });
        if (!UserExist) {
            return res.status(401).json({ error: "User does not exists" })
        }
        let expense = new ExpenseModel({
            email: UserExist?.email,

            amount: amount,

            category: category,
            note: note,

            date: new Date()
        })
        //  console.log(req.body)
        let result = await expense.save();






        console.log("private add expense", req.body)
        res.status(200).json({ message: "Saved successfully" })

    } catch (err) {

        console.log(err)
        res.status(400).json({ message: "server side error !" })
    }

})

export default privaterouter;