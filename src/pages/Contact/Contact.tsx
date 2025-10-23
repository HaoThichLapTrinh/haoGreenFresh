import React, { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Lấy danh sách cũ từ localStorage
    const oldContacts = JSON.parse(localStorage.getItem("contacts") || "[]");

    // Tạo đối tượng liên hệ mới
    const newContact = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    // Cập nhật danh sách mới
    const updatedContacts = [...oldContacts, newContact];
    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    alert("Gửi liên hệ thành công!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-4">
          Liên hệ với GreenFresh
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn!  
          Hãy gửi phản hồi cho chúng tôi qua biểu mẫu dưới đây.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form liên hệ */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-6 space-y-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <textarea
              name="message"
              placeholder="Nội dung liên hệ"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Gửi liên hệ
            </button>
          </form>

          {/* Thông tin liên hệ */}
          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">Thông tin liên hệ</h3>
              <p className="text-gray-700">📍 123 Đường Xanh, Quận 5, TP. Hồ Chí Minh</p>
              <p className="text-gray-700">📞 0901 234 567</p>
              <p className="text-gray-700">✉️ support@greenfresh.vn</p>
            </div>

            <div className="rounded-xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8760712200844!2d106.67998347480436!3d10.747019392339025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fd38ef44f7b%3A0x16a8f8e4f91b7c7f!2zVHLGsOG7nW5nIMSQ4bqhbyBo4buNYyBOZ3V54buFbiBU4bqldCBUaOG6pW5o!5e0!3m2!1svi!2s!4v1699872123456"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
