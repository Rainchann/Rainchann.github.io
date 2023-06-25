import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js" //data access object
import 'dotenv/config'
console.log(process.env.USER_NAME)
console.log(process.env.PASS_WORD)
const MongoClient = mongodb.MongoClient
const mongo_username = process.env.USER_NAME  //change it to environ variable later
const mongo_password = process.env.PASS_WORD
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.p9abbke.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500, //time before it show lost connection
        UseNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })