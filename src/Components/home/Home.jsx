import { useEffect, useState } from "react"
import getWeatherData from "../../Services/FetchWeather"
import Cities from "../cities/Cities"
import { Location } from "../location/Location"
import Weekly from "../weekly/Weekly"

export const Home =()=>{
    const [query,setQuery] = useState({q:"london"})
    const [units, setUnits] = useState("metric");
    const [weather, setweather] = useState(null)

    useEffect(()=>{
        const getData = async () => {
         await getWeatherData({ ...query, units }).then((data)=> setweather(data) )
        }
        getData()

    },[query,units])

    


    return(
        <div className="max-w-1250px max-h-860px w-[90%] max-h-[90%]  overflow-auto border-2 border-border-color  bg-theme-bg-color backdrop-blur-lg rounded-xl">
                {weather && (

                        <div className=" w-full h-full  grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 ">
                        <Location setQuery={setQuery} weather={weather}/> 
                        <Weekly weather={weather}/> 
                        <Cities setUnits={setUnits}/>
                        </div>
                        
                )}
              
        </div>
    )
    
}