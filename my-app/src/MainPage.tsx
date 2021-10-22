import React from "react";
import { MainPageBar } from "./components/MainPageBar";

export class MainPage extends React.Component {
    public render() {
        return (
            <React.Fragment>
                <MainPageBar
                    barText='Hi, Username'
                />
            </React.Fragment>
        );
    }
}