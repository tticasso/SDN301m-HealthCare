const bannerService = require("../services/BannerService")


async function createBanner(req, res, next) {
    try {
        const { imgUrl, title } = req.body;
        const newDoc = await bannerService.createBanner({ imgUrl, title });
        res.status(201).json(newDoc);
    } catch (error) {
        next(error);
    }
}

async function getAllBanner(req, res, next) {
    try {
        const banners = await bannerService.getAllBanner();
        res.json(banners);
    } catch (error) {
        next(error);
    }
}

async function editBanner(req, res, next) {
    try {
        if (req.params.id) {
            const updatedBanner = await bannerService.editBanner(req.params.id, req.body);
            res.status(200).json(updatedBanner);
        }
    } catch (error) {
        next(error);
    }
}

async function deleteBanner(req, res, next) {
    try {
        if (req.params.id) {
            await bannerService.deleteBanner(req.params.id);
            res.status(200).json({
                "message": `Delete banner with id: ${req.params.id} successful`
            });
        }
    } catch (error) {
        next(error);
    }
}

const bannerController = {
    createBanner,
    getAllBanner,
    editBanner,
    deleteBanner
}

module.exports = bannerController