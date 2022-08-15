import { DateTime } from "luxon";

const APi_key = '6fd9327e12a11d54d3000a84df38e039'
const Base_Url = 'https://api.openweathermap.org/data/2.5/'
const popularCities = ["New York", "istanbul", "London", "Tokyo", 'Paris']

const getWeather = (infoType, params)=> {
    const url = new URL(Base_Url + infoType)
    url.search = new URLSearchParams({ ...params, appid: APi_key})

    return fetch(url).then(res => res.json());
};

const getPopularCities = async (unit)=>{
    let allCities = []
    for(const city of popularCities) {
        let data = await getWeather('weather', {q:city, units:unit})
        const {name,dt,timezone,weather : [{icon,main}],main : {temp}} = data
        allCities.push({name, time:formatToLocalTime(dt, timezone, "hh:mm a"), icon, main, temp })
    }

     return allCities
}

const formatcurrent = (data)=>{

    const {
        coord:{lat,lon},
        weather:[{main,description,icon}],
        main:{temp,feels_like,pressure,humidity},
        wind:{speed},
        clouds:{all},
        dt,
        sys:{country,sunrise,sunset},
        id,
        timezone,
        name
    }=data

    return {
        lat,
        lon,
        main,
        description,
        icon,
        temp,
        feels_like,
        pressure,
        humidity,
        speed,
        all,
        dt,
        country,
        sunrise:formatToLocalTime(sunrise, timezone, "hh:mm a"),
        sunset:formatToLocalTime(sunset, timezone, "hh:mm a"),
        id,
        name
    }
}

const formatForcast = (data)=>{

    let {timezone,daily,hourly} = data
    daily = daily.slice(1-6).map(d =>{
        return {
            title: formatToLocalTime(d.dt, timezone, "cccc"),
            temp: d.temp.day,
            icon: d.weather[0].icon,
            sunrise:formatToLocalTime(d.sunrise, timezone, "hh:mm a"),
            sunset:formatToLocalTime(d.sunset, timezone, "hh:mm a")
        }
    })
    hourly = hourly.slice(0-5).map(d =>{
        return {
            title: formatToLocalTime(d.dt, timezone, 'hh:mm'),
            temp: d.temp,
            icon: d.weather[0].icon,
        }
    })

    return {timezone, daily, hourly}

}

const getWeatherData = async (params)=>{
    const formattedData = await getWeather(
        'weather',
        {...params}
    ).then(formatcurrent)

    const {lat,lon} = formattedData;

    const formattedForcastData = await getWeather('onecall',{lat, lon, exclude:"current,minutely,alerts", units: params.units}
    ).then(formatForcast)
    return {...formattedData, ...formattedForcastData};
}

const formatToLocalTime = (secs,zone,format = 'hh:mm:ss') => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
const iconUrlFromCode = (code) =>`http://openweathermap.org/img/wn/${code}@2x.png`;

export default getWeatherData;

export { formatToLocalTime, iconUrlFromCode, getPopularCities };