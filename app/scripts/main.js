console.log('\'Allo \'Allo!');
$('#datepicker').datepicker().on("change", function () {
    $('#today').text($.format.date(new Date(this.value), "ddd, d MMMM yyyy"));

});
$('#today').text($.format.date(new Date(), "ddd, d MMMM yyyy"));
var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: new google.maps.LatLng(1.2674, 103.82700833333334),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    //maps white-gray theme
    // styles: [{ 'featureType': 'water', 'elementType': 'geometry', 'stylers': [{ 'color': '#e9e9e9' }, { 'lightness': 17 }] }, { 'featureType': 'landscape', 'elementType': 'geometry', 'stylers': [{ 'color': '#f5f5f5' }, { 'lightness': 20 }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#ffffff' }, { 'lightness': 17 }] }, { 'featureType': 'road.highway', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#ffffff' }, { 'lightness': 29 }, { 'weight': 0.2 }] }, { 'featureType': 'road.arterial', 'elementType': 'geometry', 'stylers': [{ 'color': '#ffffff' }, { 'lightness': 18 }] }, { 'featureType': 'road.local', 'elementType': 'geometry', 'stylers': [{ 'color': '#ffffff' }, { 'lightness': 16 }] }, { 'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{ 'color': '#f5f5f5' }, { 'lightness': 21 }] }, { 'featureType': 'poi.park', 'elementType': 'geometry', 'stylers': [{ 'color': '#dedede' }, { 'lightness': 21 }] }, { 'elementType': 'labels.text.stroke', 'stylers': [{ 'visibility': 'on' }, { 'color': '#ffffff' }, { 'lightness': 16 }] }, { 'elementType': 'labels.text.fill', 'stylers': [{ 'saturation': 36 }, { 'color': '#333333' }, { 'lightness': 40 }] }, { 'elementType': 'labels.icon', 'stylers': [{ 'visibility': 'off' }] }, { 'featureType': 'transit', 'elementType': 'geometry', 'stylers': [{ 'color': '#f2f2f2' }, { 'lightness': 19 }] }, { 'featureType': 'administrative', 'elementType': 'geometry.fill', 'stylers': [{ 'color': '#fefefe' }, { 'lightness': 20 }] }, { 'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{ 'color': '#fefefe' }, { 'lightness': 17 }, { 'weight': 1.2 }] }]
});
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);
$(window).resize(function () {
    drawChart();
});
function drawChart() {
    var chartwidth = $('#lines').width();
    var chartheight = $('#lines').height();
    var linedata = google.visualization.arrayToDataTable([
        ['Day', 'Utilized ', 'On Site'],
        ['Sat', 1000, 400],
        ['Sun', 1170, 460],
        ['Mon', 2660, 1120],
        ['Tue', 1030, 540],
        ['Wed', 6432, 1120],
        ['Thu', 4553, 3213],
        ['Fri', 4324, 321],
    ]);

    var lineoptions = {
        chartArea: { width: chartwidth - 50, left: 40, top: 40, height: chartheight - 80 },
        title: 'Current Utilisation',
        legend: { position: 'top' },
        series: {
            0: { color: '#00c7ff' },
            1: { color: '#ffa600' },
        },
    };

    var chart1 = new google.visualization.AreaChart(document.getElementById('lines'));

    chart1.draw(linedata, lineoptions);
    var piewidth = $('#pie').width();
    var pietheight = $('#pie').height();
    var piedata = google.visualization.arrayToDataTable([
        ['', ''],
        ['Utilized', 80.6],
        ['On site', 19.4],
    ]);

    var pieoptions = {
        // chartArea: { width: piewidth + 10, left: 0, top: 20, height: pieheight - 30 },
        title: 'Total Utilization',
        colors: ['#00c7ff', '#ffa600'],
        legend: { position: 'bottom' }
    };

    var chart2 = new google.visualization.PieChart(document.getElementById('pie'));

    chart2.draw(piedata, pieoptions);
}
var infowindow = new google.maps.InfoWindow({ maxWidth: 200 });

var marker, i;
// setting bounds makes sure all points are shown in the map when it starts
//var bounds=new google.maps.LatLngBounds();

