/**
 * Created with JetBrains WebStorm.
 * User: Dan
 * Date: 09/04/14
 * Time: 14:14
 * To change this template use File | Settings | File Templates.
 */

//ArrayToStoreForecastInformation
var titleArray = [];
//VariablesToSaveAndLoadForecastStrings
var dayOneForecast;
var dayTwoForecast;
var dayThreeForecast;
//VariableToLoadAndStoreLocationName
var locationName;
//StoreLatAndLongValues
var userLat;
var userLng;
//GetNewGeocodeFromGoogle
var geocoder;
//GetSelectedLocationFromSearchBox
$(document).ready(function () {
    //IfDeviceOnlineGetFeedWithURL
    if (window.navigator.onLine) {
        //CheckForNewCache
        updateAppCache();
        //GetFeedForSelectedLocation
        $(".selectedLocation").bind('click', function () {
			//GetIdOfSelectedLocation
            var locationCode = $(this).attr("id");
			//GetRSSFeed
			getFeed(locationCode);
			//GetTextFromListItem
			var locationName = $(this).text();
            //GetLocationName
            displayLocationName(locationName);
        });
        $("#geolocationButton").bind('click', function () {
            getLocation();
        });
		$("#homeButton").bind('click', function () {
            clearInfo();
        });
    }
    else {
        //IfNotOnlineGetLastAccessedInfo
        locationName = localStorage.getItem("lastLocation");
        titleArray[0] = localStorage.getItem("dayOne");
        titleArray[1] = localStorage.getItem("dayTwo");
        titleArray[2] = localStorage.getItem("dayThree");
        //ShowLocation
        //displayLocationName(locationName);
        $("#weatherTitle").text("locationName");
        //GetTheForecastDays
        showFeedDays();
        //GetWeather
        displayForecast();
        //GetTemperature
        displayTemp();
    }
});
//DisplayLocationNameInHeader
function displayLocationName(selectedLocation) {
    //WriteSelectedLocationNameInDisplayPagHeader
    $("#weatherTitle").html(selectedLocation);
    //SaveLocationNameToStorage
    localStorage.setItem("lastLocation", selectedLocation);
}
//GetFeeds
function getFeed(url) {
    $.jGFeed(url,
        function (feeds) {
            if (!feeds) {
                //IfNoFeedsShowErrorMessage
                $("#dayOneDate").html = ("Error No Information Available");
            }
            else{
                for (var i = 0; i < feeds.entries.length; i++) {
                    var entry = feeds.entries[i];
                    var title = entry.title;

                    if (i == 0) {
                        titleArray[0] = title;
                    }
                    if (i == 1) {
                        titleArray[1] = title;
                    }
                    if (i == 2) {
                        titleArray[2] = title;
                    }
                }
                //GetTheForecastDays
                showFeedDays();
                //GetWeather
                displayForecast();
                //GetTemperature
                displayTemp();
                //SaveTheStrings
                saveWeatherDetails();
            }
        }, 3);
}
//FindOutTheDayFromTheEntryAndDisplayToUser
function showFeedDays() {
    //AnArrayToStoreTheDivElementsThatDisplayTheForecastDays
    var dayElements = [];
    dayElements[0] = $("#dayOneDate");
    dayElements[1] = $("#dayTwoDate");
    dayElements[2] = $("#dayThreeDate");
    //LoopThroughTheTitleArrayAndAssignTheDayNamesToEachDivElement
    for (var i = 0; i < titleArray.length; i++) {
        //CheckWhatDayIsInTheSting
        if (titleArray[i].indexOf("Sunday") > -1) {
            //WriteTheDayThatExistsInEachDivElement
            dayElements[i].html("Sunday:");
        }
        if (titleArray[i].indexOf("Monday") > -1) {
            dayElements[i].html("Monday:");
        }
        if (titleArray[i].indexOf("Tuesday") > -1) {
            dayElements[i].html("Tuesday:");
        }
        if (titleArray[i].indexOf("Wednesday") > -1) {
            dayElements[i].html("Wednesday:");
        }
        if (titleArray[i].indexOf("Thursday") > -1) {
            dayElements[i].html("Thursday:");
        }
        if (titleArray[i].indexOf("Friday") > -1) {
            dayElements[i].html("Friday:");
        }
        if (titleArray[i].indexOf("Saturday") > -1) {
            dayElements[i].html("Saturday:");
        }
    }
}
//DisplayTheForecastInTextAndImageFormat
function displayForecast() {
    //SetForecastTextDivsInArray
    var forecastTextArray = [];
    forecastTextArray[0] = $("#dayOneForecastText");
    forecastTextArray[1] = $("#dayTwoForecastText");
    forecastTextArray[2] = $("#dayThreeForecastText");
    //SetForecastImageDivsInArray
    var forecastImageArray = [];
    forecastImageArray[0] = $("#dayOneForecastImage");
    forecastImageArray[1] = $("#dayTwoForecastImage");
    forecastImageArray[2] = $("#dayThreeForecastImage");
    //GetForecastForTheThreeDays
    for (var i = 0; i < titleArray.length; i++) {
        //CheckForClearSky
        if (titleArray[i].indexOf("Clear Sky") >= 1) {
            forecastTextArray[i].html("Clear Sky");
            forecastImageArray[i].attr("src", "images/clearSky.png");
        }
        //CheckForSunny
        if (titleArray[i].indexOf("Sunny") >= 1) {
            forecastTextArray[i].html("Sunny");
            forecastImageArray[i].attr("src", "images/sunny.gif");
        }
        //CheckForPartlyCloudy
        if (titleArray[i].indexOf("Partly Cloudy") >= 1) {
            forecastTextArray[i].html("Partly Cloudy");
            forecastImageArray[i].attr("src", "images/partlyCloudy.gif");
        }
        //CheckForSunnyIntervals
        if (titleArray[i].indexOf("Sunny Intervals") >= 1) {
            forecastTextArray[i].html("Sunny Intervals");
            forecastImageArray[i].attr("src", "images/sunnyIntervals.gif");
        }
        //CheckForLightCloud
        if (titleArray[i].indexOf("Light Cloud") >= 1) {
            forecastTextArray[i].html("Light Cloud");
            forecastImageArray[i].attr("src", "images/lightCloud.gif");
        }
        //CheckForThickCloud
        if (titleArray[i].indexOf("Thick Cloud") >= 1) {
            forecastTextArray[i].html("Thick Cloud");
            forecastImageArray[i].attr("src", "images/thickCloud.gif");
        }
        //CheckForDrizzle
        if (titleArray[i].indexOf("Drizzle") >= 1) {
            forecastTextArray[i].html("Drizzle");
            forecastImageArray[i].attr("src", "images/lightRain.gif");
        }
        //CheckForLightRain
        if (titleArray[i].indexOf("Light Rain") >= 1) {
            forecastTextArray[i].html("Light Rain");
            forecastImageArray[i].attr("src", "images/lightRain.gif");
        }
        //CheckForHeavyRain
        if (titleArray[i].indexOf("Heavy Rain") >= 1) {
            forecastTextArray[i].html("Heavy Rain");
            forecastImageArray[i].attr("src", "images/heavyRain.gif");
        }
        //CheckForLightSnow
        if (titleArray[i].indexOf("Light Snow") >= 1) {
            forecastTextArray[i].html("Light Snow");
            forecastImageArray[i].attr("src", "images/lightSnow.gif");
        }
        //CheckForHeavySnow
        if (titleArray[i].indexOf("Heavy Snow") >= 1) {
            forecastTextArray[i].html("Heavy Snow");
            forecastImageArray[i].attr("src", "images/heavySnow.gif");
        }
        //CheckForThunder
        if (titleArray[i].indexOf("Thunder") >= 1) {
            forecastTextArray[i].html("Thunder");
            forecastImageArray[i].attr("src", "images/thunder.gif");
        }
        //CheckForSleet
        if (titleArray[i].indexOf("Sleet") >= 1) {
            forecastTextArray[i].html("Sleet");
            forecastImageArray[i].attr("src", "images/sleet.gif");
        }
        //CheckForHail
        if (titleArray[i].indexOf("Hail") >= 1) {
            forecastTextArray[i].html("Hail");
            forecastImageArray[i].attr("src", "images/hail.gif");
        }
        //CheckForTropicalStorm
        if (titleArray[i].indexOf("Tropical Storm") >= 1) {
            forecastTextArray[i].html("Tropical Storm");
            forecastImageArray[i].attr("src", "images/tropicalStorm.gif");
        }
        //CheckForHail
        if (titleArray[i].indexOf("Fog") >= 1) {
            forecastTextArray[i].html("Fog");
            forecastImageArray[i].attr("src", "images/fog.png");
        }
        //CheckForHaze
        if (titleArray[i].indexOf("Haze") >= 1) {
            forecastTextArray[i].html("Haze");
            forecastImageArray[i].attr("src", "images/haze.png");
        }
        //CheckForMist
        if (titleArray[i].indexOf("Mist") >= 1) {
            forecastTextArray[i].html("Mist");
            forecastImageArray[i].attr("src", "images/mist.png");
        }
    }
}
//DisplayTemperature
function displayTemp() {
    //VariableToHoldTheStartPositionOfMaximumOrMinimum
    var stringStart;
    //ArrayToHoldTemperatureDivElements
    var tempElementArray = [];
    tempElementArray[0] = $("#dayOneTemp");
    tempElementArray[1] = $("#dayTwoTemp");
    tempElementArray[2] = $("#dayThreeTemp");
    //LoopThroughTheTitleArrayAndAssignTemperaturesToEachDivElement
    for (var i = 0; i < titleArray.length; i++) {
        //GetTheTemperatureForCurrentDay
        if (titleArray[i].indexOf("Maximum") > -1) {
            //IfMaximumExistsStartStringAtMaximum
            stringStart = titleArray[i].indexOf("Maximum");
        }
        else {
            //ElseStartStringAtMinimum
            stringStart = titleArray[i].indexOf("Minimum");
        }
        //CreateTemperatureSubstringFromMaxOrMinStartingPoint
        var tempString = titleArray[i].substring(stringStart);
        //WriteThatToEachDivElement
        tempElementArray[i].html(tempString);
    }
}
//SaveStringsToLocalStorage
function saveWeatherDetails() {
    //SetArrayValuesToVariablesForSaving
    dayOneForecast = titleArray[0];
    dayTwoForecast = titleArray[1];
    dayThreeForecast = titleArray[2];
    //SaveStringVariablesToLocalStorage
    localStorage.setItem("dayOne", dayOneForecast);
    localStorage.setItem("dayTwo", dayTwoForecast);
    localStorage.setItem("dayThree", dayThreeForecast);
}
//UpdateApplicationCacheAndManifest
function updateAppCache() {
    var appCache = window.applicationCache;
    //CheckForNewVersionOfCache
    appCache.addEventListener('updateready', function () {
        //BrowserDownloadedNewCache
        if (appCache.status == appCache.UPDATEREADY) {
            //SwapTheOldCacheWithTheNewOneAndReloadThePageToMakeUseOfNewCache
            appCache.swapCache();
            //IfNewManifestAvailableAskUserIfTheyWouldLikeToUpdate
            if (confirm('A new version of this site is available. Load it?')) {
                //IfYesToUpdateThenRefreshPage
                window.location.reload();
            }
            else {
                //DoNotUpdate
            }
        }
        //IfNoChangeToManifestDoNothing
        else {
        }
    }, false);
}
//GetGeo-locationPermission
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationFail);
		 $("#dayOneDate").html("Geo-location On");
    }
    else {
        $("#dayOneDate").html("Your browser does not support Geo-location");
    }
}
//SaveDetailsIfGeo-locationSuccess
function locationSuccess(position) {
	//MessageToAlertUserThatAppIsSearchingForTheirPostcode
    $("#dayOneDate").html("Searching for postcode....");
    //SaveLocationValues
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
    //RunPostcodeFunction
    codeLatLng();
}
//DisplayErrorMessageIfLocationNotFound
function locationFail() {
    $("#dayOneDate").html("Geo-location could not find you at this time");
}
//GetPostcodeUsingGoogleMaps
function codeLatLng() {
	//GetNewGeocoderForLocation
	geocoder = new google.maps.Geocoder();
	//GetPositionFromLatitudeAndLongitude
	var latlng = new google.maps.LatLng(userLat, userLng);
	//CheckConnectionToGoogleMapsAPI
	geocoder.geocode({'latLng': latlng}, function(results, status){
		//ThereIsAConnection
		if(status==google.maps.GeocoderStatus.OK){		
			//GetPostCodeFromResult
			var postCode = results[0].address_components[6].short_name;
			$("#dayOneDate").html(postCode);
            //EnsurePostCodeIsALowerCaseStringWithNoWhiteSpace
            postCode = postCode.toString();
            postCode = postCode.toLowerCase();
            postCode = postCode.replace(/\s+/g, ' ');	
            //PartOneOfBBCRSSFeedLink
            var bbcStringStart = "http://open.live.bbc.co.uk/weather/feeds/en/";			
            //PartThreeOfBBCRSSFeedLink
            var bbcStringEnd = "/3dayforecast.rss";
            //CombineStringForUrl
            var feedURL = bbcStringStart.concat(postCode, bbcStringEnd);			
            //SendUrlTojGFeed
            getFeed(feedURL);	
			//GetCityNameFromResult
            var locationName = results[0].address_components[1].short_name;		
            //DisplayCityName
            displayLocationName(locationName);	
		}
		//NoConnection
		else{
			$("#dayOneDate").html("Your position could not be found at this time");
		}
	});	
}
//ClearInfo
function clearInfo() {
	//ClearLocationName
	$("#weatherTitle").html("");
	//ClearDay
	$("#dayOneDate").html("");
	$("#dayTwoDate").html("");
	$("#dayThreeDate").html("");
	//ClearForcastText
	$("#dayOneForecastText").html("");
	$("#dayTwoForecastText").html("");
	$("#dayThreeForecastText").html("");
	//ClearForecatsImage
	$("#dayOneForecastImage").attr("src", "images/noData.png");
	$("#dayTwoForecastImage").attr("src", "images/noData.png");
	$("#dayThreeForecastImage").attr("src", "images/noData.png");
	//ClearTempDisplay
	$("#dayOneTemp").html("");
	$("#dayTwoTemp").html("");
	$("#dayThreeTemp").html("");
}