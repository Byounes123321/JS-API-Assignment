window.onload = function () {
    // window.onload function to connect to the dom properly

    // declaration of variables
    var output = document.getElementById("output");
    var toronto = document.getElementById("Toronto");
    var beirut = document.getElementById("Beirut");
    var local = document.getElementById("location");
    var icon = document.getElementById("icon");
    var con = document.getElementById("conditions");
    var temp = document.getElementById("temperature");
    var wind = document.getElementById("wind");
    var err = document.getElementById("err");

    var city = "";

    // Toronto button clicked and API is called
    var show_t = false;
    toronto.onclick = function () {
        if (show_t == false) {
            output.style.display = "block";
            show_t = true;
            city = "toronto";
            callApi();
        } else {
            output.style.display = "none";
            show_t = false;
        }
    };

    //Beirut button is clicked and API is called
    var show_b = false;
    beirut.onclick = function () {
        if (show_b == false) {
            output.style.display = "block";
            show_b = true;
            city = "beirut";
            callApi();
        } else {
            output.style.display = "none";
            show_b = false;
        }
    };

    //Weather API function
    function callApi() {


        const api_key = "a2e92d24d11c72165022c21470ab1c6c";

        //var city to allow for the addition of new citys
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api_key + "&units=metric";


        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

                if (xhr.status === 200) {
                    const data = xhr.response;
                    console.log(data);
                    //get information from the api and display it on dom
                    local.innerHTML = data.name;

                    iconimg = data.weather[0].icon;
                    icon.src = "./openweathermap-api-icons/icons/" + data.weather[0].icon + ".png";

                    temp.innerHTML = data.main.temp + "°C";

                    con.innerHTML = data.weather[0].description;
                    wind.innerHTML = data.wind.speed + " Meters/Second";

                } else if (xhr.status !== 0 || xhr.status !== 200) {
                    console.log(xhr.status);

                    //Error message if API fails

                    output.style.display = "none";
                    err.style.display = "block";
                }
            }
        }
        xhr.open('GET', url);

        xhr.responseType = "json";
        xhr.send(null);
    };
};