
///Things that we need to make.
  //Store the searches. --Even if we' havent implemented the search
  //For this we need to create a placeholder for the array
  //
  //search by clicking the button.



var previousSearches = {};



//*****************/
// This section figures out the api call to the weather app
//
//****************/

function searchAPI(searchValue){

    // This is our API key
    var APIKey = "&appid=166a433c57516f51dfab1f7edaed8413";
    var q = "q="+searchValue;
    //"q=Bujumbura,Burundi"
    // Here we are building the URL we need to query the database

    if(!searchValue){
        console.log(searchValue);
        return;
    }


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
      q + APIKey;
    
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
    
        // Log the queryURL
        console.log(queryURL);
    
        // Log the resulting object
        console.log(response);
    
        // Transfer content to HTML
        $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
    
        // add temp content to html
        $(".temp").text("Temperature (K) " + response.main.temp);
        $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
    
        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + tempF);

        //We'll only add the result to storage if we have one.
        storeResults(response.name);
      });

}



//*****************/
// End of Api call section
//****************/
loadPreviousSearches();

function loadPreviousSearches(){
    //Lets load the previous searches.
    //We should Only search for the last 5?
    previousSearches = JSON.parse(localStorage.getItem("searchRecords"));
    console.log(previousSearches);
    if(previousSearches){
        console.log("Populating list..");
    }else{
        console.log("No Previous Searches done..");
    }

}


function storeResults(resultToStore){
    previousSearches.push(resultToStore);
    localStorage.setItem("searchRecords", JSON.stringify(previousSearches));
}


$("#srchBtn").on("click", function(event) {

    // Preventing the submit button from trying to submit the form
    // We're optionally using a form so the user may hit Enter to search instead of clicking the button
    event.preventDefault();
    //console.log(event);
    var searchInput = $("#search-input").val();
    console.log(searchInput);

    searchAPI(searchInput);


});