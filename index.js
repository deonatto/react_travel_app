const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users');


const app = express();

dotenv.config();

app.use(cors({
    methods: ["GET", "POST", "PUT"],
    credentials: true
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL,
{useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log('succesfully connected to database');
    //initial();
}).catch(err =>{
    console.error("Connection error", err);

});

app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

app.listen(process.env.PORT || 8800, ()=>{
    console.log("server running on port");
});

