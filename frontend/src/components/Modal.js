import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function Modal({showModal, toggleModal, formData, weights, setWeights,result}) {

  const [isLoading, setIsLoading] = useState(false)
  const [maxWeight, setMaxWeight] = useState(0)

  const sendRequest = async () => {
    setIsLoading(true)
    try {
      // console.log('Sending to server');
      const response = await axios.post('/api/article/explain', formData);
      const updatedWeights = response.data.weights
      // console.log(updatedWeights);
      setWeights(updatedWeights)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (showModal && weights.length === 0) {
      sendRequest()
      setMaxWeight(Math.max(...weights.map(weight => Math.abs(weight[1]))))
    }
  }, [showModal, weights])

  // console.log(weights);
  const colorMatchingReal = (weight) => {
    const ratio = weight/maxWeight
    if (ratio >= 0.6) {
      return "bg-orange-500"
    }
    else if (ratio >= 0.4) {
      return "bg-orange-400"
    }
    else if (ratio >= 0.2) {
      return "bg-orange-300"
    }
    else return "bg-orange-200"
  }
  const colorMatchingFake = (weight) => {
    const ratio = weight/maxWeight
    if (ratio >= 0.6) {
      return "bg-blue-500"
    }
    else if (ratio >= 0.4) {
      return "bg-blue-400"
    }
    else if (ratio >= 0.2) {
      return "bg-blue-300"
    }
    else return "bg-blue-200"
  }
  const colorMatchingTruewFalse = (weight) => {
    const ratio = weight/maxWeight
    if (ratio >= 0.6) {
      return "bg-indigo-500"
    }
    else if (ratio >= 0.4) {
      return "bg-indigo-400"
    }
    else if (ratio >= 0.2) {
      return "bg-indigo-300"
    }
    else return "bg-indigo-200"
  }
  const colorMatchingFalsewTrue = (weight) => {
    const ratio = weight/maxWeight
    if (ratio >= 0.6) {
      return "bg-lime-500"
    }
    else if (ratio >= 0.4) {
      return "bg-lime-400"
    }
    else if (ratio >= 0.2) {
      return "bg-lime-300"
    }
    else return "bg-lime-200"
  }
  return (
    <>
      {showModal ? (
        <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-4xl">
            {/*content*/}
            <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-screen">
              {/*header*/}
              <div className="flex items-start justify-between p-5 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Chi tiết kết quả dự đoán
                </h3>
                
              </div>
              {/*body*/}
              {isLoading ? (
                <div className="flex justify-center items-center p-20">
                  <div role="status" className=''>
                    <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </div>
                </div>
                
              ) : (result == 0 || result == 1) ? (
                <div className="flex flex-wrap max-w-screen">
                  {/* legend */}
                  <div className="w-1/4">
                    <div className="grid grid-cols-5 grid-rows-2 gap-4 mt-4">
                      {/* row 1 */}
                      <div class="col-span-2 row-span-1 text-center flex justify-center items-center">
                        <p className="text-black text-lg font-semibold">{result==0 ? "Real" : "Not Fake"}</p>
                      </div>
                      <div class="col-span-3 row-span-1 flex justify-start">
                        <div className="aspect-[2/1] bg-orange-500 border-stone-500 border-[3px] border-solid"></div>
                      </div>
                      {/* row 2 */}
                      <div class="col-span-2 row-span-1 text-center flex justify-center items-center">
                        <p className="text-black text-lg font-semibold">{result==1 ? "Fake" : "Not Real"}</p>
                      </div>
                      <div class="col-span-3 row-span-1 flex justify-start">
                        <div className="aspect-[2/1] bg-blue-500 border-stone-500 border-[3px] border-solid"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* highlighted text */}
                  <div className="w-3/4 max-h-[30rem] overflow-auto pl-4">
                    <p className="my-4 text-black text-lg leading-relaxed whitespace-pre-wrap">
                        {weights.map((weight, index) => <>
                          <span
                          key={index}
                          className={(weights[index][1] > 0 && result == 0) || (weights[index][1] < 0 && result == 1) ? colorMatchingReal(weights[index][1]) : colorMatchingFake(weights[index][1])}
                          title={weights[index][1]}
                          >
                            {weight[0] + " "} 
                          </span> 
                        </>
                        )}
                    </p>  
                  </div> 
                </div>
              ) : (
                <div className="flex flex-wrap max-w-full whitespace-nowrap">
                  {/* legend */}
                  <div className="w-1/4 max-w-full">
                    <div className="grid grid-cols-5 grid-rows-2 gap-4 mt-4">
                      {/* row 1 */}
                      <div class="col-span-4 row-span-1 text-center flex justify-center items-center">
                        <p className="text-black text-lg font-semibold">{result==2 ? "Real-w-Fake" : "Not Fake-w-Real"}</p>
                      </div>
                      <div class="col-span-1 row-span-1 flex justify-end">
                        <div className="aspect-[2/1] bg-indigo-500 border-stone-500 border-[3px] border-solid"></div>
                      </div>
                      {/* row 2 */}
                      <div class="col-span-4 row-span-1 text-center flex justify-center items-center">
                        <p className="text-black text-lg font-semibold">{result==3 ? "Fake-w-Real" : "Not Real-w-Fake"}</p>
                      </div>
                      <div class="col-span-1 row-span-1 flex justify-end">
                        <div className="aspect-[2/1] bg-lime-500 border-stone-500 border-[3px] border-solid"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* highlighted text */}
                  <div className="w-3/4 max-h-[30rem] overflow-auto pl-4">
                    <p className="my-4 text-black text-lg leading-relaxed whitespace-pre-wrap">
                        {weights.map((weight, index) => <>
                          <span
                          key={index}
                          className={(weights[index][1] > 0 && result == 2) || (weights[index][1] < 0 && result == 3) ? colorMatchingTruewFalse(weights[index][1]) : colorMatchingFalsewTrue(weights[index][1])}
                          title={weights[index][1]}
                          >
                            {weight[0] + " "} 
                          </span> 
                        </>
                        )}
                    </p>  
                  </div> 
                </div>
              )}
              
                          
              {/*footer*/}
              <div className="flex items-center justify-end p-6 rounded-2xl bg-gray-100">
                <button
                  className="text-red-500 background-transparent font-extrabold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={toggleModal}
                >
                  Close
                </button>

              </div>

            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null}
    </>
  );
}