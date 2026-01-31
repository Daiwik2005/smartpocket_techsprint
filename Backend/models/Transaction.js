import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: String,
  type: String,
  amount: Number,
  category: String,
  date: Date,
  note: String
});

export default mongoose.models.Transaction ||
  mongoose.model('Transaction', transactionSchema);
