import React from 'react'
import HomeHero from '../components/homepage/hero'
import CountDownTrust from '../components/homepage/countdown'
import PrecisionWorkflow from '../components/homepage/workFlow'
import CourseSection from '../components/homepage/coursSection'
import ArchitectureProgress from '../components/homepage/ArchitectureProgress'
import LiveInsight from '../components/homepage/liveInsight'

function Main_Index_For_Call_Files() {
  return (
    <div> 
      {/*start  homepage here */}
      {/* ================================= */}
        <HomeHero />
        <CountDownTrust />
        <PrecisionWorkflow />
        <CourseSection />
        <ArchitectureProgress />
        <LiveInsight />
      {/* =================================  homepage end*/}
      

    </div>
  )
}

export default Main_Index_For_Call_Files