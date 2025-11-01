import fs from "fs"
import path from "path"

const dataPath = path.join(process.cwd(), "backend", "data", "users.json")

export const getAllUsers = () => {
  if (!fs.existsSync(dataPath)) return []
  const data = fs.readFileSync(dataPath)
  return JSON.parse(data)
}

export const saveAllUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2))
}
