import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  emoji: String,
  earnedDate: Date,
  earned: { type: Boolean, default: true } // ✅ added
});

export default mongoose.models.Badge ||
  mongoose.model('Badge', badgeSchema);
