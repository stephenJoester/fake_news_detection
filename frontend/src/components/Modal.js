import React from "react";

export default function Modal({showModal, toggleModal, content, weights, result}) {
  const maxWeight = Math.max(...weights.map(weight => Math.abs(weight[1])))
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
  return (
    <>
      {showModal ? (
        <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-2xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none max-h-screen">
              {/*header*/}
              <div className="flex items-start justify-between p-5 rounded-t">
                <h3 className="text-3xl font-semibold">
                  Chi tiết kết quả dự đoán
                </h3>
                
              </div>
              {/*body*/}
              <div className="flex flex-wrap max-w-screen">
                {/* legend */}
                <div className="w-1/4">
                  <div className="grid grid-cols-5 grid-rows-2 gap-4 mt-4">
                    {/* row 1 */}
                    <div class="col-span-2 row-span-1 text-center flex justify-center items-center">
                      <p className="text-black text-lg font-semibold">{result==2 ? "Real" : "Not Fake"}</p>
                    </div>
                    <div class="col-span-3 row-span-1 flex justify-start">
                      <div className="aspect-[2/1] bg-orange-500 border-stone-500 border-[3px] border-solid"></div>
                    </div>
                    {/* row 2 */}
                    <div class="col-span-2 row-span-1 text-center flex justify-center items-center">
                      <p className="text-black text-lg font-semibold">{result==0 ? "Fake" : "Not Real"}</p>
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
                        className={(weights[index][1] > 0 && result == 2) || (weights[index][1] < 0 && result == 0) ? colorMatchingReal(weights[index][1]) : colorMatchingFake(weights[index][1])}
                        title={weights[index][1]}
                        >
                          {weight[0] + " "} 
                        </span> 
                      </>
                      )}
                    </p>  
                </div>

              </div>
              
                        
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