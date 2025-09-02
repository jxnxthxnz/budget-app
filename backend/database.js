const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'budget.db'); //dirname is absolute path of current folder where db.js lives
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening db', err.message);
    }
    else {
        console.log('Successfully connected to db');
    }
});

function initializeDatabase() { //initialize db 
    //sql to create transaction table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            description TEXT NOT NULL,
            amount REAL NOT NULL,
            type TEXT NOT NULL CHECK(type IN ('deposit', 'expense')),
            date DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(createTableQuery, (err) => {
        if (err) {
            console.error('Error creating table', err.message);
        }
        else {
            console.log('Transaction table ready');
        }
    });
}

function addTransaction(description, amount, type) {
    return new Promise((resolve, reject) => { //promise based structure
        const query = `
            INSERT INTO transactions (description, amount, type)
            VALUES (?, ?, ?)
        `;

        db.run(query, [description, amount, type], function(err) { //function(err) callback function runs once query done
            //need function instead of arrow due to this.lastID, 
            if (err) {
                reject(err);
            }
            else {
                resolve(this.lastID); //auto generated id of row that was just inserted
            }
        });
    });
}

function getTransactions() {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT id, description, amount, type, date
            FROM transactions
            ORDER BY date DESC
        `;

        db.all(query, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rows); //once query finishes, tell the promise that you're done and here's the result
            }
        })
    })
}

function getBalance() { //get overall balance
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                COALESCE(
                    SUM(
                        CASE
                            WHEN type = 'deposit' THEN amount
                            WHEN type = 'expense' THEN -amount
                        END
                    ), 0
                ) as balance
            FROM transactions
        `;

        db.get(query, [], (err, row) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(row.balance || 0);
            }
        });
    });
}

module.exports = {
    initializeDatabase,
    addTransaction,
    getTransactions,
    getBalance
}
