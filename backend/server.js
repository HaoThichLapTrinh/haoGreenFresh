import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import authRoutes from "./routes/authRoutes.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/api/auth", authRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`))
