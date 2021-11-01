import React from 'react';
import { NavBar } from '../components/NavBar';
import { Footer } from '../components/Footer';
import { Tile } from '../components/Tile';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import '../styles/MainPage.css';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import HistoryEduRoundedIcon from '@mui/icons-material/HistoryEduRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

export class MainPage extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<NavBar barText="Hi, Pedale"/>
				<Box sx={{ flexGrow: 1, width:'80%'}}>
					<Grid container spacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={12} sm={6}>
							<Tile primaryText='Create a Survey' linkTo='' icon={<AssignmentRoundedIcon fontSize='large'/>}/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Tile primaryText='Surveys History' linkTo='' icon={<HistoryEduRoundedIcon fontSize='large'/>}/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Tile primaryText='Profile' linkTo='' icon={<AccountBoxRoundedIcon fontSize='large'/>}/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Tile primaryText='' linkTo=''/>
						</Grid>
					</Grid>
				</Box>
				<Footer/>
			</React.Fragment>
		);
	}
}