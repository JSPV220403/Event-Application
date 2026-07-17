import express from "express"
import cors from "cors"
import morgan from "morgan";
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "./config/swagger";
import { startRemainderJob } from "./schedulers/reminder.scheduler";

import { getSchedule } from "./services/pdf.service";

import router from "./router"

const app = express()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(
  "/eventImages",
  express.static("eventImages")
);


startRemainderJob();

app.use(cors())

app.use(morgan("dev"))

app.use(express.json())

getSchedule('17c3f80b-3cfd-48fd-bf75-1353749b1713');

app.use("/api", router)

app.listen(8000, () => {
  console.log("Server running on port 8000")
})

export default app;