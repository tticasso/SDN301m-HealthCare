const express = require('express')
const bodyParser = require('body-parser')
const bannerController = require('../controllers/BannerController')
const bannerRouter = express.Router()

bannerRouter.use(bodyParser.json())
bannerRouter.post('/create', bannerController.createBanner)
bannerRouter.get('/all', bannerController.getAllBanner)
bannerRouter.put('/edit/:id', bannerController.editBanner)
bannerRouter.delete('/delete/:id', bannerController.deleteBanner)

module.exports = bannerRouter