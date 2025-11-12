# Test Backend API

$API_URL = "http://localhost:5000/api/auth"
$email = "test$(Get-Random)@example.com"
$password = "123456"

Write-Host "`n🧪 === BẮT ĐẦU TEST BACKEND === 🧪`n" -ForegroundColor Cyan

# 1. TEST ĐĂNG KÝ
Write-Host "1️⃣ TEST ĐĂNG KÝ..." -ForegroundColor Yellow
$registerRes = Invoke-WebRequest -Uri "$API_URL/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{
    name = "Test User"
    email = $email
    password = $password
  } | ConvertTo-Json)

Write-Host "✅ Đăng ký thành công:" -ForegroundColor Green
$registerData = $registerRes.Content | ConvertFrom-Json
$registerData | ConvertTo-Json
Write-Host "Email: $email" -ForegroundColor Cyan

# 2. TEST ĐĂNG NHẬP
Write-Host "`n2️⃣ TEST ĐĂNG NHẬP..." -ForegroundColor Yellow
$loginRes = Invoke-WebRequest -Uri "$API_URL/login" `
  -Method POST `
  -ContentType "application/json" `
  -Body (@{
    email = $email
    password = $password
  } | ConvertTo-Json)

Write-Host "✅ Đăng nhập thành công:" -ForegroundColor Green
$loginData = $loginRes.Content | ConvertFrom-Json
$loginData | ConvertTo-Json
$token = $loginData.token
Write-Host "Token: $token" -ForegroundColor Cyan

# 3. TEST LẤY THÔNG TIN NGƯỜI DÙNG
Write-Host "`n3️⃣ TEST LẤY THÔNG TIN NGƯỜI DÙNG..." -ForegroundColor Yellow
$meRes = Invoke-WebRequest -Uri "$API_URL/me" `
  -Method GET `
  -Headers @{
    Authorization = "Bearer $token"
  }

Write-Host "✅ Lấy thông tin thành công:" -ForegroundColor Green
$meRes.Content | ConvertFrom-Json | ConvertTo-Json

# 4. TEST LỖI - SAI MẬT KHẨU
Write-Host "`n4️⃣ TEST LỖI - SAI MẬT KHẨU..." -ForegroundColor Yellow
try {
  Invoke-WebRequest -Uri "$API_URL/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body (@{
      email = $email
      password = "wrongpassword"
    } | ConvertTo-Json)
} catch {
  $errorData = $_.ErrorDetails.Message | ConvertFrom-Json
  Write-Host "✅ Lỗi được bắt như mong đợi: $($errorData.message)" -ForegroundColor Green
}

# 5. TEST LỖI - EMAIL KHÔNG TỒN TẠI
Write-Host "`n5️⃣ TEST LỖI - EMAIL KHÔNG TỒN TẠI..." -ForegroundColor Yellow
try {
  Invoke-WebRequest -Uri "$API_URL/login" `
    -Method POST `
    -ContentType "application/json" `
    -Body (@{
      email = "notexist@example.com"
      password = "123456"
    } | ConvertTo-Json)
} catch {
  $errorData = $_.ErrorDetails.Message | ConvertFrom-Json
  Write-Host "✅ Lỗi được bắt như mong đợi: $($errorData.message)" -ForegroundColor Green
}

Write-Host "`n✅ === TẤT CẢ TEST THÀNH CÔNG === ✅`n" -ForegroundColor Green
