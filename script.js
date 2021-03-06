

var userCityArray = JSON.parse(localStorage.getItem("userCityArray")) || [];

localStorage.clear();

// add click event to search button

$("#search-button").on("click", function(event) {
    // prevent page from reloading on form submit
    event.preventDefault();
    // build the query url for the ajax request to the open weather API
    var searchValue = $("#search-value").val();
    userCityArray.push(searchValue);
 
    localStorage.setItem("userCityArray", JSON.stringify(userCityArray));

    for (var i = 0; i < userCityArray.length; i++) {
        var cityButton = $('<button/>').addClass("btn btn-light d-inline historyItem mr-1 mt-1").text(userCityArray[i]);
    }
    $(".history").append(cityButton);




    var apiKey = "76093c5b76715cabd5992fc44d0a2e7e"
    var queryCurrentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&APPID=" + apiKey;
    // make ajax request to the API and GET JSON data
    // data then passed as an argument to the updatePage function
    $.ajax({
        url: queryCurrentURL,
        method: "GET"
    }).then(updateCurrentWeather);

    //api.openweathermap.org/data/2.5/forecast?q
    var queryForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&APPID=" + apiKey;
    $.ajax({
        url: queryForecastURL,
        method: "GET"
    }).then(updateForecastWeather);
});

function updateForecastWeather(ForecastData){
    $("#forecastContainer").html("<div>").append("<div class='row justify-content-around text-justify' id='forecastRowContainer'>");
    for(var i = 0; i < ForecastData.list.length; i++) {
        if(ForecastData.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            var col = $("<div>").addClass("forecast-div").addClass("col-md-2").addClass("card mb-3").addClass("cardBackground");
            var Ftemp_f = $("<p>").addClass("card-text").text("Temperature: " + ((Number(JSON.stringify(ForecastData.list[i].main.temp)) - 273.15) * 9/5 + 32).toFixed(2) + " °F");
            var humid_f = $("<p>").addClass("card-text").text("Humidity: " + JSON.stringify(ForecastData.list[i].main.humidity) + "%");
            var wind_f = $("<p>").addClass("card-text mb-2").text("Wind Speed: " + JSON.stringify(ForecastData.list[i].wind.speed) + " MPH");
            var img_f = $("<img>").addClass("h-100 rounded mx-auto d-block").attr("src","https://openweathermap.org/img/wn/" + ForecastData.list[i].weather[0].icon + "@2x.png").addClass("fixImg");
            var descr_F = $("<p>").addClass("card-text text-center textEffect text-white mb-2").text(JSON.parse(JSON.stringify(ForecastData.list[i].weather[0].description)));
            var Datef = $("<p>").addClass("card-text text-center mt-2").text(JSON.parse(JSON.stringify(ForecastData.list[i].dt_txt)).substring(0, 10));
            col.append(Datef, img_f, descr_F, Ftemp_f, humid_f, wind_f);
            $("#forecastRowContainer").append(col);
        }
    }
}


function updateCurrentWeather(Data) {
    var title = $("<h3>").addClass("card-title text-center").text(JSON.parse(JSON.stringify(Data.name)));
   
    // (K − 273.15) × 9/5 + 32 = °F
    var Ftemp = $("<p>").addClass("card-text").text("Temperature: " + ((Number(JSON.stringify(Data.main.temp)) - 273.15) * 9/5 + 32).toFixed(2) + " °F");
    var humid = $("<p>").addClass("card-text").text("Humidity: " + JSON.stringify(Data.main.humidity) + "%");
    var wind = $("<p>").addClass("card-text").text("Wind Speed: " + JSON.stringify(Data.wind.speed) + " MPH");
    var img = $("<img>").attr("src","https://openweathermap.org/img/wn/" + Data.weather[0].icon + "@2x.png").addClass("rounded mx-auto d-block"); 
    var descr = $("<p>").addClass("card-text text-center textEffect").text(JSON.parse(JSON.stringify(Data.weather[0].description)));
    // var currentDate = moment().format('MMMM Do YYYY, h:mm A')  
    // $(".card-header").html("<div>").append(currentDate); 
    $("#todayContainer").html("<div>").append(title, img, descr, Ftemp, humid, wind); 
}







