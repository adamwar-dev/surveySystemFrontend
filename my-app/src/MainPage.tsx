import React from "react";
import { MainPageBar } from "./components/MainPageBar";
import BasicCard from "./components/BasicCard";
import Grid from "@mui/material/Grid";
import './MainPage.css';

export class MainPage extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <MainPageBar
                    barText='Hi, Username'
                />
                <div className="GridPadding">
                    <Grid container rowSpacing={8} columnSpacing={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={6}>
                            <BasicCard/>
                        </Grid>
                        <Grid item xs={6}>
                            <BasicCard/>    
                        </Grid>
                        <Grid item xs={6}>
                            <BasicCard/>
                        </Grid>
                        <Grid item xs={6}>
                            <BasicCard/>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}