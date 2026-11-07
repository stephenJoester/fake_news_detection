import React from 'react'
import {render} from "react-dom"
import Nav from './Nav'
import HomePage from './HomePage'

const App = (props) => {
  return (
    <div>
      {/* <div className='main'>
        <div className='gradient'></div>
      </div> */}

      <main>
        <Nav/>
        <HomePage/>
      </main>
     
    </div>
  )
}

export default App

const appDiv = document.getElementById('app') 
render(<App name="quan"/>, appDiv)