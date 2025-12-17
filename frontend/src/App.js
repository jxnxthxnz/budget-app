import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList'
import './App.css';

const API_BASE_URL = 'http://localhost:5001/api';

function App() {
  const [transactions, setTransactions] = useState([]); //array of all transactions
  const [balance, setBalance] = useState(0); //current balance
  const [loading, setLoading] = useState(true); //track if data being fetched
  const [error, setError] = useState(''); //store error messages 

  useEffect(() => { //after this component renders, run the following two functions
    fetchTransactions();
    fetchBalance();
  }, []); //[] run on =first render only

  const fetchTransactions = async () => { //aysnc returns promise, (params) => body
    try {
      setLoading(true); //flip on loading flag, ui can show a spinner that says loading
      const response = await axios.get(`${API_BASE_URL}/transactions`); //calls api and pauses due to await
      setTransactions(response.data); //store fetched data
      setError(''); //clear any previous errors
    }
    catch (err) { //if await rejects
      console.error('Error fetching transaction', err); //for devs
      setError('Failed to load transactions'); //to display on ui
    }
    finally {
      setLoading(false); //stop loading indicator regardless of request succeed / fails
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/balance`); //calls get api
      setBalance(response.data.balance); //update balance state with value from backend
    }
    catch (err) {
      console.error('Error fetching balance:', err);
      setError('Failed to load balance');
    }
  };

  const addTransaction = async (transactionData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/transactions`, transactionData);

      if (response.status === 201) { //successfully created transaction
        await fetchTransactions(); //refresh ui and reloads
        await fetchBalance();
        return { success: true };
      }
    }
    catch (err) {
      console.error('Error adding transaction:', err);
      const errorMessage = err.response?.data?.error || "Failed to add transaction"; //check if backend error message exists or default
      return { success: false, error: errorMessage };
    }
  };

  return ( //return ui via jsx
    <div className="App">
      <header className="app-header"> 
        <h1>Budget Tracker</h1>
        <div className={`balance ${balance >= 0 ? 'positive' : 'negative'}`}>
          Current Balance: ${balance.toFixed(2)}
        </div>
      </header>

      <main className="app-main">
        { /* conditional rendering with && */ }
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <section className="transaction-form-section">
          <h2>Add Transaction</h2>
          { /* react component with a prop pass in */ }
          <TransactionForm onAddTransaction={addTransaction}/> 
        </section>

        <section className="transaction-list-section">
          <h2>Transaction History</h2>
          { /* load message or show transaction list */ }
          {loading ? (<div className="loading"> Loading transactions... </div>) :
            (<TransactionList transactions={transactions}/>)}
        </section>
      </main>
    </div>
  );
}

export default App;
