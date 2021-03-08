import React, { useState, useEffect } from 'react';
import VideoList from './videoList';
import { Paper } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



function Home() {
    const [file, setFile] = useState();
    const [datas, setDatas] = useState([]);
    const [name, setName] = useState("Upload File");

    // console.log(file);
    
    const handlefile=(e)=> {
        setFile(e.target.files[0])
        setName(e.target.files[0].name.substring(0,35));
    }

    const send = e => {
        //make api call
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://localhost:9999/uploads', {
            method: "POST",
            body: formData
        })
            .then(r => r.json())
            .then(resp => {
                console.log(resp);
                fetchData();
                setFile(null);
                setName("Upload File");
                window.location.href="/";
            })
            .catch(err => {
                console.log("error ", err);
            })
    }

    const fetchData = () => {
        fetch('http://localhost:9999/videolist')
            .then(r => r.json())
            .then(resp => {
                // console.log(resp);
                setDatas(resp);
                // thumbnail calling 
            })
            .catch(err => {
                console.log("error ", err);
            })
    }


    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <Paper style={{ padding: "25px" }}>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-start"
                >
                    <Button onChange={handlefile} variant="contained" component="label">
                        {name}
                        <input type="file" hidden />
                    </Button>
                    <Button onClick={send} variant="contained">Add</Button>
                </Grid>
            </Paper>
            <VideoList datas={datas} />
        </>
    )
}

export default Home
