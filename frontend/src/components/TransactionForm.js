import React, { useState } from 'react';

function TransactionForm({ onAddTransaction }) { //transactionform component with a prop passed from parent component 
    const [description, setDescription] = useState(''); //state variables, [state value, setter function]
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('deposit');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => { //event object, runs when form is submitted
        e.preventDefault(); //prevent default form submission

        if (!description.trim() || !amount || !type) { //check for empty fields
            setMessage({ type: 'error', text: 'Please fill in all fields' });
            return;
        }

        const numericAmount = parseFloat(amount); //valid amount check
        if (isNaN(numericAmount) || numericAmount <= 0) {
            setMessage({ type: 'error', text: 'Please enter a valid positive number'});
            return;
        }

        const transactionData = {
            description: description.trim(),
            amount: numericAmount,
            type: type
        };

        try {
            setIsSubmitting(true); //disable input so no double submits
            setMessage(''); //clear old messages

            const result = await onAddTransaction(transactionData); //call parent component function to add transaction
            //form gets input and validates, app executes api calls and refreshes

            if (result.success) { //clear form and show success
                setDescription('');
                setAmount('');
                setType('deposit');
                setMessage({ type: 'success', text: `${type === 'deposit' ? 'Deposit' : 'Expense'} added successfully!` });
                setTimeout(() => setMessage(''), 3000); //clear message after 3s
            }
            else {
                setMessage({ type: 'error', text: result.error });
            }
        } 
        catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occured' });
        }
        finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="transaction-form">
            {message && (<div classname={`message ${message.type}`}>
                {message.text}
            </div>)}
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter description (e.g., Salary, Bills, etc.)"
                        disabled={isSubmitting}
                        maxLength="100"
                    />
                    { /* disable when submitting, react re renders each time when typing */ }
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        min=".01"
                        step=".01"
                        disabled={isSubmitting}
                    />
                </div>

            <div className="form-group">
                    <label htmlFor="type">Type:</label>
                    { /* controlled dropdown */ }
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        disabled={isSubmitting}
                    >
                        <option value="deposit"> Deposit (Income) </option>
                        <option value="expense"> Expense (Spending) </option>
                    </select>
                </div>

                <button 
                    type="submit"
                    disabled={isSubmitting}
                    className={ `submit-btn ${type}`}
                >
                    {isSubmitting ? 'Adding...' : `Add ${type === 'deposit' ? 'Deposit' : 'Expense'}`}
                </button>
            </form>
        </div>
    );
}

export default TransactionForm;