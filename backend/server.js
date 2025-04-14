const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3009;

// Middleware
app.use(cors());
app.use(express.json());

// Path to data file
const data_file = path.join(__dirname, "MOCK_DATA.json");

// Helper functions
const readData = () => {
    return JSON.parse(fs.readFileSync(data_file, 'utf8'));
};
const writeData = (data) => {
    fs.writeFileSync(data_file, JSON.stringify(data, null, 2));
};

// Routes
app.get('/api/users', (req, res) => {
    res.json(readData());
});
app.get('/api/users/:id', (req, res) => {
    const users = readData();
    const user = users.find(u => u.id === parseInt(req.params.id));
    user ? res.json(user) : res.status(404).json({ message: 'User not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});