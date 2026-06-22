import express from "express"
import cors from "cors"
import morgan from "morgan";
import { startRemainderJob } from "./schedulers/reminder.scheduler";

import router from "./router"

const app = express()

startRemainderJob();

app.use(cors())

app.use(morgan("dev"))

app.use(express.json())

app.use("/api", router)

app.listen(8000, () => {
  console.log("Server running on port 8000")
})
