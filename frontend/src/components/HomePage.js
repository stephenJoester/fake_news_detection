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
 
  // const testWeights = [
  //   [
  //       "Chính phủ vừa ban hành Nghị quyết phiên họp Chính phủ thường kỳ tháng 6 năm 2023 và Hội nghị trực tuyến Chính phủ với địa phương.",
  //       0.00556772145637879
  //   ],
  //   [
  //       "Theo đó, Chính phủ giao Ngân hàng Nhà nước Việt Nam chủ trì, phối hợp với cơ quan, địa phương thực hiện các giải pháp điều hành chính sách tiền tệ chủ động, linh hoạt, nới lỏng phù hợp, kịp thời, hiệu quả, phối hợp đồng bộ, chặt chẽ, hài hòa với chính sách tài khóa mở rộng hợp lý, có trọng tâm, trọng điểm, hiệu quả, nhanh chóng, dứt khoát.",
  //       0.004097338100190501
  //   ],
  //   [
  //       "Việc này nhằm ưu tiên tháo gỡ khó khăn cho sản xuất kinh doanh, thúc đẩy tăng trưởng gắn với ổn định kinh tế vĩ mô, kiểm soát lạm phát, bảo đảm các cân đối lớn của nền kinh tế.",
  //       0.003691073126555211
  //   ],
  //   [
  //       "Chính phủ cũng lưu ý, tiếp tục thực hiện các giải pháp đồng bộ, quyết liệt để giảm mặt bằng lãi suất, nhất là giảm lãi suất cho vay, phấn đấu giảm ít nhất khoảng từ 1,5 - 2%; nghiên cứu, thực hiện áp dụng đối với cả khoản vay mới và đang còn dư nợ.",
  //       0.00425896167777102
  //   ],
  //   [
  //       "Ngân hàng Nhà nước Việt Nam xác định hạn mức tăng trưởng tín dụng phù hợp với tình hình thực tiễn (cả năm khoảng 13 - 15%, trường hợp thuận lợi thì có thể tăng cao hơn) và công bố ngay bằng biện pháp, hình thức phù hợp, hiệu quả chỉ tiêu tăng trưởng tín dụng cho các ngân hàng thương mại đến hết năm 2023, bảo đảm đáp ứng nhu cầu vốn tín dụng cho nền kinh tế.",
  //       0.0046764727370798495
  //   ],
  //   [
  //       "Cùng với đó là rà soát các điều kiện, tiêu chí cho vay để điều chỉnh phù hợp, thuận lợi hơn cho người vay, bảo đảm tăng khả năng tiếp cận tín dụng của doanh nghiệp, người dân.",
  //       0.0007610090256912336
  //   ],
  //   [
  //       "Đồng thời, tập trung, khẩn trương xử lý các ngân hàng thương mại yếu kém, bảo đảm thanh khoản, an toàn hệ thống, chú trọng xử lý nợ xấu; có các giải pháp hiệu quả đẩy mạnh triển khai thực hiện gói tín dụng 40 nghìn tỷ đồng hỗ trợ lãi suất và 120 nghìn tỷ đồng cho vay nhà ở xã hội.",
  //       0.004244499343198661
  //   ],
  //   [
  //       "Đấu thầu công khai in sách giáo khoa, không để xảy ra tham nhũng, tiêu cực.",
  //       0.00031774286234805514
  //   ],
  //   [
  //       "Chính phủ yêu cầu Bộ Công Thương kịp thời khắc phục những tồn tại, hạn chế trong chỉ đạo, điều hành, bảo đảm cung ứng điện ổn định, liên tục, phục vụ sản xuất, kinh doanh của doanh nghiệp và sinh hoạt của người dân, nhất là trong mùa cao điểm nắng nóng.",
  //       -0.0008807866396386652
  //   ],
  //   [
  //       "Bộ Công Thương khẩn trương hoàn thành xây dựng Kế hoạch thực hiện Quy hoạch điện VIII, trình Thủ tướng trước ngày 15/7; sớm hoàn thiện cơ chế mua bán điện trực tiếp, cơ chế phát triển điện mặt trời áp mái tự sản tự tiêu, thí điểm giao cho các tập đoàn, tổng công ty Nhà nước phát triển điện gió ngoài khơi.",
  //       0.005903771966627909
  //   ],
  //   [
  //       "Đồng thời, chủ động nắm chắc tình hình, thực hiện các biện pháp để bảo đảm cung ứng đủ xăng dầu cho thị trường trong nước trong mọi tình huống.",
  //       0.0009573037136723852
  //   ],
  //   [
  //       "Chính phủ yêu cầu Bộ Giáo dục và Đào tạo chủ trì, phối hợp với các cơ quan, địa phương thực hiện hiệu quả công tác tuyển sinh đại học; chuẩn bị tốt các điều kiện cho năm học mới 2023 - 2024.",
  //       0.0049157338875260225
  //   ],
  //   [
  //       "Đặc biệt là tổ chức đấu thầu công khai in sách giáo khoa, bảo đảm không để thiếu sách giáo khoa phục vụ năm học mới, không để xảy ra tham nhũng, tiêu cực trong in ấn, phát hành.",
  //       -0.001174887105140135
  //   ],
  //   [
  //       "Chính phủ giao Phó Thủ tướng Trần Hồng Hà trực tiếp theo dõi, chỉ đạo thực hiện công tác này.",
  //       0.005012544510879917
  //   ],
  //   [
  //       "Ngoài ra, Chính phủ cũng giao Bộ Nội vụ chủ trì, phối hợp với các cơ quan, địa phương: rà soát, phối hợp hoàn thành việc cơ cấu, sắp xếp lại đơn vị sự nghiệp công lập thuộc các bộ, cơ quan ngang bộ, cơ quan thuộc Chính phủ; phối hợp cơ quan, địa phương đẩy mạnh tinh giản biên chế gắn với cơ cấu lại đội ngũ theo vị trí việc làm và nâng cao chất lượng đội ngũ cán bộ, công chức, viên chức.",
  //       0.005316759843831538
  //   ],
  //   [
  //       "Chính phủ yêu cầu khẩn trương hoàn thiện, trình cấp có thẩm quyền ban hành quy định về việc khuyến khích cán bộ dám nghĩ, dám làm, dám chịu trách nhiệm vì lợi ích chung...",
  //       0.005592177589204492
  //   ]
  // ]

  // useEffect(() => {
  //   setWeights(testWeights) 
  // })
  
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