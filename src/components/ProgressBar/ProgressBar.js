import React, { useEffect, useState } from 'react'
import './ProgressBar.css'

import { getCurrentTime } from 'utils'

const ProgressBar = ({ totalMovieSeconds }) => {
  const [progressPercentage, setProgressPercentage] = useState(0)


  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = getCurrentTime();
      const currentTimeInSeconds = currentTime / 1000.0;

      const progress = currentTimeInSeconds / totalMovieSeconds * 100;

      if (currentTimeInSeconds < totalMovieSeconds) {
        setProgressPercentage(progress)
      } else {
        setProgressPercentage(100);
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval)
    }

  }, [totalMovieSeconds])


  return (
    <div className='progress-bar-wrapper'>
      <div className='progress-bar-progress' style={{ height: `${progressPercentage}%` }}></div>
    </div>
  )
}

export default ProgressBar