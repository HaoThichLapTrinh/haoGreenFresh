// backend/controllers/authController.js
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const dataPath = path.resolve("data/users.json");
const SECRET_KEY = "haoGreenFresh_secret_key";

// Đọc dữ liệu user từ file
function readUsers() {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, "utf8");
  return data ? JSON.parse(data) : [];
}

// Ghi dữ liệu user vào file
function writeUsers(users) {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
}

// ✅ Đăng ký tài khoản
export const register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: "Vui lòng nhập đủ thông tin." });

  const users = readUsers();
  const existing = users.find((u) => u.email === email);
  if (existing)
    return res.status(400).json({ message: "Email đã được sử dụng." });

  const hashed = bcrypt.hashSync(password, 10);
  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashed,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return res.status(201).json({ message: "Đăng ký thành công!", user: newUser });
};

// ✅ Đăng nhập
export const login = (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Tài khoản không tồn tại." });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(400).json({ message: "Sai mật khẩu." });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "2h",
  });

  res.json({ message: "Đăng nhập thành công!", token, user });
};

// ✅ Lấy thông tin người dùng hiện tại
export const getMe = (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Không có token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const users = readUsers();
    const user = users.find((u) => u.id === decoded.id);

    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};
