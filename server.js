const express = require('express');
const db = require('./db');
const Person = require('./models/person');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Middleware to parse JSON
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()}  Request Made to : ${req.originalUrl}`);
    next();
}
app.use(logRequest);

// app.use(express.json());

// Authentication
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received credentials:', username, password);
        
        // Await `findOne` to ensure we get the user
        const user = await Person.findOne({ username: username });
        
        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        const isPasswordCorrect = user.password === password;
        if (isPasswordCorrect) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }

    } catch (err) {
        return done(err);
    }
}));

app.use(passport.initialize());

// Protected route
app.get('/', passport.authenticate('local', { session: false }), (req, res) => {
    res.send('Welcome to my server');
});

app.get('/person', async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).json({
            message: 'Person data fetched successfully',
            data: persons
        });
    } catch (error) {
        console.log("Data fetching failed:", error);
        res.status(500).json({
            message: 'Data fetching failed',
            error: error.message // Corrected error handling
        });
    }
});

// Add a new person with duplicate username check
app.post('/person', passport.authenticate('local', { session: false }) , async (req, res) => {
    try { 
        const { name, age, work, contact, email, address, salary, username, password } = req.body;
        
        // Check if username already exists
        const existingUser = await Person.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        const newPerson = new Person({
            name, age, work, contact, email, address, salary, username, password
        });
        
        const savedPerson = await newPerson.save();
        
        res.status(200).json({
            message: "Person added successfully",
            data: savedPerson
        });
    } catch (error) {
        console.log('Error adding person:', error);
        res.status(500).json({
            message: "Error adding person",
            error: error.message
        });
    }
});

app.listen(5000, () => {
    console.log("Server is working fine on port 5000");
});
