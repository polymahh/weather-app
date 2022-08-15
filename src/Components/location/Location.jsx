import { useEffect,useState } from "react";
import { IoSearch } from "react-icons/io5";
import { WiDayWindy, WiThermometer, WiUmbrella, WiHumidity ,WiSunrise, WiSunset } from "react-icons/wi";

import { formatToLocalTime, iconUrlFromCode } from "../../Services/FetchWeather";

export const Location =({setQuery , weather})=> {

    const [city,setCity] = useState('')

    const searchHandler = ()=>{
        if(city !== ''){
            setQuery({q:city})
            setCity('')
        }
    }
     
    let [time,setTime] = useState(formatToLocalTime(weather.dt, weather.timezone));
    let secs = weather.dt
    const am = formatToLocalTime(secs, weather.timezone, 'a')
    const date = formatToLocalTime(secs, weather.timezone, 'cccc, dd LLL')
    
    useEffect(()=>{
            var timer = setInterval(()=>{
                    setTime(formatToLocalTime(secs,weather.timezone))
                    secs++
                    
                },1000)            
                return function cleanup(){
            clearInterval(timer)
        }
    },[])

    return(
        <>
            <div className=" grid grid-rows-[50px] grid-flow-row gap-4 p-2 text-theme-color border-border-color">
                {/* search --------- */}
                <div className="flex justify-around items-center bg-search-bg p-1 rounded-md ">
                    <IoSearch className="text-2xl" onClick={()=> searchHandler()}/>
                    <input type="text" placeholder="Search" onChange={(e)=> setCity(e.currentTarget.value)} value={city}
                    className="w-full bg-search-bg p-2 text-lg focus:outline-none" />
                </div>
                {/* date ------------- */}
                <div className="flex flex-col items-center justify-center gap-3 bg-hover-menu-bg border-2 p-4  border-border-color rounded-xl">
                    <div>
                        <h1 className="text-4xl font-thin" >
                            {time} <small className=" text-sm">{am}</small>
                        </h1> 
                    </div>
                    <h1 className="text-4xl font-bold " >
                        {weather.name}
                        <span className="text-xl ml-4" >{weather.country}</span> 
                    </h1> 
                    <span className="text-2xl">{date}</span>

                </div>
                {/* tempeture and description */}
                <div className="flex flex-col items-center justify-center gap-4 bg-hover-menu-bg border-2 p-4  border-border-color rounded-xl">
                    <div>
                        <span>{weather.description.toUpperCase()}</span>
                    </div>
                    <div className="flex items-end flex-wrap">
                        <h1 className="text-6xl font-bold " >
                            {Math.floor(weather.temp)}°
                        </h1> 
                        <img src={iconUrlFromCode(weather.icon)} alt="" width={'50px'} height={'50px'} />
                    </div>
                    <div className="flex flex-col items-end">
                        <div className='flex gap-2 '>Rise<WiSunrise size={30}/>{weather.sunrise}</div> 
                        <div className='flex gap-2  '> Set<WiSunset size={30}/>{weather.sunset}</div> 
                    </div>

                </div>
                {/* more details */}
                <div className="flex justify-center  flex-wrap bg-hover-menu-bg border-2 p-4  border-border-color rounded-xl">
                    <div className="grid grid-cols-2 mx-auto">
                        <div className="flex items-center text-sm "><WiThermometer size={40}/> <div><p>temp</p><p>{weather.temp}</p></div></div>
                        <div className="flex items-center text-sm"><WiDayWindy size={40}/> <div><p>wind</p><p>{weather.speed}k/h</p></div></div>
                        <div className="flex items-center text-sm"><WiUmbrella size={40}/> <div><p>rain?</p><p>{weather.all}%</p></div></div>
                        <div className="flex items-center text-sm"><WiHumidity size={40}/> <div><p>humidity</p><p>{weather.humidity}%</p></div></div>
                    
                    </div>
                </div>
                
            </div>
            
        </>
    )
}