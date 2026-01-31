import { Transaction, Badge } from '../types';

export function generateBadges(transactions: Transaction[]): Badge[] {
  const earnedBadges: Badge[] = [];

  const totalTxns = transactions.length;
  const incomeTxns = transactions.filter(t => t.type === 'income');
  const expenseTxns = transactions.filter(t => t.type === 'expense');

  const balance = transactions.reduce(
    (acc, t) => (t.type === 'income' ? acc + t.amount : acc - t.amount),
    0
  );

  const uniqueDays = new Set(
    transactions.map(t => new Date(t.date).toDateString())
  );

  const now = new Date();

  // 🥇 First transaction
  if (totalTxns >= 1) {
    earnedBadges.push({
      title: 'First Transaction',
      description: 'You made your very first transaction!',
      earnedDate: now,
      emoji: '🎉'
    });
  }

  // 📊 Activity badge
  if (totalTxns >= 10) {
    earnedBadges.push({
      title: 'Transaction Master',
      description: 'You recorded 10 or more transactions!',
      earnedDate: now,
      emoji: '💼'
    });
  }

  // 💰 Savings badge
  if (balance >= 5000) {
    earnedBadges.push({
      title: 'Big Saver',
      description: 'You saved over ₹5000!',
      earnedDate: now,
      emoji: '💰'
    });
  }

  // 📈 Balanced money usage
  if (incomeTxns.length >= 5 && expenseTxns.length >= 5) {
    earnedBadges.push({
      title: 'Money Pro',
      description: 'Logged at least 5 incomes and 5 expenses!',
      earnedDate: now,
      emoji: '📈'
    });
  }

  // 📅 Consistency badge
  if (uniqueDays.size >= 3) {
    earnedBadges.push({
      title: 'Consistent Tracker',
      description: 'Tracked finances on 3 different days!',
      earnedDate: now,
      emoji: '📅'
    });
  }

  return earnedBadges;
}
