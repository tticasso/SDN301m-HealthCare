const Banner = require("../models/BannerModels")


async function createBanner({ imgUrl, title }) {
    const banner = new Banner({
        imgUrl,
        title
    });
    try {
        const newDoc = await banner.save();
        return newDoc;
    } catch (error) {
        throw error;
    }
}

async function getAllBanner() {
    try {
        return await Banner.find();
    } catch (error) {
        throw error;
    }
}

async function editBanner(id, updateData) {
    try {
        await Banner.findByIdAndUpdate(id, updateData);
        return await Banner.findById(id);
    } catch (error) {
        throw error;
    }
}

async function deleteBanner(id) {
    try {
        await Banner.findByIdAndDelete(id);
    } catch (error) {
        throw error;
    }
}
const bannerService = {
    createBanner,
    getAllBanner,
    editBanner,
    deleteBanner
}

module.exports = bannerService