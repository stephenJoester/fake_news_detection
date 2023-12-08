import React, {useEffect, useState} from 'react'
import Form from './Form'
import Result from './Result'
import Modal from './Modal'

const HomePage = () => {
  const [result, setResult] = useState(null) 
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [content, setContent] = useState([]) 
  const [weights, setWeights] = useState([])
  const [activeButton, setActiveButton] = useState('biLSTM')
  const [formData, setFormData] = useState({title:'title',content:'',model:activeButton})

  const toggleModal = () => {
    setShowModal(!showModal)
  }
  
  const updateResult = (newResult) => {
    setResult(newResult)
  }
  return (
    <div class="container pt-12 md:pt-20 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <Modal showModal={showModal} toggleModal={toggleModal} content={content} weights={weights} result={result} formData={formData} setWeights={setWeights}/>
        {/* left column */}
        <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 class="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
         
            <span class="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              Fake News Detection tool
            </span>
        
          </h1>
          <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
            Công cụ phát hiện tin giả hoặc thật dựa trên nội dung bài báo
          </p>

          <Form result={result} updateResult={updateResult} isLoading={isLoading} setIsLoading={setIsLoading} setContent={setContent} setWeights={setWeights} activeButton={activeButton} formData={formData} setFormData={setFormData}/>
        </div>

        {/* right column */}
        <div class="w-full xl:w-3/5 p-12 pt-0 overflow-hidden">
          {/* <img class="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src='.../static/images/macbook.svg' /> */}
          <Result result={result} isLoading={isLoading} showModal={showModal} toggleModal={toggleModal} activeButton={activeButton} setActiveButton={setActiveButton} formData={formData} setFormData={setFormData}/>
        </div>

        {/* <div class="mx-auto md:pt-16">
          <p class="text-blue-400 font-bold pb-8 lg:pb-6 text-center">
            Download our app:
          </p>
          <div class="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
            <img src="App Store.svg" class="h-12 pr-12 transform hover:scale-125 duration-300 ease-in-out" />
            <img src="Play Store.svg" class="h-12 transform hover:scale-125 duration-300 ease-in-out" />
          </div>
        </div> */}

        {/* footer */}
        <div class="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <a class="text-gray-500 no-underline hover:no-underline" href="#">&copy; App 2023</a>
          - by
          <a class="text-gray-500 no-underline hover:no-underline" href="https://www.tailwindtoolbox.com"> Quan</a>
        </div>
      </div>
    
  )
}

export default HomePage