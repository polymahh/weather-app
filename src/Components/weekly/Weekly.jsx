import React from 'react'
import { iconUrlFromCode } from '../../Services/FetchWeather'
import { WiSunrise,WiSunset } from "react-icons/wi";

function Weekly({weather:{daily,hourly}}) {

  return (
    <div className='flex flex-col justify-start gap-4 col-span-2 text-theme-color p-2'>
        <p className='mx-auto text-2xl'>Weekly Forcast</p>
      <div className=' space-y-4'>
        {daily && daily.map((day,index)=> {
              return(
            <div key={index} className="flex items-center justify-center flex-wrap bg-hover-menu-bg border-2 p-2  border-border-color rounded-xl">
              <h1 className="text-2xl font-thin flex-grow" >{day.title}</h1>
              <div className='flex flex-grow gap-2 '>{day.sunrise}<WiSunrise size={30}/> | <WiSunset size={30}/>{day.sunset}</div> 
              <img src={iconUrlFromCode(day.icon)} alt="" width={'50px'} height={'50px'} />
              <span className="text-2xl">{Math.floor(day.temp)}°</span>
            </div>

          )
        })}
              
             
      </div>
      <p className='mx-auto text-2xl'>Hourly Forcast</p>

      <div className="flex items-center justify-around bg-hover-menu-bg border-2 p-2  border-border-color rounded-xl">
                    
        {hourly && hourly.map((hour,index)=> {
              return(
                <div key={index} className='flex flex-col items-center'>
                <p>{hour.title}</p>
                <img src={iconUrlFromCode(hour.icon)} alt="" width={'40px'} height={'40px'} />
                <span className="text-2xl">{Math.floor(hour.temp)}°</span>
              </div>

          )
        })}
                    
              </div>
    </div>
  )
} 

export default Weekly