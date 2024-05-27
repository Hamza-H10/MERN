const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')

const app = express()
app.use(cors({
         origin:["https://mern-frontend-sandy.vercel.app/"],
        methods:["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }))
app.use(express.json())

mongoose.connect('mongodb+srv://root:root@cluster0.lodlqbq.mongodb.net/CRUD?retryWrites=true&w=majority&appName=Cluster0', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB', error);
});

app.get('/', (req, res)=> {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err=> res.json(err))
})

app.get('/getUser/:id',(req, res)=>{
    const id = req.params.id;
    UserModel.findById({_id:id})
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, req.body)
    .then(user => res.json(user))
    .catch(err=>res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(user => res.json(user))
    .catch(err=>res.json(err))

})

app.post("/createUser", (req,res)  => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err=> res.json(err))
})



const server = app.listen(3001, () => {
    console.log("Server is Running");
});

server.on('error', (error) => {
    console.error('Error occurred:', error);
});