var markers = [];
var counter = [];
var reader;
var array = [];
var coordinates = [];
var count = -1;
var cluster = false;
var polyArray = [];
var container = '';
var currentSpeed = 0;//update current speed each time and add to avg speed
var avgSpeed = 0;
var counter2 = 0;
var coordinatesIndex = 0;
var currentMarkers = [];
var units = 'metric';
var polyLines = [];
//get selected options
// document.getElementById('StartDate').test.valueAsDate = new Date();
var now = new Date();
var lastTime = '144500';
var lastDate = '210617';
var lastYear = '20' + lastDate.substring(4);
var lastMonth = lastDate.substring(2, 4);
var lastDay = lastDate.substring(0, 2);
var lastHour = lastTime.substring(0, 2);
var lastMinute = lastTime.substring(2, 4);
var lastSecond = lastTime.substring(4);
//var d = new Date("2015-03-25T12:00:00Z"); formate to create a full date T separates time Z denotes UTC timezone
var dateString = lastYear + '-' + lastMonth + '-' + lastDay + 'T' + lastHour + ':' + lastMinute + ':' + lastSecond;//+"Z";
var oldDate = new Date(dateString);
var miliSecondsSinceTransmission = now - oldDate;
var inDay = 0;
var outDay = 0;
var selectedArray = [];
var latRef = 1 + 18 / 60 + 44.2 / 3600;
var lonRef = 103 + 41 / 60 + 50.0 / 3600;
var lastElement = 1;

// var currentYear=now.getUTCFullYear();
// var currentMonth=now.getUTCMonth()+1;//this is 0 indexed while gps is not
// var currentDay=now.getUTCDate();
// var currentHour=now.getHours();
// var currentMinute=now.getUTCMinutes();
// var currentSecond=now.getUTCSeconds();
var secondSinceTransmission = miliSecondsSinceTransmission / 1000;
var minutesSinceTransmission = secondSinceTransmission / 60;
var hoursSinceTransmission = minutesSinceTransmission / 60;
//document.getElementById("timeSinceTransmission").innerText=minutesSinceTransmission.toFixed(1);
// if(hoursSinceTransmission>=1){
//   document.getElementById("timeSinceTransmission").innerText=hoursSinceTransmission.toFixed(1);
//   document.getElementById("timeUnits").innerText="Hours";
// }



var a = document.getElementsByName('list')[0];
var selected = a.selectedOptions;
var currentSpeedKnots = 10;
var currentSpeedMph = currentSpeedKnots * 1.15078;
var currentSpeedKmh = currentSpeedKnots * 1.852;
var avgSpeedKnots = 5;
var avgSpeedMph = avgSpeedKnots * 1.15078;
var avgSpeedKmh = avgSpeedKnots * 1.852;
var deviceIdArray = ['89372021161013006004', '89372021161013005998', '89372021161013005980', '89372021161013005972', '89372021161013005964', '89372021161013005956', '89372021161013005949', '89372021161013005931', '89372021161013005923', '89372021161013002128', '89372021140303147991', '89372021140303147983', '89372021140303147975', '89372021140303147967', '89372021140303147959', '357520071754515', '357520071760884', '357520071775908', '357520071767285', '357520071752758', '357520071775981', '357520071753012', '357520071754176', '357520071754127', '357520071752824', '357520071760736', '357520071753046', '357520071775924', '357520071760934', '357520071767624', '357520071754192', '357520071754150', '357520071754184'];
// trying array of objects
var deviceArray = []; // add object to this in the same order as the device ID array if possible
for (var i = 0; i < deviceIdArray.length; i++) {
    deviceArray.push({ deviceId: deviceIdArray[i], path: [], polyPath: [] });
}
//need to make a an array of the path for each device and push it into the object
var testObj = { currentSpeed: 10, deviceId: 1, };
var currentPositionIcon = {};
var icon = {};
var volLength = 1;
var endVal = 0;//volLength;
var startValue = 0;
var lastSOC = [4200, 100];
//deviceArray.push(testObj);
function updateList() {
    selectedArray = [];
    var objectArray = [];
    for (var i = 0; i < selected.length; i++) {
        selectedArray.push(selected[i].value);
    }
    beginMap();
    updateSOCAndLocation();
}

