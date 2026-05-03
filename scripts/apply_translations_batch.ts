import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('./src/data/questions.json', 'utf8'));

const translations = {
  "menkyogentsuki_gentsuki_12_33_2": {
    "contentVi": "[Tình huống] Đang đi 30km/h gần khu vực công trường. [Câu hỏi] Bạn có chú ý rằng các nhân viên công trường có thể bất ngờ bước ra từ phía sau rào chắn không?",
    "explanationVi": "Đúng. Khu vực thi công luôn tiềm ẩn nguy cơ có người hoặc thiết bị bất ngờ xuất hiện trên lòng đường."
  },
  "menkyogentsuki_gentsuki_12_33_3": {
    "contentVi": "[Tình huống] Đang đi 30km/h, phía trước có rào chắn công trường lấn sang làn đường của bạn. [Câu hỏi] Vì xe đối diện không có vật cản nên bạn có ý định nhường đường cho họ đi qua trước không?",
    "explanationVi": "Đúng. Theo nguyên tắc, phương tiện nào có chướng ngại vật ở phía làn đường của mình thì phải nhường đường cho xe đi ngược chiều."
  },
  "menkyogentsuki_gentsuki_12_34_1": {
    "contentVi": "[Tình huống] Đang đi 30km/h, có một chiếc taxi đang đỗ phía trước. [Câu hỏi] Bạn định đánh lái lấn sang làn đường đối diện để tránh chiếc taxi đó ngay lập tức chứ?",
    "explanationVi": "Sai. Việc lấn sang làn đối diện mà không quan sát kỹ có thể gây ra va chạm trực diện cực kỳ nguy hiểm."
  },
  "menkyogentsuki_gentsuki_12_34_2": {
    "contentVi": "[Tình huống] Có taxi đỗ phía trước và xe đối diện đang tới. [Câu hỏi] Bạn có ý định giảm tốc độ và chờ cho xe đi ngược chiều đi qua hoàn toàn rồi mới lách qua taxi không?",
    "explanationVi": "Đúng. Đây là cách xử lý an toàn và đúng luật khi gặp vật cản trên đường."
  },
  "menkyogentsuki_gentsuki_12_34_3": {
    "contentVi": "[Tình huống] Có một chiếc taxi đang đỗ phía trước. [Câu hỏi] Bạn có ý định chú ý quan sát đèn tín hiệu của taxi vì họ có thể bất ngờ khởi hành lại không?",
    "explanationVi": "Đúng. Cần đặc biệt lưu tâm đến các phương tiện đang dừng đỗ ven đường vì họ có thể di chuyển lại bất cứ lúc nào."
  },
  "menkyogentsuki_gentsuki_12_35_1": {
    "contentVi": "[Tình huống] Đang đi 30km/h, có trẻ em đang chơi bên lề đường. [Câu hỏi] Bạn có chú ý rằng trẻ em thường có những hành động bất ngờ mà chúng ta không thể lường trước được không?",
    "explanationVi": "Đúng. Cần luôn cảnh giác cao độ và sẵn sàng phanh khi đi qua khu vực có trẻ nhỏ chơi đùa."
  },
  "menkyogentsuki_gentsuki_12_35_2": {
    "contentVi": "[Tình huống] Đang đi 30km/h gần trẻ em. [Câu hỏi] Bạn định bấm còi thật to để lũ trẻ sợ mà tránh xa lòng đường chứ?",
    "explanationVi": "Sai. Tuyệt đối không lạm dụng còi để hù dọa người khác; bạn nên giảm tốc độ và di chuyển cẩn thận."
  },
  "menkyogentsuki_gentsuki_12_35_3": {
    "contentVi": "[Tình huống] Có trẻ em đang chơi đùa sát lòng đường. [Câu hỏi] Bạn có chú ý rằng trẻ em khi đang mải chơi thường quên mất việc quan sát xe cộ xung quanh không?",
    "explanationVi": "Đúng. Sự tập trung của trẻ nhỏ vào trò chơi khiến chúng rất dễ vô ý lao ra đường."
  },
  "menkyogentsuki_gentsuki_12_36_1": {
    "contentVi": "[Tình huống] Đang đi 30km/h, phía trước có xe đang dừng đỗ. [Câu hỏi] Bạn có lo ngại việc có người bất ngờ bước ra từ phía sau chiếc xe đang đỗ đó không?",
    "explanationVi": "Đúng. Điểm mù tạo ra bởi các xe đang đỗ là nơi thường xuyên xảy ra va chạm với người đi bộ."
  },
  "menkyogentsuki_gentsuki_12_36_2": {
    "contentVi": "[Tình huống] Đang đi 30km/h, có người đi bộ bên đường. [Câu hỏi] Bạn nghĩ người đi bộ sẽ không bao giờ sang đường đột ngột nên bạn định cứ thế đi nhanh qua chứ?",
    "explanationVi": "Sai. Phải luôn giả định người đi bộ có thể sang đường bất cứ lúc nào và họ luôn được ưu tiên."
  },
  "menkyogentsuki_gentsuki_12_36_3": {
    "contentVi": "[Tình huống] Đang đi 30km/h trên đường có xe đỗ và trẻ nhỏ. [Câu hỏi] Bạn có đồng ý rằng trẻ em là đối tượng có hành vi khó dự đoán nhất trong giao thông không?",
    "explanationVi": "Đúng. Luôn cần giữ khoảng cách an toàn và tốc độ thấp khi gặp trẻ em trên đường."
  },
  "menkyogentsuki_gentsuki_12_37_1": {
    "contentVi": "[Tình huống] Đang đi 30km/h, làn đường phía đối diện đang được thi công công trường. [Câu hỏi] Bạn có chú ý rằng các phương tiện từ hướng ngược lại có thể lấn sang làn của bạn để đi qua công trường không?",
    "explanationVi": "Đúng. Khi làn của họ bị chặn, họ buộc phải lấn sang làn bên cạnh; bạn cần chủ động nhường đường nếu cần thiết."
  },
  "menkyogentsuki_gentsuki_12_37_2": {
    "contentVi": "[Tình huống] Đang đi 30km/h gần công trường. [Câu hỏi] Bạn có chú ý rằng các nhân viên công trường có thể bất ngờ xuất hiện từ phía sau các rào chắn không?",
    "explanationVi": "Đúng. Cần quan sát kỹ các kẽ hở giữa các tấm rào chắn công trường."
  },
  "menkyogentsuki_gentsuki_12_37_3": {
    "contentVi": "[Tình huống] Đang đi qua đoạn đường đang thi công. [Câu hỏi] Bạn có ý định lái xe cẩn thận để tránh va chạm với các máy móc, thiết bị thi công đang đặt trên lòng đường không?",
    "explanationVi": "Đúng. Cần bảo vệ an toàn cho cả bản thân và các trang thiết bị, nhân sự tại công trường."
  },
  "menkyogentsuki_gentsuki_12_38_1": {
    "contentVi": "[Tình huống] Đang đi 30km/h bám sau một chiếc taxi. [Câu hỏi] Bạn có ý định giả định rằng taxi có thể dừng lại bất ngờ để trả khách và luôn giữ khoảng cách an toàn không?",
    "explanationVi": "Đúng. Taxi thường xuyên dừng đỗ đột ngột, việc bám sát đuôi là cực kỳ nguy hiểm."
  },
  "menkyogentsuki_gentsuki_12_38_2": {
    "contentVi": "[Tình huống] Đang đi 30km/h, taxi phía trước phanh gấp. [Câu hỏi] Bạn định bẻ lái thật gấp sang làn đối diện để tránh đâm vào đuôi taxi chứ?",
    "explanationVi": "Sai. Đánh lái gấp (kyu-handle) sang làn đối diện dễ gây ra tai nạn thảm khốc với xe đi ngược chiều; hãy ưu tiên phanh an toàn."
  },
  "menkyogentsuki_gentsuki_12_38_3": {
    "contentVi": "[Tình huống] Đang đi trên đường, xe phía sau bật đèn xi nhan báo hiệu muốn vượt. [Câu hỏi] Bạn có ý định nhường đường một cách an toàn cho xe phía sau thực hiện hành vi vượt không?",
    "explanationVi": "Đúng. Việc hỗ trợ các phương tiện khác lưu thông thuận tiện là một nét văn hóa giao thông an toàn."
  },
  "menkyogentsuki_gentsuki_12_39_1": {
    "contentVi": "[Tình huống] Đang đi 10km/h định rẽ phải, có đứa trẻ trên vỉa hè. [Câu hỏi] Bạn nghĩ đứa trẻ sẽ đứng yên quan sát nên bạn định rẽ phải thật nhanh luôn chứ?",
    "explanationVi": "Sai. Tuyệt đối không được chủ quan với trẻ nhỏ; chúng có thể lao ra đường bất cứ giây phút nào."
  },
  "menkyogentsuki_gentsuki_12_39_2": {
    "contentVi": "[Tình huống] Đang định rẽ phải, xe đối diện đang tiến tới. [Câu hỏi] Bạn có ý định tạm dừng lại và nhường cho phương tiện đi thẳng từ hướng ngược lại đi qua hết rồi mới rẽ không?",
    "explanationVi": "Đúng. Xe đi thẳng luôn có quyền ưu tiên cao hơn xe rẽ phải tại giao lộ."
  },
  "menkyogentsuki_gentsuki_12_39_3": {
    "contentVi": "[Tình huống] Bạn đang định rẽ phải nhưng giao lộ hơi đông. [Câu hỏi] Vì có xe phía sau đang chờ nên bạn định thực hiện rẽ thật gấp để không làm mất thời gian của họ chứ?",
    "explanationVi": "Sai. Đừng để áp lực từ phía sau khiến bạn đưa ra những quyết định lái xe vội vàng và thiếu an toàn."
  },
  "menkyogentsuki_gentsuki_12_40_1": {
    "contentVi": "[Tình huống] Đang đi 30km/h đi thẳng qua giao lộ. [Câu hỏi] Bạn định lái xe bám thật sát đuôi xe phía trước để cùng nhau vượt qua giao lộ thật nhanh chứ?",
    "explanationVi": "Sai. Việc không giữ khoảng cách an toàn (shakan-kyori) là nguyên nhân chính dẫn đến các vụ đâm đuôi xe liên hoàn."
  },
  "menkyogentsuki_gentsuki_12_40_2": {
    "contentVi": "[Tình huống] Đang đi thẳng tới giao lộ. [Câu hỏi] Vì đèn đang xanh nên bạn tin chắc là an toàn và định cứ thế phóng qua mà không cần quan sát hai bên chứ?",
    "explanationVi": "Sai. Ngay cả khi đèn xanh, bạn vẫn phải quan sát bao quát để phòng ngừa các xe vượt đèn đỏ hoặc người đi bộ sang đường muộn."
  },
  "menkyogentsuki_gentsuki_12_40_3": {
    "contentVi": "[Tình huống] Đang đi 30km/h đi thẳng. [Câu hỏi] Bạn có ý định duy trì việc lái xe bám sát về phía bên trái làn đường của mình không?",
    "explanationVi": "Đúng. Đây là nguyên tắc 'Keep Left' cơ bản trong lái xe an toàn."
  }
};

questions.forEach(q => {
  if (translations[q.id]) {
    q.contentVi = translations[q.id].contentVi;
    q.explanationVi = translations[q.id].explanationVi;
  }
});

fs.writeFileSync('./src/data/questions.json', JSON.stringify(questions, null, 2));
console.log('Updated batch questions.');
