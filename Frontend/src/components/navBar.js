import React from 'react';
import { Paper, Button } from "@material-ui/core";
import SvgIcon from '@material-ui/core/SvgIcon';
import { useHistory } from "react-router-dom";

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </SvgIcon>
    );
}

function Home() {
    let history = useHistory();

    const home=()=> {
        history.push('/');
    }
    return (
        <>
            <Paper style={{ padding: "25px" }}>
                <Button onClick={home}><HomeIcon /></Button>
            </Paper>
        </>
    )
}

export default Home