function beginMap() {
    var coordinatesIndex = -1;
    var coordinates = [];
    coordinates.length = 0;
    var bounds = new google.maps.LatLngBounds();
    //clear all old markers
    for (var k = 0; k < markers.length; k++) {
        markers[k].setMap(null);
        //polyLines[k].setMap(null);

    }
    markers.length = 0;
    polyArray = [];
    // clear polyPath
    for (var l = 0; l < deviceArray.length; l++) {
        deviceArray[l].polyPath.length = 0;
        deviceArray[l].path.length = 0;
    }
    for (var m = 0; m < polyLines.length; m++) {
        polyLines[m].setMap(null);
    }
    polyLines.length = 0;
    // grab all the data from test and plot it
    // ignore clusters for now
    //iterate through each point and append the appropriate data to coordinates
    //array has properties so don't have to deal with substrings as much
    // do still have to convert DMM to DDD
    for (var i = 0; i < test.length; i++) {
        // code for Nasim's tracker
        //need to check if IMEI!=Null 
        // use that as trigger to change the variables below
        var innerArray = [];
        var lat = '';
        var latH = '';
        var lon = '';
        var lonH = '';
        var time = '';
        var date = '';
        var deviceId = '';
        var charge = '';


        // if(test[i].IMEI===null){
        //   label="";
        //   label+=String(i);
        //   lat=test[i].Lat;       // "0118.4012"
        //  //console.log('lat:', lat);
        //   latH=test[i].LatH;
        //   lon=test[i].Lon;
        //   lonH=test[i].LonH;
        //   time=test[i].Time;
        //   date=test[i].Date1;
        //  // latitude conversion 
        //   deviceId=test[i].DeviceId;
        //    container=deviceId;
        //    charge=test[i].Charge;

        //   if(charge!==null){
        //   var SOC=charge.substring(8,10);
        // }
        // }
        //else{
        //deviceId=test[i].IMEI;
        var RMCArray = test[i][19].split(',');//357520071754515,$GPRMC,023122.00,A,0118.33992,N,10346.37124,E,2.110,278.06,010817,,,A*61,AUTO,4089,98,21,12,0.99,C0,M1
        //357520071754515,$GPRMC,023112.00,A,0118.33989,N,10346.37526,E,2.227,287.03,010817,,,A*6C,AUTO,4089,98,21,12,0.77,C0,M1
        // break the rmc string with comma delineation to get the components
        deviceId = RMCArray[0];
        lat = RMCArray[4];
        latH = RMCArray[5];
        lon = RMCArray[6];
        lonH = RMCArray[7];
        time = RMCArray[2];
        if (lat.length > 1 && lon.length > 1) { //make sure there is lat/lon data
            // date=RMCArray[9];
            // status=RMCArray[12];
            // heading=RMCArray[8];
            // speed=RMCArray[7];
            // checkSum=RMCArray[11];
            var fix = RMCArray[3];
            var SOC = RMCArray[16];

            //check if 16 and 17 are greater than -100

            if (Number(RMCArray[15]) > -100 & Number(RMCArray[16]) > -100) {
                lastSOC[0] = Number(RMCArray[15]);
                lastSOC[1] = Number(RMCArray[16]);
            }


            //}
            var latD = lat.substring(0, 2);// "01"
            //console.log('latD:', latD);
            var latM = lat.substring(2);  // "18.4012"
            //console.log('latM:', latM);
            var latMM = parseFloat(latM / 60); //"0.306686666667"
            //console.log('latMM:', latMM);
            var latDDD = parseFloat(latD) + latMM;// 
            //console.log('latDDD:', latDDD);
            //longitude conversion
            var lonD = lon.substring(0, 3);
            var lonM = lon.substring(3);
            var lonMM = parseFloat(lonM / 60);
            var lonDDD = parseFloat(lonD) + lonMM;
            var lat = latDDD;
            var lng = lonDDD;
            var dmy = RMCArray[10];
            var ymd = '20' + dmy.substring(4) + '-' + dmy.substring(2, 4) + '-' + dmy.substring(0, 2);// convert ddmmyy to YYYY-MM-DD
            var time1 = time.substring(0, 2) + ':' + time.substring(2, 4) + ':' + time.substring(4, 6);
            var dateStamp = ymd + 'T' + time1 + 'Z';


            //Negation statements for Hemisphere correction
            if (latH == 'S' && latDDD > 0) {
                latDDD = -latDDD;
            }

            if (lonH == 'W' && lonDDD > 0) {
                lonDDD = -lonDDD;
            }
            // send info to inner array
            lat = latDDD;
            lng = lonDDD;
            innerArray.push(latDDD);
            innerArray.push(lonDDD);
            var partialPath = innerArray;// want to append this path to the current path of the same device
            //something.push(partialPath);3
            for (var j = 0; j < deviceArray.length; j++) {
                // add partial path to correct object
                //console.log(deviceId.substring(0,deviceId.length-1));
                if (deviceId == deviceArray[j].deviceId) {
                    deviceArray[j].path.push(partialPath);
                    deviceArray[j].polyPath.push({ lat, lng });// polyArray should be an element in the object array
                    counter2++;

                    innerArray.push(time);
                    innerArray.push(SOC);
                    innerArray.push(RMCArray[15]);
                    innerArray.push(dateStamp);
                    innerArray.push(deviceId);
                    innerArray.push(dmy);// push date from device
                    var latLngObj = { lat, lng };

                    //send all info to coordinates and start mapping
                    //coordinates.push(innerArray);
                    //console.log(innerArray);




                    createMarkers();
                    //console.log("true");

                }
            }
            //  innerArray.push(time);
            //  innerArray.push(SOC);
            //  var latLngObj={lat,lng};

            // //send all info to coordinates and start mapping
            // coordinates.push(innerArray);
            //  console.log(innerArray);


            ////////////////////////////////////////////////////////////////////
            // define postion for marker





            //make an array of the polylines


            //don't want markers to be created on load, want them to be created on change of select
            // also update bounds on chan
            //document.getElementById('container-number').innerHTML=container;
        } //end if lat/long check
    }// end for loop
    if (markers.length > 0) {
        map.fitBounds(bounds);
        //console.log("test");
        if (map.zoom > 11) {
            map.setZoom(11);
            //console.log("test2");
        }
        //markers[markers.length-1].setIcon(currentPositionIcon);
    }
    //markers[markers.length-1].setIcon(currentPositionIcon);
    document.getElementById('battVoltage').innerHTML = lastSOC[0];
    document.getElementById('percent').innerHTML = lastSOC[1];
    //set last marker to different color or image
    //also update endSlider to be length of #markers in path
    //volLength=deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path.length-1;
    endVal = volLength;

    // document.getElementById('startSlider').max=volLength;
    // //document.getElementById('startSlider').value=volLength;
    // //document.getElementById('startSlider').innerHTML=volLength;


    // document.getElementById('endSlider').max=volLength;
    // document.getElementById('endSlider').value=volLength;
    // document.getElementById('endSlider').innerHTML=volLength;
    // document.querySelector('#volume').value = volLength;

    function createMarkers() {
        if (selectedArray.includes(deviceId) || selectedArray.includes('All')) {
            coordinatesIndex++;
            coordinates.push(innerArray);
            var myLatLng = new google.maps.LatLng(latDDD, lonDDD);
            icon = {
                url: 'http://trackertesting.x10host.com/FormInput/FormInput/dot-red-icon.png', // url
                scaledSize: new google.maps.Size(8, 8), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(4, 4), // anchor
                zIndex: 5
            };
            currentPositionIcon = {
                url: 'http://trackertesting.x10host.com/FormInput/FormInput/dot-blue-icon.png', // url
                scaledSize: new google.maps.Size(16, 16), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(8, 8), // anchor
                zIndex: google.maps.Marker.MAX_ZINDEX + 1
                // url: "containerTruck.png", // url
                // scaledSize: new google.maps.Size(70, 50), // scaled size
                // origin: new google.maps.Point(0,0), // origin
                // anchor: new google.maps.Point(35, 25) // anchor
            };
            // create marker
            marker = new google.maps.Marker({

                position: myLatLng,
                map: map,
                icon: icon,
                //label:String(i)
                //image:image1
            });
            markers.push(marker);
            bounds.extend(marker.position);
            google.maps.event.addListener(marker, 'click', (function (marker, coordinatesIndex) {
                return function () {
                    infowindow.setContent('<div class="info-window"><p class="info-img"><img src="IMG_3110.JPG" ></p>' + '<div style="padding-top: 20px;"><div style="color: black;"> ID:' + String(coordinates[coordinatesIndex][6]) + '<br>' + 'Battery SOC: ' + String(coordinates[coordinatesIndex][3]) + '%' + '  ' + coordinates[coordinatesIndex][4] + 'mV' + '     ' + 'Time: ' + String(coordinates[coordinatesIndex][2].substring(0, 2)) + ':' + String(coordinates[coordinatesIndex][2].substring(4, 2)) + '</div><button type="button" class="map-button" onclick="viewMore()">View More</button></div></div>');
                    //infowindow.setOptions({ position: myLatLng });

                    infowindow.open(map, marker);
                };
            })(marker, coordinatesIndex));
        }
    }
    markers[markers.length - 1].setIcon(currentPositionIcon);
}
function startUpdate(startVal) {
    document.querySelector('#start').value = startVal;
    startValue = startVal;
    // need to use vol to show all markers with a previous index to show on map and hide all others
    // for(i=0;i<startValue;i++){
    //   //markers[i].setIcon(icon);
    //   markers[i].setMap(null);
    // }
    // for(j=endVal;j<volLength;j++){
    //   //markers[j].setIcon(icon);
    //   markers[j].setMap(null);

    // }
    // for(k=startValue;k<endVal;k++){
    //   markers[k].setIcon(icon);
    //   markers[k].setMap(map);
    //   // if(k=endVal){markers[k].setIcon(currentPositionIcon);
    //   //   console.log("test");}
    // }


    for (var i = 0; i < volLength + 1; i++) {
        markers[i].setIcon(icon);
        if (i < Number(startValue)) {

            markers[i].setMap(null);
        }
        else if (i < (Number(endVal) + 1)) {

            markers[i].setMap(map);
        }
        else {

            markers[i].setMap(null);
        }
    }
    if (Number(startValue) <= Number(endVal)) {
        markers[endVal].setIcon(currentPositionIcon);
    }
}

