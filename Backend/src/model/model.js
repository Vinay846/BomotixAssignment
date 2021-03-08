const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    fileName: {
        type: String
    },
    thumbnail: {
        type: String
    },
    duration: {
        type: String
    },
    filePath: {
        type: String
    },
    videoId: {
        type: String
    },
    fileSize: {
        type: String
    }
})

const videoModel = mongoose.model("video", videoSchema);


module.exports = {
    videoModel: videoModel
}