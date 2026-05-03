import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('./src/data/questions.json', 'utf8'));

const translations = {
  "menkyogentsuki_gentsuki_1_4_2": {
    "contentVi": "Lái xe hai bánh khi đi guốc hoặc giày cao gót là nguy hiểm.",
    "explanationVi": "Đi ủng cao cổ cũng nguy hiểm. Giày thể thao là phù hợp nhất."
  },
  "menkyogentsuki_gentsuki_1_4_3": {
    "contentVi": "Khi đi xe máy (gentsuki), hãy đặt ức bàn chân lên chỗ để chân.",
    "explanationVi": "Ngoài ra, với loại xe tay ga (scooter), hãy khép hai chân lại."
  },
  "menkyogentsuki_gentsuki_1_4_4": {
    "contentVi": "Khi lái xe hai bánh, nên dùng hai đầu gối kẹp nhẹ vào bình xăng.",
    "explanationVi": "Đi xe mà mở rộng hai chân là rất nguy hiểm."
  },
  "menkyogentsuki_gentsuki_1_4_5": {
    "contentVi": "Khi lái xe hai bánh, để hòa nhập với môi trường xung quanh, hãy mặc quần áo tối màu.",
    "explanationVi": "Xe hai bánh dễ bị người lái xe ô tô bỏ qua, vì vậy hãy mặc quần áo sáng màu nhất có thể khi lái xe."
  },
  "menkyogentsuki_gentsuki_1_5_1": {
    "contentVi": "Phanh xe máy (gentsuki) không được phép có độ rơ.",
    "explanationVi": "Nên có độ rơ khoảng 15~20 mm."
  },
  "menkyogentsuki_gentsuki_1_5_2": {
    "contentVi": "Lượng dung dịch bình ắc quy không hề giảm nên không cần kiểm tra.",
    "explanationVi": "Dung dịch ắc quy giảm do bay hơi nên cần phải kiểm tra."
  },
  "menkyogentsuki_gentsuki_1_5_3": {
    "contentVi": "Kiểm tra lượng dầu động cơ khi đã tắt máy.",
    "explanationVi": "Không nên kiểm tra trong khi động cơ đang chạy."
  },
  "menkyogentsuki_gentsuki_1_5_4": {
    "contentVi": "Khi phát hiện tay lái bị lỗi, vì quãng đường ngắn nên tôi vẫn tiếp tục lái.",
    "explanationVi": "Nếu tay lái hoặc động cơ bị lỗi, tuyệt đối không được tiếp tục lái xe."
  },
  "menkyogentsuki_gentsuki_1_5_5": {
    "contentVi": "Không được lái xe máy (gentsuki) dù là ban ngày nếu đèn pha không sáng.",
    "explanationVi": "Điều này là do cần phải bật đèn khi đi trong đường hầm hoặc khi trời tối."
  },
  "menkyogentsuki_gentsuki_1_6_1": {
    "contentVi": "Khi vào cua với xe máy (gentsuki), hãy cố gắng nghiêng thân xe ra phía ngoài khúc cua.",
    "explanationVi": "Hãy cố gắng nghiêng thân xe vào phía trong khúc cua."
  },
  "menkyogentsuki_gentsuki_1_6_2": {
    "contentVi": "Xe máy (gentsuki) dễ mất cân bằng và có nguy cơ bị ngã nên hãy chú ý cẩn thận.",
    "explanationVi": "Không giống như xe bốn bánh, xe hai bánh rất dễ bị ngã nên cần chú ý."
  },
  "menkyogentsuki_gentsuki_1_6_3": {
    "contentVi": "Ngồi đúng tư thế khi đi xe máy (gentsuki) cũng có tác dụng giảm mệt mỏi.",
    "explanationVi": "Ngồi đúng tư thế sẽ giúp đỡ mệt hơn."
  },
  "menkyogentsuki_gentsuki_1_6_4": {
    "contentVi": "Khi lái xe máy (gentsuki), hãy cố gắng không nắm quá chặt tay lái.",
    "explanationVi": "Để điều khiển tay lái và các bộ phận khác một cách trơn tru."
  },
  "menkyogentsuki_gentsuki_1_6_5": {
    "contentVi": "Kỹ thuật cần thiết để lái ô tô và xe hai bánh là hoàn toàn giống nhau.",
    "explanationVi": "Xe hai bánh đòi hỏi kỹ thuật lái xe khác với xe bốn bánh vì phải dùng cơ thể để giữ thăng bằng."
  },
  "menkyogentsuki_gentsuki_1_7_1": {
    "contentVi": "Khi phanh xe hai bánh nếu không đánh lái và bánh xe không nghiêng, nên phanh đồng thời bánh trước và bánh sau.",
    "explanationVi": "Đối với xe hai bánh, nên phanh đồng thời bánh trước và bánh sau."
  },
  "menkyogentsuki_gentsuki_1_7_2": {
    "contentVi": "Khi dùng phanh trong lúc vào cua xe máy (gentsuki), hãy cẩn trọng vì lốp xe có thể bị trượt và bị ngã.",
    "explanationVi": "Xe máy rất dễ mất cân bằng và dễ bị ngã nên cần cẩn trọng."
  },
  "menkyogentsuki_gentsuki_1_7_3": {
    "contentVi": "Tốc độ tối đa của xe máy (gentsuki) là 30 km/h.",
    "explanationVi": "Không được lái xe với tốc độ vượt quá 30 km/h."
  }
};

questions.forEach(q => {
  if (translations[q.id]) {
    q.contentVi = translations[q.id].contentVi;
    q.explanationVi = translations[q.id].explanationVi;
  }
});

fs.writeFileSync('./src/data/questions.json', JSON.stringify(questions, null, 2));
console.log('Updated 17 questions.');
