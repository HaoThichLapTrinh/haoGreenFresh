import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // ✅ DevTools tiện cho admin
import App from "./App";
import "./index.css";

// ✅ Tạo 1 QueryClient duy nhất cho toàn bộ ứng dụng
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Không tự fetch lại khi chuyển tab
      retry: 1,                    // Chỉ thử lại 1 lần nếu lỗi
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* 👉 Ứng dụng chính */}
        <App />

        {/* ✅ Bật công cụ kiểm tra query (chỉ hiện ở dev) */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
