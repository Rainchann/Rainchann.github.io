import express from "express"
import cors from "cors"
import rchat from "./api/reviews.route.js"

const app = express()

app.use(cors())
app.use(express.json()) //able to send and receive json

app.use("/api/v1/rchat", rchat)
app.use("*", (req, res) => res.status(404).json({error: "not found"}))

export default app

/*mongodb+srv://rainchan607:<Ycy19980731>@cluster0.p9abbke.mongodb.net/?retryWrites=true&w=majority*/ 