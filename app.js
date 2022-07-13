// Personal API Key for OpenWeatherMap API
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = 'cfee773d0045ecd4d542df2d5755e0c4&units=metric';

// Create a new date instance dynamically with JS
let date = new Date();
const month =["January","February","March","April","May","June","July","August","September","October","November","December"]
let newDate = month[date.getMonth()]+'.'+ date.getDate()+'.'+ date.getFullYear();
//console.log(newDate);//

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const myFeelings = document.getElementById('feelings').value
    getTemperature(baseUrl, zipCode, apikey)

    .then(function(data) {

        postData('http://127.0.0.1:8080/addedData/ ', { date: newDate, temperature: data.main.temp, content: myFeelings } );

    })

    .then(()=>
        updateUI()
        );
        
};

/* Function to GET Web API Data*/
const getTemperature = async (baseUrl, zipCode, apiKey) =>{
    const response = await fetch( baseUrl + zipCode + ',us' + '&appid=' + apiKey);
    try {

        const data = await response.json();
        //console.log(data)
        return data;
      }  catch(error) {
        console.log("Error", error);
        // to effectively handle the error
      };
};


/* Function to POST data */
const postData = async ( url = 'http://127.0.0.1:8080/addedData/', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });
    

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("Error", error);
      }

}

/* Function to update UI elements*/
const updateUI = async () => {
    const request = await fetch(' http://127.0.0.1:8080/all/');
    try{
      const allData = await request.json();

      document.getElementById('date').innerHTML= 'Date:' + allData.date;
      document.getElementById('temp').innerHTML= 'The Current Temperature:' + allData.temperature + '&degC';
      document.getElementById('content').innerHTML= 'My Feelings:' + allData.content;
  
    }catch(error){
      console.log("error", error);
    }
  }



