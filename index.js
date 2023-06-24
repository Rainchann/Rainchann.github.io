import app from "./server.js"
import mongodb from "mongodb"
//import ReviewsDAO from "./dao/reviewsDAO.js" //data access object

const MongoClient = mongodb.MongoClient
const mongo_username = 'rainchan607' //process.env['rainchan607']  //change it to environ variable later
const mongo_password = 'Ycy19980731' //process.env['Ycy19980731']
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
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })