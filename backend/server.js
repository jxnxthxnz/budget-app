const express = require('express'); //loads express library from modules
const cors = require('cors'); //loads cors library
const { initializeDatabase, addTransaction, getTransactions, getBalance } = require('./database');

const app = express(); //express application instance, object that represents web server
const PORT = 5000;

app.use(cors()); //allows react app on port 3000 to make requests to this port 5000
app.use(express.json()); //allow server to read json data from request bodies
initializeDatabase(); //initialize db when server starts

app.get('/api/transactions', async (req, res) => { //get all transactions
    try {
        const transactions = await getTransactions(); //db function to get all transactions
        res.json(transactions); //send transactions as json response
    }
    catch (error) {
        console.error('Error fetching transaction', error);
        res.status(500).json({ error: 'Failed to get transaction' }); //500 = internal service error, can't fulfill request
    }
});

app.post('/api/transactions', async (req, res) => { //add a transaction
    try {
        const { description, amount, type } = req.body; //extract data from req body
        if (!description || !amount || !type) { //check for all fields
            return res.status(400).json({ error: 'Missing required fields' });
        }
        if (type !== 'deposit' && type !== 'expense') { //
            return res.status(400).json({ error: 'Type has to be "deposit" or "expense"' });
        }
        if (amount <= 0) {
            return res.status(400).json({ error: 'Must be a positive number' });
        }
        const transactionId = await addTransaction(description, amount, type);

        res.status(201).json({ //successful and new resource created
            id: transactionId,
            message: 'Transaction successful'
        });
    }
    catch (error) {
        console.error('Error with transaction', error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

app.get('/api/balance', async (req, res) => { //get balance
    try {
        const balance = await getBalance();
        res.json({ balance });
    }
    catch (error) {
        console.error('Error retrieving balance', error);
        res.status(500).json({ error: 'Failed to retrieve balance' });
    }
});

app.listen(PORT, () => { //start the server
    console.log(`Server is running on http://localhost:${PORT}`); //$ for port value
})




