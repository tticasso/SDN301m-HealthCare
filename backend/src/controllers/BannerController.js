const Banner = require("../models/BannerModels")


async function createBanner (req, res, next){
    try {
        const createdBanner = new Banner({
            imgUrl: req.body.imgUrl,
            title: req.body.title
        })
        await createdBanner.save()
            .then(newDoc => res.status(201).json(newDoc))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }
} 

async function getAllBanner (req, res, next){
    const banner = await Banner.find()
    res.json(banner)
}

async function editBanner (req, res, next){
    try {
        if(req.params.id){
            await Banner.findByIdAndUpdate(
                req.params.id,
                req.body
            )
            res.status(200).json(await Banner.findById({_id: req.params.id}))
        }
    } catch (error) {
        next(error)
    }
}

async function deleteBanner (req, res, next){
    try {
        if(req.params.id){
            await Banner.findByIdAndDelete(req.params.id)
            res.status(200).json({
                "message": `Delete banner with id: ${req.params.id} successful`
            })
        }
    } catch (error) {
        next(error)
    }
}
const bannerController = {
    createBanner,
    getAllBanner,
    editBanner,
    deleteBanner
}

module.exports = bannerController