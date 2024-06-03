import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
        <p>For Better Experiece Download <br/> Tomato app</p>
        <div className='app-download-platforms'>
            <img src={assets.play_store}></img>
            <img src={assets.app_store} ></img>
        </div>
    </div>
  )
}

export default AppDownload