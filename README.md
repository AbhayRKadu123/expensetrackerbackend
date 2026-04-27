# Expense Tracker Backend

Node.js + Express + MongoDB backend for Expense Tracker App.

## Features
- JWT Authentication (Login/Register)
- CRUD APIs for expenses
- Category-wise expense summary

## Setup

cd backend  
npm install  

Create a `.env` file:

MONGO_URI=your_mongodb_atlas_url  
JWT_SECRET=your_secret  

Run server:

npm start  

Server runs on: http://localhost:5000

## API Endpoints

### Test
GET /test  

### Auth
POST /api/auth/register  
POST /api/auth/login  
GET /private/getUserDetails  

### Expenses
GET /private/getAllExpenses  
GET /private/expenseDistribution  
POST /private/addExpense  
PUT /private/updateExpense/:id  
DELETE /private/deleteExpense/:id  
