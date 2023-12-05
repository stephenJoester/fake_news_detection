import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Result = ({result, isLoading, showModal,toggleModal, activeButton, setActiveButton, formData, setFormData}) => {

    const [like, setLike] = useState("")
    const [feedback, setFeedback] = useState({article: {title: 'title', content: ''}, label:''})
    
    const clickButton = (buttonId) => {
        setActiveButton(buttonId)
        setFormData(prevFormData => ({...prevFormData, model: buttonId}));
    }
    
    const sendFeedback = async (newFeedback) => {
        
        try {
            console.log(newFeedback);
            const response = await axios.post('/api/article/feedback', newFeedback)
            console.log("Data sent to server: ", response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (like !== '') {
            setFeedback((prevFeedback) => {
                let newFeedback = { ...prevFeedback };
                if (like === 'Like') {
                    newFeedback = {
                        ...newFeedback,
                        article: {
                            ...newFeedback.article,
                            content: formData.content,
                        },
                        label: result,
                    };
                } else if (like === 'Dislike') {
                    newFeedback = {
                        ...newFeedback,
                        article: {
                            ...newFeedback.article,
                            content: formData.content,
                        },
                        label: 0,
                    };
                }
                sendFeedback(newFeedback); // Gọi sendFeedback từ đây để đảm bảo feedback đã được cập nhật
                return newFeedback;
            });
        }
    }, [like])

    const clickLikeButton = (button) => {
        if (like == "") {
            setLike(button)
            return
        }
        else if (like != button) {
            setLike(button)
        }
        else if (like == button) {
            setLike("")
        }

    }
    
  return (
    <div className='bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 text-center max-h-screen overflow-auto'>
        <div className='flex justify-start'>
            <button className={`font-bold py-2 px-4 mr-4 rounded-full ease-in-out ${activeButton !== 'biLSTM' ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'text-blue-500 bg-white border-blue-500 font-semibold border-solid border-2'}`} onClick={() => clickButton('biLSTM')}>biLSTM</button>

            <button className={`font-bold py-2 px-4 mr-4 rounded-full ease-in-out ${activeButton !== 'LSTM' ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'text-blue-500 bg-white border-blue-500 font-semibold border-solid border-2'}`} onClick={() => clickButton('LSTM')}>LSTM</button>

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
        ):result==1? (
            <div>
                <div className='flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-red-600"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>


                </div>
                <p className='block text-red-300 py-2 font-bold mb-2'>
                    Đây là tin giả
                </p>
                {/* Thumb button */}
                <div className='mt-4 ml-1 mb-5'>
                    <div className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer ${like != 'Like' ? 'fill-pink-100' : 'fill-blue-400'} hover:fill-blue-400 hover:transition-all hover:ease-in-out hover:transform hover:scale-125 mr-5`} onClick={() => clickLikeButton('Like')} viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer ${like != 'Dislike' ? 'fill-pink-100' : 'fill-blue-400'} hover:fill-blue-400 hover:transition-all hover:ease-in-out hover:transform hover:-scale-x-125 hover:scale-y-125 -scale-x-100 mr-5 mt-1`}onClick={() => clickLikeButton('Dislike')} viewBox="0 0 512 512"><path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"/></svg>
                    </div>
                </div>
                <div>
                    <div className='flex justify-start items-start overflow-auto' onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        <p className='text-blue-300 pl-2 font-semibold mb-2 cursor-pointer'>Chi tiết</p>

                    </div>

                    
                    


                </div>
                
            </div>
        ) :(result==2) ?(

            <div>
                <div className='flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className='block text-gray-300 py-2 font-bold mb-2'>
                    Đây là tin thật có xen lẫn giả
                </p>

                {/* Thumb button */}
                <div className='mt-4 ml-1 mb-5'>
                    <div className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer ${like != 'Like' ? 'fill-pink-100' : 'fill-blue-400'} hover:fill-blue-400 hover:transition-all hover:ease-in-out hover:transform hover:scale-125 mr-5`} onClick={() => clickLikeButton('Like')} viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer ${like != 'Dislike' ? 'fill-pink-100' : 'fill-blue-400'} hover:fill-blue-400 hover:transition-all hover:ease-in-out hover:transform hover:-scale-x-125 hover:scale-y-125 -scale-x-100 mr-5 mt-1`}onClick={() => clickLikeButton('Dislike')} viewBox="0 0 512 512"><path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"/></svg>
                    </div>
                </div>

                <div>
                    <div className='flex justify-start items-start overflow-auto' onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        <p className='text-blue-300 pl-2 font-semibold mb-2 cursor-pointer'>Chi tiết</p>

                    </div>

                </div>
                
            </div>
        ) : (result==3) ? (

            <div>
                <div className='flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-gray-500"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className='block text-gray-300 py-2 font-bold mb-2'>
                    Đây là tin giả có xen lẫn thật
                </p>

                {/* Thumb button */}
                <div className='mt-4 ml-1 mb-5'>
                    <div className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer ${like != 'Like' ? 'fill-pink-100' : 'fill-blue-400'} hover:fill-blue-400 hover:transition-all hover:ease-in-out hover:transform hover:scale-125 mr-5`} onClick={() => clickLikeButton('Like')} viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer ${like != 'Dislike' ? 'fill-pink-100' : 'fill-blue-400'} hover:fill-blue-400 hover:transition-all hover:ease-in-out hover:transform hover:-scale-x-125 hover:scale-y-125 -scale-x-100 mr-5 mt-1`}onClick={() => clickLikeButton('Dislike')} viewBox="0 0 512 512"><path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"/></svg>
                    </div>
                </div>

                <div>
                    <div className='flex justify-start items-start overflow-auto' onClick={toggleModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
                        <p className='text-blue-300 pl-2 font-semibold mb-2 cursor-pointer'>Chi tiết</p>

                    </div>

                </div>
                
            </div>
        )
        :result==0 ?(
            <div>
                <div className='flex items-center justify-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-green-600"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>

                </div>
                <p className='block text-green-300 py-2 font-bold mb-2'>
                    Đây là tin thật
                </p> 

                {/* Thumb button */}
                <div className='mt-4 ml-1 mb-5'>
                    <div className='flex justify-center items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer ${like != 'Like' ? 'fill-pink-100' : 'fill-blue-400'} hover:fill-blue-400 hover:transition-all hover:ease-in-out hover:transform hover:scale-125 mr-5`} onClick={() => clickLikeButton('Like')} viewBox="0 0 512 512"><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"/></svg>

                        <svg xmlns="http://www.w3.org/2000/svg" className={`w-6 h-6 cursor-pointer ${like != 'Dislike' ? 'fill-pink-100' : 'fill-blue-400'} hover:fill-blue-400 hover:transition-all hover:ease-in-out hover:transform hover:-scale-x-125 hover:scale-y-125 -scale-x-100 mr-5 mt-1`}onClick={() => clickLikeButton('Dislike')} viewBox="0 0 512 512"><path d="M313.4 479.1c26-5.2 42.9-30.5 37.7-56.5l-2.3-11.4c-5.3-26.7-15.1-52.1-28.8-75.2H464c26.5 0 48-21.5 48-48c0-18.5-10.5-34.6-25.9-42.6C497 236.6 504 223.1 504 208c0-23.4-16.8-42.9-38.9-47.1c4.4-7.3 6.9-15.8 6.9-24.9c0-21.3-13.9-39.4-33.1-45.6c.7-3.3 1.1-6.8 1.1-10.4c0-26.5-21.5-48-48-48H294.5c-19 0-37.5 5.6-53.3 16.1L202.7 73.8C176 91.6 160 121.6 160 153.7V192v48 24.9c0 29.2 13.3 56.7 36 75l7.4 5.9c26.5 21.2 44.6 51 51.2 84.2l2.3 11.4c5.2 26 30.5 42.9 56.5 37.7zM32 384H96c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H32C14.3 96 0 110.3 0 128V352c0 17.7 14.3 32 32 32z"/></svg>
                    </div>
                </div>

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