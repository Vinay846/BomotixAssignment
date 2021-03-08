import React from 'react';
import './index.css';
import { Grid, Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },

}));



function VideoList(props) {
    const classes = useStyles();
    // console.log(props);

    const openVideo = (videoId, data) => {
        console.log(videoId);
        window.location.href="/watch/" + videoId;
        // history.push("/watch/" + videoId);
    }


    return (
        <div className={classes.root}>
            <Container style={{marginTop: "10px"}} maxWidth="lg">
                <Grid container spacing={3}>
                    {props.datas.map((data, idx) => (
                        <Grid key={idx} item xs={12} sm={3} >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="180"
                                    image={`http://localhost:9999/${data.thumbnail}`}
                                    onClick={() => openVideo(data.videoId, data)}
                                />
                                <CardContent>
                                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", width: '11rem' }}>
                                        <Typography variant="subtitle2" gutterBottom>{data.fileName}</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">{data.fileSize}</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">{data.duration}</Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default VideoList
