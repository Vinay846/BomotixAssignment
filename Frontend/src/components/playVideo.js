import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import SideVideo from './sideVideo';


function PlayVideo() {
    let { id } = useParams();
    const [videoDetailes, setVideoDetailes] = useState({});

    useEffect(() => {
        fetch(`http://localhost:9999/details/${id}`)
            .then(r => r.json())
            .then(resp => {
                // console.log(resp);
                setVideoDetailes(resp);
            }).catch((err) => {
                console.log(err);
            })
    }, [id])

    return (
        <Container style={{ marginTop: "20px" }} maxWidth="xl">
            <Grid container spacing={1}>
                <Grid item xs={12} sm={8}>
                    <video id="videoPlayer" style={{ width: "100%" }} controls>
                        <source src={`http://localhost:9999/watch/${id}`} />
                    </video>
                    <Typography variant="h6">
                        {videoDetailes.fileName}
                    </Typography>
                    <Typography variant="subtitle1">
                        {videoDetailes.fileSize}
                    </Typography>
                    <Typography variant="subtitle2">{videoDetailes.duration}</Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <SideVideo />
                </Grid>
            </Grid>
        </Container>
    )
}

export default PlayVideo
