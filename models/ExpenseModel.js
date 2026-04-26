import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
    enum: ['food', 'travel', 'shopping', 'bills', 'health', 'other'], // optional restriction
  },

  note: {
    type: String,
    default: '',
  },

  date: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true // adds createdAt & updatedAt automatically
});

export default mongoose.model("Expense", ExpenseSchema);