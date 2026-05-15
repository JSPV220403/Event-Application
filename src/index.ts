import express from "express"

import router from "./router"

const app = express()

app.use(express.json())

app.use("/api", router)

app.listen(3000, () => {
  console.log("Server running on port 3000")
})


//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2RmM2Q3LWQ2OGEtNGY2NC1iNTk0LTdkNWMwMzBhNGM2ZCIsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInN0YXR1cyI6IkFQUFJPVkVEIiwiaWF0IjoxNzc4NzUyMjY4LCJleHAiOjE3Nzg4Mzg2Njh9.tFg-9rc21a1tWNqZxqdb8_HxubRW-xpqFiEyJ0cfDJk - admin1

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ5ZmMzMDhjLWU5MjEtNDYzOS05NDZkLTAwYjlkZWMyYjMyYyIsImVtYWlsIjoib3JnYW5pemVyMUBnbWFpbC5jb20iLCJyb2xlIjoiT1JHQU5JWkVSIiwic3RhdHVzIjoiQVBQUk9WRUQiLCJpYXQiOjE3Nzg3NTM4NjUsImV4cCI6MTc3ODg0MDI2NX0.L3C3dZSKvK7Oh-WQhKnInueXOpp6CMlrCayeZdaLlOQ - organizer1