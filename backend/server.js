const express = require('express')
const DBconnect = require('./src/config/dbConfig')
const bodyParser = require('body-parser')
const httpErrors = require('http-errors')
const morgan = require('morgan')

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


DBconnect();

app.use(async (req, res, next) => {
    next(httpErrors.NotFound())
})

app.use((req, res, next) => {
    res.status(404).json({ message: 'Không tìm thấy' });
});


app.listen(process.env.PORT, process.env.HOST_NAME, () => {
    console.log(`Serser is running port: http://${process.env.HOST_NAME}:${process.env.PORT}`);
})