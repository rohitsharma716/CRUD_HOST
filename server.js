const express = require('express');
const db = require('./db');
const Person = require('./models/person');
const bodyParser = require('body-parser');
const { jwtAuthMiddleware, generateToken } = require("./jwt");

const app = express();

app.use(bodyParser.json());

// Middleware to log requests
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to: ${req.originalUrl}`);
    next();
}
app.use(logRequest);

// Root route
app.get('/', jwtAuthMiddleware, (req, res) => {
    res.json({ success: true, message: 'Welcome to my server' });
});

// Fetch all persons
app.get('/person', jwtAuthMiddleware, async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json({
            success: true,
            message: 'Person data fetched successfully',
            data: persons
        });
    } catch (error) {
        console.error("Data fetching failed:", error);
        res.status(500).json({
            success: false,
            message: 'Data fetching failed',
            error: error.message
        });
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Person.findOne({ username });
        
        // Check if user exists and password is correct
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid username or password' });
        }

        const payload = {
            id: user.id,
            username: user.username
        };

        const token = generateToken(payload);
        
        res.json({
            success: true,
            message: 'Login successful',
            token: token
        });

    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

// Add a new person with duplicate username check
app.post('/signup', async (req, res) => {
    try {
        const { name, age, work, contact, email, address, salary, username, password } = req.body;

        // Check if username already exists
        const existingUser = await Person.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Username is already taken" });
        }

        const newPerson = new Person({
            name, age, work, contact, email, address, salary, username, password
        });

        const savedPerson = await newPerson.save();

        const payload = {
            id: savedPerson.id,
            username: savedPerson.username
        };

        const token = generateToken(payload);
        console.log('Token generated:', token);

        res.status(200).json({
            success: true,
            message: "Person added successfully",
            data: savedPerson,
            token: token
        });
    } catch (error) {
        console.error('Error adding person:', error);
        res.status(500).json({
            success: false,
            message: "Error adding person",
            error: error.message
        });
    }
});

// Start server
app.listen(5000, () => {
    console.log("Server is working fine on port 5000");
});
