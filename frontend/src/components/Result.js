import React, { useState } from 'react'

const Result = ({result, isLoading, showModal,toggleModal, activeButton, setActiveButton, setFormData}) => {
    
    const clickButton = (buttonId) => {
        setActiveButton(buttonId)
        setFormData(prevFormData => ({...prevFormData, model: buttonId}));
    }
  return (
    <div className='bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 text-center max-h-screen overflow-auto'>
        <div className='flex justify-start'>
            <button className={`font-bold py-2 px-4 mr-4 rounded-full ease-in-out ${activeButton !== 'biLSTM' ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'text-blue-500 bg-white border-blue-500 font-semibold border-solid border-2'}`} onClick={() => clickButton('biLSTM')}>biLSTM</button>

            <button className={`font-bold py-2 px-4 mr-4 rounded-full ease-in-out ${activeButton !== 'phoBERT' ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'text-blue-500 bg-white border-blue-500 font-semibold border-solid border-2'}`} onClick={() => clickButton('phoBERT')}>phoBERT</button>

        </div>
        
        <p className='block text-blue-300 py-2 font-bold mb-2'>Kết quả</p>

        {isLoading ? (
            <div role="status" className='mt-10'>
                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="block text-white py-2 font-bold mb-2">Đang xử lý...</span>
            </div>
        ):result==0? (
            <div>
                <div className='flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-red-600"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>


                </div>
                <p className='block text-red-300 py-2 font-bold mb-2'>
                    Đây là tin không tin cậy
                </p>
                <div>
                    <div className='flex justify-start items-start overflow-auto' onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        <p className='text-blue-300 pl-2 font-semibold mb-2 cursor-pointer'>Chi tiết</p>

                    </div>

                </div>
                
            </div>
        ) :(result==1 || result==3) ?(

            <div>
                <div className='flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>



                </div>
                <p className='block text-gray-300 py-2 font-bold mb-2'>
                    Đây là tin thật giả lẫn nhau
                </p>
                <div>
                    <div className='flex justify-start items-start overflow-auto' onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        <p className='text-blue-300 pl-2 font-semibold mb-2 cursor-pointer'>Chi tiết</p>

                    </div>

                </div>
                
            </div>
        ) 
        :result==2 ?(
            <div>
                <div className='flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-green-600"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

                </div>
                <p className='block text-green-300 py-2 font-bold mb-2'>
                    Đây là tin thật
                </p> 

                <div>
                    <div className='flex justify-start items-start overflow-auto' onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        <p className='text-blue-300 pl-2 font-semibold mb-2 cursor-pointer'>Chi tiết</p>

                    </div>

                </div>
            </div>
            
        ):(
            <p className='block text-white py-2 font-bold mb-2'>
                No Result
            </p>
        )}


    </div>
  )
}

export default Result