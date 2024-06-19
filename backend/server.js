const express = require('express')
const DBconnect = require('./src/config/dbConfig')
const bodyParser = require('body-parser')
const httpErrors = require('http-errors')
const morgan = require('morgan')
const router = require('./src/routes/routerIndex')
const userRouter = require('./src/routes/UserRouter')
const bannerRouter = require('./src/routes/BannerRouter')
const prescriptionRouter = require('./src/routes/PrescriptionRouter')
const cors = require('cors')
const medicalRecordRouter = require('./src/routes/MedicalRecordRouter')
const hospitalRouter = require('./src/routes/HospitalRouter')

require('dotenv').config()
const app = express()
var corsOptions = {
    origin: "http://localhost:9999"
  };
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors(corsOptions))

//router


app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Welcome to HealthCare"
    })
})
app.use('/user', userRouter);
app.use('/user/medical-record', medicalRecordRouter)
app.use('/doctor/medical-record', medicalRecordRouter)
app.use('/banner', bannerRouter)
app.use('/hospital', hospitalRouter)
router();
app.use('/user', userRouter)
app.use('/prescription', prescriptionRouter)
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