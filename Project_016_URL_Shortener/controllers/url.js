const shortid = require('shortid');
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if(!body.url){
        return res.status(400).json({ error: "URL is required" });
    }

    const existingUrl = await URL.findOne({ redirectURL: body.url, createdBy: req.user._id });
    
    if(existingUrl){
        return res.redirect('/?id=' + existingUrl.shortId);
    }

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    
    return res.redirect('/?id=' + shortID);
}

async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory,
        redirectURL: result.redirectURL
    });
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
};