import React from 'react';

function TransactionList({ transactions }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="transaction-list empty">
        <div className="empty-state">
          <p>💸 No transactions yet</p>
          <p>Add your first deposit or expense above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <div className="transaction-summary">
        <p>Total Transactions: {transactions.length}</p>
      </div>

      <div className="transactions">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className={`transaction-item ${transaction.type}`}
          >
            <div className="transaction-icon">
              {transaction.type === 'deposit' ? '💰' : '💸'}
            </div>
            
            <div className="transaction-details">
              <div className="transaction-description">
                {transaction.description}
              </div>
              <div className="transaction-date">
                {formatDate(transaction.date)}
              </div>
            </div>
            
            <div className={`transaction-amount ${transaction.type}`}>
              {transaction.type === 'deposit' ? '+' : '-'}
              {formatCurrency(transaction.amount)}
            </div>
          </div>
        ))}
      </div>

      <div className="transaction-stats">
        <div className="stat">
          <span className="stat-label">Total Deposits:</span>
          <span className="stat-value positive">
            {formatCurrency(
              transactions
                .filter(t => t.type === 'deposit')
                .reduce((sum, t) => sum + t.amount, 0)
            )}
          </span>
        </div>
        <div className="stat">
          <span className="stat-label">Total Expenses:</span>
          <span className="stat-value negative">
            {formatCurrency(
              transactions
                .filter(t => t.type === 'expense')
                .reduce((sum, t) => sum + t.amount, 0)
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TransactionList;
