import React from "react";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import './MainPage.css';
export class MainPage extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<NavBar barText="Hi, Pedale"/>
				<Footer/>
			</React.Fragment>
		);
	}
}