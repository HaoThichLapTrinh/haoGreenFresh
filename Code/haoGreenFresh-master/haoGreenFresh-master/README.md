# 🌿 GreenFresh - Website Bán Rau Sạch

Dự án mini website bán rau củ quả tươi sạch được phát triển bằng **React + TypeScript + Vite**.  
Giao diện hiện đại, tông màu xanh lá cây, thân thiện với người dùng và tối ưu cho trải nghiệm mua hàng.

---

## 🚀 Công nghệ sử dụng

- ⚛️ **React + TypeScript** – Xây dựng giao diện
- ⚡ **Vite** – Tối ưu tốc độ build & development
- 🎨 **Tailwind CSS** – Thiết kế nhanh, gọn, đồng bộ
- 🧠 **Zustand** – Quản lý trạng thái (cart, auth)
- 🛒 **React Router DOM** – Điều hướng giữa các trang
- ☁️ **Vercel** – Triển khai (deploy) website

---

## 📁 Cấu trúc thư mục

src/
├─ assets/ # Ảnh banner, sản phẩm
├─ components/ # Các component dùng chung (Header, Footer, Layout,…)
├─ data/ # Dữ liệu tĩnh (product.ts,…)
├─ pages/ # Các trang (Home, Products, About, Contact, Login,…)
├─ store/ # Zustand store (useCartStore, useAuthStore)
├─ router/ # Cấu hình route
├─ main.tsx # Điểm khởi đầu ứng dụng
└─ App.tsx # App chính


---

## ⚙️ Cài đặt và chạy dự án

### 1️⃣ Clone dự án về máy

```bash
git clone https://github.com/<your-username>/greenfresh.git
cd greenfresh

2️⃣ Cài đặt dependencies
npm install

3️⃣ Chạy dự án ở môi trường local
npm run dev


Sau đó mở trình duyệt tại:
👉 http://localhost:5173/

🌐 Triển khai (Deploy) lên Vercel

Đẩy dự án lên GitHub (hoặc GitLab).

Vào https://vercel.com
.

Chọn “Add New Project” → “Import Project from GitHub”.

Chọn repo greenfresh.

Cấu hình build:

Framework Preset: Vite

Build Command: npm run build

Output Directory: dist

Nhấn Deploy ✅

Sau vài phút, Vercel sẽ cung cấp link website public ví dụ:

🌍 https://greenfresh.vercel.app
