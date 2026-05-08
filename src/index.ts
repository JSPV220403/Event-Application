import express from "express"

import registrationRoutes from "./routes/registration"

const app = express()

app.use(express.json())

app.use("/api", registrationRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000")
})