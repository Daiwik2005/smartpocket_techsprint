import express from 'express';
import Transaction from './models/Transaction.js';
import Badge from './models/Badge.js';
import { generateBadges } from './utils/badgelogic.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  const transactions = await Transaction.find({ userId: req.params.userId });
  res.json(transactions);
});

router.post('/', async (req, res) => {
  try {
    const txn = new Transaction(req.body);
    await txn.save();

    const { userId } = req.body;

    console.log('📥 Transaction POST received:', req.body);

    // 1️⃣ Fetch all transactions
    const transactions = await Transaction.find({ userId });
    console.log(`📊 Transactions for user ${userId}:`, transactions.length);

    // 2️⃣ Generate badges based on rules
    const generatedBadges = generateBadges(transactions);
    console.log('🧠 Generated badges:', generatedBadges.map(b => b.title));

    // 3️⃣ Fetch existing badges to preserve earnedDate
    const existingBadges = await Badge.find({ userId });
    const existingBadgeMap = new Map(
      existingBadges.map(b => [b.title, b])
    );

    const now = new Date();

    // 4️⃣ Merge earnedDate correctly
    const finalBadges = generatedBadges.map(badge => {
      const existing = existingBadgeMap.get(badge.title);

      return {
        ...badge,
        userId,
        earned: true,
        earnedDate: existing?.earnedDate || now
      };
    });

    // 5️⃣ Replace badge collection
    await Badge.deleteMany({ userId });

    let insertedBadges = [];
    if (finalBadges.length > 0) {
      insertedBadges = await Badge.insertMany(finalBadges);
      console.log('✅ Inserted badges:', insertedBadges.map(b => b.title));
    } else {
      console.log('ℹ️ No badges to insert for user', userId);
    }

    res.status(201).json({
      message: 'Transaction saved and badges updated',
      badges: insertedBadges.length ? insertedBadges : finalBadges
    });
  } catch (err) {
    console.error('❌ Transaction error:', err);
    res.status(500).json({ error: 'Transaction failed' });
  }
});

export default router;
