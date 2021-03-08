const express = require('express');
const { videoModel } = require('./model/model');
const app = express();
const multer = require('multer');
app.use(express.json());
const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');
const fs = require('fs');

app.use(cors({
    origin: "http://localhost:3000"
}))


const makeid = async () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


ffmpeg.setFfmpegPath('C://PATH//ffmpeg.exe');
ffmpeg.setFfprobePath("C://PATH//ffprobe.exe");
ffmpeg.setFlvtoolPath("C://PATH//ffplay.exe");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));


app.post("/uploads", upload.single('file'), async (req, res) => {

    let videoId = await makeid();
    const exstingVideoId = await videoModel.find({ videoId })
    while (exstingVideoId == videoId) {
        videoId = makeid();
    }

    // console.log(req.file);
    let fileDuration = "";

    let thumbsFilePath = "";

    ffmpeg(req.file.path)
        .on('filenames', function (filenames) {
            // console.log("will generate " + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            // console.log('screen shot taken');
            // console.log(thumbsFilePath);
            thumbsFilePath = thumbsFilePath;
            // return res.send({ success: true })
        })
        .screenshots({
            count: 1,
            folder: 'uploads/thumbnails',
            size: '320x240',
            filename: 'thumbnail-%b.png'
        })

    ffmpeg.ffprobe(req.file.path, function (err, metadata) {
        // console.dir(metadata);
        // console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
        const newVideo = {
            fileName: req.file.originalname,
            filePath: req.file.path,
            videoId,
            duration: (parseFloat(fileDuration)/60).toFixed(2) + " Min",
            fileSize: (parseFloat(req.file.size) / 1000000).toFixed(2) + " MB"
        }
        const video = new videoModel(newVideo);
        video.save((err, video) => {
            if (err) {
                return res.status(400).send({ success: false, err })
            }
            video.thumbnail = thumbsFilePath;
            video.save();
            return res.status(200).send({ success: true, videoInfo: video });
        });
    });

})

app.get('/videolist', async (req, res) => {
    const list = await videoModel.find({});
    res.send(list);

})

app.get('/watch/:id', async (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }

    const videoId = req.params.id;
    const videoPath = await videoModel.findOne({ videoId });
    const path = videoPath.filePath;

    // const path = "C://Users//Arhan Shekhar//Desktop//BOMOTIX//boilerplate-code//uploads//1615097139329_Aank_ Marey_(Simmba)_FUll_HD(bossmobi).mp4";
    // const path = "uploads/1615105272955_Aank__Marey_(Simmba)_FUll_HD(bossmobi).mp4";

    try {
        if (fs.existsSync(path)) {
            console.log("The file exists.");
        } else {
            console.log('The file does not exist.');
        }
    } catch (err) {
        console.error(err);
    }




    const videoSize = fs.statSync(path).size;
    const chunk_size = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + chunk_size, videoSize - 1);

    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start} -${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(path, { start, end });
    videoStream.pipe(res)
})


app.get('/details/:vid',async (req, res)=> {
    const videoId = req.params.vid;
    try {
        const videoDetails = await videoModel.findOne({videoId});
        // console.log(videoDetails);
        res.send(videoDetails);
        
    } catch (error) {
        res.sendStatus(400);
    }
})






module.exports = app;