function arrayObjectIndexOf(myArray, searchTerm, property) {
    for (var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i][property] === searchTerm) return i;
    }
    return -1;
}

function createSingleMarker(latitude, longitude, coordinatesIndex) {
    icon = {
        url: 'http://trackertesting.x10host.com/FormInput/FormInput/dot-red-icon.png', // url
        scaledSize: new google.maps.Size(8, 8), // scaled size
        origin: new google.maps.Point(0, 0), // origin
        anchor: new google.maps.Point(4, 4), // anchor
        zIndex: 5
    };
    var myLatLng2 = new google.maps.LatLng(latitude, longitude);
    marker = new google.maps.Marker({

        position: myLatLng2,
        map: map,
        icon: icon,//'http://trackertesting.x10host.com/FormInput/FormInput/dot-red-icon.png'
        //label:String(i)
        //image:image1
    });
    currentMarkers.push(marker);
    google.maps.event.addListener(marker, 'click', (function (marker, coordinatesIndex) {
        return function () {
            infowindow.setContent('<div><p style="float: left;"><img src="IMG_3110.JPG" style="width:50px;height:60px;"></p></div>' + 'ID:' + String(coordinates[coordinatesIndex][6]) + 'Battery SOC: ' + String(coordinates[coordinatesIndex][3]) + '%' + '  ' + coordinates[coordinatesIndex][4] + 'mV' + '     ' + 'Time: ' + String(coordinates[coordinatesIndex][2].substring(0, 6)) + '<button type="button" onclick="viewMore()">View More</button>');
            //infowindow.setOptions({ position: myLatLng });

            infowindow.open(map, marker);
            //infowindow.open(map);
        };
    })(marker, coordinatesIndex));
}
function deviceCurrent() {
    console.log('current');
    if (selectedArray == 'All') {
        var coordinatesIndex = -1;
        //check how many points are in each member of deviceArray and only show the last one
        for (a = 0; a < markers.length; a++) { // clear all points
            markers[a].setMap(null);
        }
        for (var b = 0; b < deviceArray.length; b++) {
            // coordinatesIndex++;
            if (deviceArray[b].path.length > 0) {
                //console.log(deviceArray[b].path);
                coordinatesIndex += deviceArray[b].path.length;
                createSingleMarker(deviceArray[b].path[deviceArray[b].path.length - 1][0], deviceArray[b].path[deviceArray[b].path.length - 1][1], coordinatesIndex);
            }
        }
    }
}
$('#current').click(deviceCurrent);
function updateSOCAndLocation() {
    if (selectedArray != 'All') {
        a = deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path[deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path.length - 1];
        var soc = a[3];
        var battV = a[4];
        var lat = Number((a[0]).toFixed(8));
        var lon = Number((a[1]).toFixed(8));
        document.getElementById('battVoltage').innerText = battV;
        document.getElementById('percent').innerText = soc;
        document.getElementById('Latitude').innerText = lat;
        document.getElementById('Longitude').innerText = lon;
    }
}
function viewMore() {
    console.log('view More');
}
function utilization() {
    var utilizedTime = 0;
    var unUtilizedTime = 0;
    for (var n = 1; n < deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path.length; n++) {
        //if selected date doesn't match date of datapoint + offset hide marker else show marker
        // var oldDate = new Date(deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path[n][5]);// turn string into a date
        // var oldDateMilliseconds = oldDate.getTime();
        // var newDateMilliseconds = oldDateMilliseconds + (userOffset *60*1000) +(SGTOffset*60*1000);
        // var newDate = new Date(newDateMilliseconds);
        // var year = newDate.getFullYear();
        // var month = newDate.getMonth()+1;
        // var day = newDate.getDate();
        // var formattedDateString = String(year)+"-"+("0" + (newDate.getMonth() + 1)).slice(-2)+"-"+("0" + newDate.getDate()).slice(-2);

        var lastTimeStamp = new Date(deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path[n - 1][5]);
        var currentTimeStamp = new Date(deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path[n][5]);
        var difference = currentTimeStamp - lastTimeStamp;
        // console.log(lastTimeStamp);
        // console.log(currentTimeStamp);
        // console.log(difference);
        // console.log("-----");
        // if(currentTimeStamp>(lastTimeStamp+))
        // convert latitude and longitude to meters

        // var latitude=deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path[n][0];
        // var longitude=deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path[n][1];
        // var radians=latitude*Math.PI/180;
        // var latKilometers=110.567;
        // var lonKilometers=latKilometers*radians;
        // console.log(lonKilometers);

        //google.maps.geometry.spherical.computeDistanceBetween (latLngA, latLngB);
        var custLocation = new google.maps.LatLng(latRef, lonRef);
        var lastLocation = new google.maps.LatLng(deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path[n - 1][0], deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path[n - 1][1]);
        var currentLocation = new google.maps.LatLng(deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path[n][0], deviceArray[arrayObjectIndexOf(deviceArray, selectedArray[0], 'deviceId')].path[n][1]);
        //var distance=google.maps.geometry.spherical.computeDistanceBetween (lastLocation, currentLocation);// calculates dist between 2 points in meters
        var distance = google.maps.geometry.spherical.computeDistanceBetween(custLocation, currentLocation);// calculates current distance from cogent
        console.log('distance');
        console.log(distance);

        if (distance > 400) {
            utilizedTime += difference;
        }
        else {
            unUtilizedTime += difference;
        }
        //check distance between last and current

        //location greater than 0.4km from cogent



        //console.log("test");
        //console.log(formattedDateString);
        //console.log(document.getElementById('StartDate').test.value);
        // console.log("    ");
        // console.log(deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path[n][5]);
        // console.log(oldDate);
        // console.log(formattedDateString);
        // console.log(document.getElementById('StartDate').test.value);
        // if (formattedDateString==document.getElementById('StartDate').test.value){
        //   markers[n].setMap(map);
        //   //lastSoc=deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path[n][3];

        //   //console.log(firstLogged);

        //   //console.log(deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path[n][3]);
        //   lastSOC=deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path[n][3];
        //   //console.log(lastSOC);
        //     if(firstLogged===false){
        //       firstSOC=deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path[n][3];
        //       firstLogged=true;
        //       //console.log("test");
        //     }
        //      inDay++;

        // }
        // else{
        //   markers[n].setMap(null);
        //   outDay++;
        // }
        // if(n==deviceArray[arrayObjectIndexOf(deviceArray,selectedArray[0],"deviceId")].path.length-1){
        //   console.log(firstSOC);
        //   console.log(lastSOC);
        //   //document.getElementById("startSOC").innerHTML=firstSOC;
        //   document.getElementById("percent").innerHTML=lastSOC;
        // }
        // input format "2017-09-19"
    }
    drawChart(utilizedTime, unUtilizedTime);
}
$('#viewMore').click(viewMore);
