import React, {useState} from 'react'
import axios from 'axios'

const Form = ({result, updateResult, isLoading, setIsLoading, setWeights, activeButton, formData, setFormData}) => {
    
    
    const handleSubmit = async (e) => {
        e.preventDefault() 
        setIsLoading(true)
        setWeights([])
        console.log(activeButton);
        // setFormData(prevFormData => ({...prevFormData, model: activeButton}));
        console.log(formData);
        try {
            const response = await axios.post('/api/article/predict', formData);
            // console.log('Data sent to Django:', response.data);
            // console.log(response.data.prediction[0]);
            result = response.data.prediction[0]
            updateResult(result)

        
        } catch (error) {
            console.error('Error sending data to Django:', error);
        } finally {
            setIsLoading(false)
        }
    }

    const handleReset = () => {
        setFormData({ ...formData, content: '' });
        updateResult(2)
    }
    return (
        <form class="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            {/* title */}
            {/* <div class="mb-4">
                <label class="block text-blue-300 py-2 font-bold mb-2" for="title">
                Nhập vào tiêu đề bài báo
                </label>
                <input
                class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="title"
                type="text"
                placeholder="Tiêu đề"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
            </div> */}

            {/* content */}
            <div class="mb-4">
                <label class="block text-blue-300 py-2 font-bold mb-2" for="content">
                Nhập vào nội dung bài báo
                </label>
                <textarea
                spellCheck="false"
                class="shadow appearance-none border rounded w-full p-3 h-60 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                id="content"
                type="text"
                placeholder="Nội dung"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
            </div>

            <div class="flex items-center justify-start pt-4">
                <button
                class="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="submit"
                >
                Submit
                </button>
                <button
                class="bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 hover:from-pink-500 hover:to-green-500 text-blue-700 font-bold py-2 px-4 ml-10 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="button"
                onClick={handleReset}
                >
                Reset
                </button>
            </div>
            
        </form>
    )
}

export default Form