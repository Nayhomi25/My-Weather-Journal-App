// Setup empty JS object to act as endpoint for all routes//
projectData = {};

// Require Express to run server and routes//
const express = require('express');

// Start up an instance of app//
const app = express();

//Dependencies//
const bodyParser = require('body-parser');


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Cors for cross origin allowance//
const cors = require('cors');
const { request } = require('express');
const { response } = require('express');
app.use(cors())


// Initialize the main project folder//
app.use(express.static('website'));



// Setup Server//
const port = 8080;
const hostName = 'localHost';

const server = app.listen(port,() => {
  console.log(`Server is running on ${hostName}: ${port}`);
});

//callback function to complete GET '/all'//
app.get('/all', sendData)

function sendData (request, response) {
    response.send(projectData)
}

// Post Route to add incoming data//

const data =[];

app.post('/addedData', addData);

function addData(request,response){
  data.push(request.body);
  console.log(data)

  projectData.temperature = request.body.temperature;
  projectData.date = request.body.date;
  projectData.content = request.body.content;
  response.end();
  
}