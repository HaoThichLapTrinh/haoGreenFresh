import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

async function testBackend() {
  try {
    console.log("\n🧪 === BẮT ĐẦU TEST BACKEND === 🧪\n");

    // 1. TEST ĐĂNG KÝ
    console.log("1️⃣ TEST ĐĂNG KÝ...");
    const registerRes = await axios.post(`${API_URL}/register`, {
      name: "Test User",
      email: `test${Date.now()}@example.com`,
      password: "123456",
    });
    console.log("✅ Đăng ký thành công:", registerRes.data);
    const email = registerRes.data.user.email;

    // 2. TEST ĐĂNG NHẬP
    console.log("\n2️⃣ TEST ĐĂNG NHẬP...");
    const loginRes = await axios.post(`${API_URL}/login`, {
      email: email,
      password: "123456",
    });
    console.log("✅ Đăng nhập thành công:");
    console.log("Token:", loginRes.data.token);
    const token = loginRes.data.token;

    // 3. TEST LẤY THÔNG TIN NGƯỜI DÙNG
    console.log("\n3️⃣ TEST LẤY THÔNG TIN NGƯỜI DÙNG...");
    const meRes = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("✅ Lấy thông tin thành công:", meRes.data);

    // 4. TEST LỖI - SAI MẬT KHẨU
    console.log("\n4️⃣ TEST LỖI - SAI MẬT KHẨU...");
    try {
      await axios.post(`${API_URL}/login`, {
        email: email,
        password: "wrongpassword",
      });
    } catch (error) {
      console.log("✅ Lỗi được bắt như mong đợi:", error.response.data.message);
    }

    // 5. TEST LỖI - EMAIL KHÔNG TỒN TẠI
    console.log("\n5️⃣ TEST LỖI - EMAIL KHÔNG TỒN TẠI...");
    try {
      await axios.post(`${API_URL}/login`, {
        email: "notexist@example.com",
        password: "123456",
      });
    } catch (error) {
      console.log("✅ Lỗi được bắt như mong đợi:", error.response.data.message);
    }

    console.log("\n✅ === TẤT CẢ TEST THÀNH CÔNG === ✅\n");
  } catch (error) {
    console.error(
      "\n❌ LỖI:",
      error.response?.data || error.message,
      "\n"
    );
  }
}

testBackend();
