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
            //CreateRSSLink
            createLink(locationCode);
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
    for (var i = 0; i < titleArray.length; i++){
		//CreateASubstringFromTheFirstPositionInTheArrayElementToThe:CharacterAtTheEndOfTheDayEntry
		var daySubString = titleArray[i].substring(0, titleArray[i].indexOf(':'))
		//AddTheSubstringToTheHTMLElementToDisplyTheDay
		dayElements[i].html(daySubString);
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
		//CreateASubstringAfterTheFirstEmptyPositionInTheDayEntryInTheArrayElementToThe,CharacterAtTheWeatherTypeEntry
		var weatherSubString = titleArray[i].substring(titleArray[i].indexOf(' ') + 1, titleArray[i].indexOf(','))
		//AddTheSubstringToTheHTMLElementToDisplyTheWeather
		forecastTextArray[i].html(weatherSubString);
		//AddTheWeatherTypeImages
		forecastImageArray[i].attr("src", "images/" + weatherSubString + ".gif");
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
        if(titleArray[i].indexOf("Maximum") > -1) {
            //IfMaximumExistsStartStringAtMaximum
            stringStart = titleArray[i].indexOf("Maximum");
        }
        else{
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
            //CreateRSSLinkWithPostCode
            createLink(postCode);
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
//GetRSSLink
function createLink(code){
    //PartOneOfBBCRSSFeedLink
    var bbcStringStart = "http://open.live.bbc.co.uk/weather/feeds/en/";
    //PartThreeOfBBCRSSFeedLink
    var bbcStringEnd = "/3dayforecast.rss";
    //CombineStringForUrl
    var feedURL = bbcStringStart.concat(code, bbcStringEnd);
    //SendUrlTojGFeed
    getFeed(feedURL);
}