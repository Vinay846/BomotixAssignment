import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';


function SideVideo() {
    const [lists, setLists] = useState([]);

    const openVideo = (videoId, data) => {
        // console.log(videoId);
        window.location.href="/watch/" + videoId;
        // history.push("/watch/" + videoId);
    }


    useEffect(() => {
        fetch('http://localhost:9999/videolist')
            .then(r => r.json())
            .then(resp => {
                // console.log(resp);
                setLists(resp);
                // thumbnail calling 
            })
            .catch(err => {
                console.log("error ", err);
            })
    }, [])

    return (
        <div>
            {lists.map((item, idx) => (
                <Grid key={idx} container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <CardMedia
                            component="img"
                            height="180"
                            image={`http://localhost:9999/${item.thumbnail}`}
                            onClick={() => openVideo(item.videoId, item)}
                        />
                    </Grid>
                    <Grid item xs >
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '11rem' }}>
                            <Typography variant="subtitle2" gutterBottom>{item.fileName}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{item.fileSize}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{item.duration}</Typography>
                        </div>
                    </Grid>
                </Grid>
            ))}
        </div>

    )
}

export default SideVideo
