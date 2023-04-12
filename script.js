// api key
const key = "47be7b98b1c7e38d4dab241de24e7154";

// pulls the local history adds it as buttons in the left column
function getHistory() {
    let cityList = [];
    if (localStorage.getItem("city history") == null) {
        var cityString = JSON.stringify(cityList);
        localStorage.setItem("city history", cityString);
    }
    let locHis = JSON.parse(localStorage.getItem("city history"));
    $("#history").html("");
    locHis.reverse().map((cities) => {
        // (;-_-)
        $("#history").append(
            `<li id="hisBtn" type="button" class="btn btn-primary btn-lg btn-block d-block my-2" style="height: 60px" onClick="searchPrep(this.textContent)">${cities}</li>`
        );
    });
}

// adds an event listener on the search button
$("#sub").click(function (e) {
    e.preventDefault();
    // sets the passed in city name from the input field
    let searchData = $("#sField")[0].value;
    searchPrep(searchData);
});

// whole search and populate data functionality
function searchPrep(searchData) {
    // empties the search field
    $("#sField")[0].value = "";
    // this is to initialize a local storage array
    let cityList = [];
    console.log(localStorage.getItem("city history"))
    if (localStorage.getItem("city history") == null) {
        console.log(localStorage.getItem("city history"))
        var cityString = JSON.stringify(cityList);
        localStorage.setItem("city history", cityString);
    }
    // adds the search to the Local history, but only to a max of 8
    cityList = JSON.parse(localStorage.getItem("city history"));
    if (cityList.length <= 7) {
        cityList.push(searchData);
        let cityString = JSON.stringify(cityList);
        localStorage.setItem("city history", cityString);
        // otherwise remove the oldest one
    } else {
        cityList.shift();
        cityList.push(searchData);
        let cityString = JSON.stringify(cityList);
        localStorage.setItem("city history", cityString);
    }
    getHistory();
    let city = searchData;
    // gets day month and year
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let sameDay;
    // api call for single day weather
    let queryDay =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        key +
        "&units=imperial";
    fetch(queryDay).then((response) => {
        response.json().then((data1) => {
            sameDay = data1;
        });
    });
    // api call for 5 day forcast
    let queryURL =
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        key +
        "&units=imperial";
    fetch(queryURL).then((response) => {
        response.json().then((data) => {
            // (╯°□°)╯︵ ┻━┻  Object Literal time
            document.getElementById("forcast").innerHTML = `
    <div class="card border border-primary">
        <div class=" p-2 bg-info">
            <h1 class="text-light">${sameDay.name} (${
                month + 1
            }/${day}/${year}) </h1>
            <img src="${
                "https://openweathermap.org/img/wn/" +
                sameDay.weather[0].icon +
                "@2x.png"
            }"/>
            <h4>Temp:  ${sameDay.main.temp} °F</h4>
            <h4>Humidity:  ${sameDay.main.humidity} %</h4>
            <h4>Wind:  ${sameDay.wind.speed} MPH</h4>
        </div>
        <div class="container d-flex justify-content-around flex-wrap py-5">
            <div class="col-2 p-1">
                <div class="card text-center border border-primary">
                    <div class="bg-info">
                        <h4 class="text-light">${data.list[4].dt_txt}</h4>
                        <img src="${
                            "https://openweathermap.org/img/wn/" +
                            data.list[4].weather[0].icon +
                            "@2x.png"
                        }"/>
                        <h5>Temp:  ${data.list[4].main.temp} °F</h5>
                        <h5>Humidity:  ${data.list[4].main.humidity} %</h5>
                        <h5>Wind:  ${data.list[4].wind.speed} MPH</h5>
                    </div>
                </div>
            </div>
            <div class="col-2 p-1">
                <div class="card text-center border border-primary">
                    <div class="bg-info">
                        <h4 class="text-light">${data.list[12].dt_txt}</h4>
                        <img src="${
                            "https://openweathermap.org/img/wn/" +
                            data.list[12].weather[0].icon +
                            "@2x.png"
                        }"/>
                        <h5>Temp:  ${data.list[12].main.temp} °F</h5>
                        <h5>Humidity:  ${data.list[12].main.humidity} %</h5>
                        <h5>Wind:  ${data.list[12].wind.speed} MPH</h5>
                    </div>
                </div>
            </div>
            <div class="col-2 p-1">
                <div class="card text-center border border-primary">
                    <div class="bg-info">
                        <h4 class="text-light">${data.list[20].dt_txt}</h4>
                        <img src="${
                            "https://openweathermap.org/img/wn/" +
                            data.list[20].weather[0].icon +
                            "@2x.png"
                        }"/>
                        <h5>Temp:  ${data.list[20].main.temp} °F</h5>
                        <h5>Humidity:  ${data.list[20].main.humidity} %</h5>
                        <h5>Wind:  ${data.list[20].wind.speed} MPH</h5>
                    </div>
                </div>
            </div>
            <div class="col-2 p-1">
                <div class="card text-center border border-primary">
                    <div class="bg-info">
                        <h4 class="text-light">${data.list[28].dt_txt}</h4>
                        <img src="${
                            "https://openweathermap.org/img/wn/" +
                            data.list[28].weather[0].icon +
                            "@2x.png"
                        }"/>
                        <h5>Temp:  ${data.list[28].main.temp} °F</h5>
                        <h5>Humidity:  ${data.list[28].main.humidity} %</h5>
                        <h5>Wind:  ${data.list[28].wind.speed} MPH</h5>
                    </div>
                </div>
            </div>
            <div class="col-2 p-1">
                <div class="card text-center border border-primary">
                    <div class="bg-info">
                        <h4 class="text-light">${data.list[36].dt_txt}</h3>
                        <img src="${
                            "https://openweathermap.org/img/wn/" +
                            data.list[36].weather[0].icon +
                            "@2x.png"
                        }"/>
                        <h5>Temp:  ${data.list[36].main.temp} °F</h4>
                        <h5>Humidity:  ${data.list[36].main.humidity} %</h4>
                        <h5>Wind:  ${data.list[36].wind.speed} MPH</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
            `;
        });
    });
}

// init for getting local history
getHistory();
