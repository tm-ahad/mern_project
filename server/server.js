const app = require("express")()
const { config: configENV } = require("dotenv")
const { router } = require("./Routes/route")
const midWare = require("morgan")("dev")
const bodyParser = require("body-parser")
const { default: mongoose } = require("mongoose")

const [PORT, DB_URL, DB_CONFIG] = [
    8080,
    "mongodb://localhost:27017/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "CRUD_DB",
    }
]

configENV({
    path: `../Environment.env`
})

app.use(midWare)
app.use(bodyParser.json())

app.get("/", router)
//listen the server at port 8080
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
    
    mongoose.connect(DB_URL, DB_CONFIG)
        .then(() => console.log("DB Connected"))
        .catch(err => { throw err })
})