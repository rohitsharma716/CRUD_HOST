const express = require('express');
const db = require('./db');
const Person = require('./models/person');

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is working fine");
});

app.get('/person' , async(req,res) =>{

    try{
        const Persons = await Person.find();
        res.status(200).json({
            message: 'person data fetch successful',
            data :  Persons
        })

    }catch(error){
       console.log("data fatching fail")
       res.status(500).json({
        message : 'data feching fails',
        error  : message.error
       })

    }
       
})

app.post('/person', async (req, res) => {
    try { 
        const { name, age, work, contact, email, address, salary } = req.body;
        const newPerson = new Person({
            name, age, work, contact, email, address, salary
        });
        
        const savedPerson = await newPerson.save();
        
        res.status(200).json({
            message: "Person is added",
            data: savedPerson
        });
    } catch (error) {
        console.log('Error adding person:', error);  // Log error details
        res.status(500).json({
            message: "Error adding person",
            error: error.message  // Fixed typo
        });
    }
});

app.listen(5000, () => {
    console.log("Server is working fine on port 5000");
});
