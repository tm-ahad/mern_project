const express = require("express")
const app = express()
const { router } = require("./Routes/route");
const midWare = require("morgan")("dev");
const bodyParser = require("body-parser");
const path = require("path");
const JSON_ENV = require('./config/config.json');
const serve = require("http").createServer;
const { connectDB } = require("./config/db/connectDB");
const cors = require("cors");
const { customMiddleware } = require('./middlewares/custommiddleware')

console.log(JSON_ENV)
app.use(customMiddleware)
app.use(cors(JSON_ENV.CORS_CONFIG))
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "views")))

app.get("/", router)

serve(app).listen(JSON_ENV.PORT, JSON_ENV.HOST, () => {
    console.log(`Server is running at http://localhost:${JSON_ENV.PORT}`)
    connectDB()
        .then(() => console.log("DB Connected"))
        .catch(err => { throw err })
})