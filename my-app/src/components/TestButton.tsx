import React from 'react';
import { Button } from "@mui/material";
import '../App.css'

export class TestButton extends React.Component {
	public render () {
		return (
			<Button variant="text" color='error'>Text</Button>
		);
	}
}