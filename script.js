getWeather();
getWeatherWarnings();

function switchMeasurements() {
	let div_measurements = document.querySelector('#current [name=measurement]');
	let button_measurements = document.querySelector('#current [name=measurementButton]');

	if (div_measurements.style.maxHeight == "0px") {
		div_measurements.style.maxHeight = "2000px";
		div_measurements.style.overflow = "auto";
		button_measurements.innerHTML = "<span class='icon_s'>&#xf106</span> Messwerte ausblenden";
	} else {
		div_measurements.style.maxHeight = "0px";
		div_measurements.style.overflow = "hidden";
		button_measurements.innerHTML = "<span class='icon_s'>&#xf107</span> Messwerte anzeigen";
	}
}

async function getWeather() {
	document.getElementById("load_current").style.display = "";
	document.getElementById("warnings_current").innerHTML = "";

	let data = await getDataText("https://rammer.org/api/weather/weatherdata.json");

	try {
		data = JSON.parse(data);
	} catch {
		document.getElementById("load_current").style.display = "none";
		return;
	}
   
	if (parseFloat(data['data']['wind_gust']) >= 60) {
		document.querySelector("#current .content_container.bg_image").style.background = "url(https://rammer.org/cdn/images/weather/backgrounds/weather/-overlay-wind.png), url(https://rammer.org/cdn/images/weather/backgrounds/weather/" + data['data']['weather_icon'] + ".jpg)";
	} else {
		document.querySelector("#current .content_container.bg_image").style.background = "url(https://rammer.org/cdn/images/weather/backgrounds/weather/" + data['data']['weather_icon'] + ".jpg)";
	}

	Array.from(document.querySelectorAll("#current .content_container.bg_image .container, .content_container.bg_image a.button, .content_container.bg_image button")).forEach(e => {
		e.style.background = "var(--" + data['data']['weather_icon'] + ")";
	});

	document.getElementById("current_temp").innerHTML = parseFloat(data['data']['temp']).toFixed(0) + " °C";
	document.getElementById("current_felt_temp").innerHTML = parseFloat(data['data']['felt_temp']).toFixed(0) + " °C";
	document.getElementById("current_description").innerHTML = data['data']['weather_description'];
	document.getElementById("current_wind_dir_icon").style.transform = "rotate(" + (135 + data['data']['wind_dir']) + "deg)";
	document.getElementById("current_wind_description").innerHTML = data['data']['wind_description'];
	document.getElementById("current_measurements_temp").innerHTML = parseFloat(data['data']['temp']).toFixed(1) + " °C";
	document.getElementById("current_measurements_temp_min_max").innerHTML = parseFloat(data['data']['temp_min']).toFixed(1) + " °C / " + parseFloat(data['data']['temp_max']).toFixed(1) + " °C";
	document.getElementById("current_measurements_humidity").innerHTML = parseFloat(data['data']['humidity']).toFixed(0) + " %";
	document.getElementById("current_measurements_absolute_humidity").innerHTML = parseFloat(data['data']['absolute_humidity']).toFixed(1) + " g/m³";
	document.getElementById("current_measurements_dew_point").innerHTML = parseFloat(data['data']['dew_point']).toFixed(1) + " °C";
	document.getElementById("current_measurements_pressure").innerHTML = parseFloat(data['data']['pressure']).toFixed(0) + " hPa";
	document.getElementById("current_measurements_sealevel_pressure").innerHTML = parseFloat(data['data']['sealevel_pressure']).toFixed(0) + " hPa";
	document.getElementById("current_measurements_wind_speed").innerHTML = parseFloat(data['data']['wind_speed']).toFixed(1) + " km/h";
	document.getElementById("current_measurements_wind_gust").innerHTML = parseFloat(data['data']['wind_gust']).toFixed(1) + " km/h";
	document.getElementById("current_measurements_wind_dir").innerHTML = parseFloat(data['data']['wind_dir']).toFixed(0) + "°";
	document.getElementById("current_measurements_wind_dir_str").innerHTML = String(data['data']['wind_dir_str']);
	document.getElementById("current_measurements_rain").innerHTML = parseFloat(data['data']['rain_total']).toFixed(1) + " mm";
	document.getElementById("current_measurements_rain_1h").innerHTML = parseFloat(data['data']['rain_total_1h']).toFixed(1) + " mm";
	document.getElementById("current_measurements_rain_intensity").innerHTML = parseFloat(data['data']['rain_intensity']).toFixed(2) + " mm/h";
	document.getElementById("current_measurements_rain_intensity_max_1h").innerHTML = parseFloat(data['data']['rain_intensity_max_1h']).toFixed(2) + " mm/h";
	document.getElementById("current_measurements_cloud").innerHTML = parseFloat(data['data']['cloud']).toFixed(0) + " %";
	document.getElementById("current_measurements_brightness").innerHTML = parseFloat(data['data']['brightness']).toFixed(0) + " lux";

	document.getElementById("load_current").style.display = "none";
}

async function getWeatherWarnings() {
	document.getElementById("weather_warnings_load").style.display = "";

	document.getElementById("weather_warnings_load").style.display = "none";
}
