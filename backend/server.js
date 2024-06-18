const express = require('express')
const DBconnect = require('./src/config/dbConfig')
const bodyParser = require('body-parser')
const httpErrors = require('http-errors')
const morgan = require('morgan')
const userRouter = require('./src/routes/UserRouter')
const bannerRouter = require('./src/routes/BannerRouter')

require('dotenv').config()
const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))

//router


app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to HealthCare"
    })
})
app.use('/user', userRouter);
app.use('/banner', bannerRouter)
DBconnect();

app.use(async (req, res, next) => {
    next(httpErrors.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        "error": {
            "status": err.status || 500,
            "message": err.message
        }
    })
})


app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Serser is running port: http://${process.env.HOST_NAME}:${process.env.PORT}`);
})