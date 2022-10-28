// Setup empty JS object to act as endpoint for all routes
projectData = {};


// Require Express to run server and routes
const express=require('express');


// Start up an instance of app
const app =express();


/* Middleware*/
const bodyParser=require('body-parser');


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port=8000;
const hostName="127.0.0.1"

app.listen(port,()=>{
    console.log(`server running at http://${hostName}:${port}`)
})


//GET route that returns the projectData object in the server code
const getAll=(req,res)=>{res.send(projectData)};
app.get('/all',getAll);



//POST route that adds incoming data to projectData
const PostData=(req,res)=>{
    projectData=req.body 
    console.log(projectData);
    res.send(projectData);
}
app.post('/add',PostData)
