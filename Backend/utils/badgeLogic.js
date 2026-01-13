export function generateBadges(transactions) {
  const earnedBadges = [];
  const now = new Date();

  const totalTxns = transactions.length;
  const incomeTxns = transactions.filter(t => t.type === 'income');
  const expenseTxns = transactions.filter(t => t.type === 'expense');

  const balance = transactions.reduce(
    (acc, t) => t.type === 'income' ? acc + t.amount : acc - t.amount,
    0
  );

  const uniqueDates = new Set(
    transactions.map(t => new Date(t.date).toDateString())
  );

  if (totalTxns >= 1) {
    earnedBadges.push({
      title: 'First Transaction',
      description: 'You made your very first transaction!',
      emoji: '🎉',
      earned: true,
      earnedDate: now
    });
  }

  if (totalTxns >= 10) {
    earnedBadges.push({
      title: 'Transaction Master',
      description: 'You made 10+ transactions!',
      emoji: '💼',
      earned: true,
      earnedDate: now
    });
  }

  if (balance >= 5000) {
    earnedBadges.push({
      title: 'Big Saver',
      description: 'Saved over ₹5000!',
      emoji: '💰',
      earned: true,
      earnedDate: now
    });
  }

  if (incomeTxns.length >= 5 && expenseTxns.length >= 5) {
    earnedBadges.push({
      title: 'Money Pro',
      description: '5 incomes and 5 expenses recorded!',
      emoji: '📈',
      earned: true,
      earnedDate: now
    });
  }

  if (uniqueDates.size >= 3) {
    earnedBadges.push({
      title: 'Consistent Tracker',
      description: 'Tracked expenses for 3+ days!',
      emoji: '📅',
      earned: true,
      earnedDate: now
    });
  }

  return earnedBadges;
}
