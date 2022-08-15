import { useEffect, useState } from "react";
import { WiCelsius, WiFahrenheit } from "react-icons/wi";
import { getPopularCities, iconUrlFromCode } from "../../Services/FetchWeather";


function Cities({setUnits}) {

const [metric, setMetric] = useState(true)
const [citiesWeather,setCitiesWeather] = useState(null)

const switchHandler = ()=>{
  setMetric(previous => !previous)
}

useEffect(()=>{
  const getCities = async ()=>{
     await getPopularCities(metric? 'metric' : 'imperial').then(data => setCitiesWeather(data))
  }
  getCities()
    if(metric){
      setUnits('metric')
    }else setUnits('imperial')
},[metric])


  return (
    <div className=" grid grid-rows-new5  grid-flow-row gap-4 p-2 text-theme-color border-border-color md:row-start-1 md:col-start-2 lg:col-start-4">
        <div className="flex items-center justify-around bg-hover-menu-bg border-2 p-2  border-border-color rounded-xl">
           {/* switch -------- */}
           <WiFahrenheit size="40"/>

            <label className="switch">
                <input id="input" type="checkbox" checked={metric} onChange={()=> switchHandler()}/>
                <span className="slider round"></span>
            </label>
           <WiCelsius size="40"/>

        </div>
        {citiesWeather && citiesWeather.map((city,index) => (
          <div key={index} className="flex items-center justify-end border-2 p-2 bg-theme-bg-color border-border-color rounded-xl">
              <div className="flex-grow flex flex-col" >
                <span className="text-2xl">{city.name}</span>
                <span className="text-md font-thin">{city.time}</span>
              </div> 
              <img src={iconUrlFromCode(city.icon)} alt="" width={'50px'} height={'50px'} />
              <span className="text-2xl">{Math.floor(city.temp)}°</span>
          </div>
          )
        )}
        
        
        

    </div>
  )
}

export default Cities