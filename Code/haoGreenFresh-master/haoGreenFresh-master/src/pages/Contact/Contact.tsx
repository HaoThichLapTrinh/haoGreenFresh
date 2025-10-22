export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Liên hệ với GreenFresh</h1>

      <p className="mb-6">
        Chúng tôi luôn sẵn sàng lắng nghe ý kiến của bạn.  
        Hãy liên hệ với GreenFresh qua biểu mẫu dưới đây hoặc qua các kênh thông tin sau:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Họ và tên"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            placeholder="Nội dung"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Gửi liên hệ
          </button>
        </form>

        <div className="space-y-3">
          <p><strong>📍 Địa chỉ:</strong> 123 Đường Xanh, Quận 5, TP. Hồ Chí Minh</p>
          <p><strong>📞 Điện thoại:</strong> 0901 234 567</p>
          <p><strong>✉️ Email:</strong> support@greenfresh.vn</p>
          <iframe
            className="w-full h-56 rounded-xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d194034.4662190817!2d106.52856275311764!3d10.743098671225995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752997dcba7963%3A0x6a20e57611e21358!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBOZ3V54buFbiBU4bqldCBUaMOgbmggKGPGoSBz4bufIEFuIFBow7ogxJDDtG5nKQ!5e1!3m2!1svi!2sus!4v1760372172992!5m2!1svi!2sus">
          </iframe>
        </div>
      </div>
    </div>
  )
}
