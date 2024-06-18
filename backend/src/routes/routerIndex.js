const express = require('express')
const app = express()
const userRouter = require('./UserRouter')
const prescriptionRouter = require('./PrescriptionRouter')

const router = async() => {
    app.use('/user', userRouter)
    app.use('/prescription', prescriptionRouter)
}

module.exports = router;

