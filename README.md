# Budget Tracker

Budget Tracker is a full stack application that helps you manage your finances by tracking deposits and expenses. It's built with React, Express.js, and SQLite.

## Features

- **Add Deposits**: Track income and salary
- **Add Expenses**: Record spending and purchases
- **Real-time Balance**: Automatically calculate current balance
- **Transaction History**: View all transactions with timestamps
- **Input Validation**: Both frontend and backend validation
- **Data Persistence**: SQLite database stores all transactions

## Tech Stack

### Frontend
- **React** - JavaScript library for building user interfaces
- **Axios** - Promise-based HTTP client
- **CSS3** - Modern styling with Flexbox and Grid

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **SQLite3** - Lightweight SQL database
- **CORS** - Cross-Origin Resource Sharing middleware

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/jxnxthxnz/budget-app.git
cd budget-tracker
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

This installs:
- express
- sqlite3
- cors
- nodemon (dev dependency)

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

This installs:
- react & react-dom
- axios
- All Create React App dependencies

## Running the Application

You need to run both the backend and frontend servers via two separate terminals.

**Terminal 1 - Backend Server:**
```bash
cd backend
npm start
```

You should see:
```
Server is running on http://localhost:5001
Successfully connected to db
Transaction table ready
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm start
```

The app will automatically open at `http://localhost:3000`


