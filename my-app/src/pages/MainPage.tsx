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
import EuroRoundedIcon from '@mui/icons-material/EuroRounded';

interface mainPageProps {
	token?: string;
}

export class MainPage extends React.Component<mainPageProps> {
	public constructor(props: mainPageProps) {
		super(props);

	}

	public componentDidMount() {

	}

	public componentWillUnmount() {

	}


	public render() {
		return (
			<React.Fragment>
				<NavBar barText="Hi, Username"/>
				<Box sx={{ flexGrow: 1, width:'100%', height:'85vh'}}>
					<Grid container spacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={12} sm={6}>
							<Tile primaryText='Create a Survey' linkTo='/create' icon={<AssignmentRoundedIcon sx={{color: '#916BBF'}} fontSize='large'/>}/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Tile primaryText='Surveys History' linkTo='/history' icon={<HistoryEduRoundedIcon sx={{color: '#916BBF'}} fontSize='large'/>}/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Tile primaryText='Profile' linkTo={'/profile/' + this.props.token } icon={<AccountBoxRoundedIcon sx={{color: '#916BBF'}} fontSize='large'/>}/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Tile primaryText='Comming Soon...' linkTo={'/mainPage/' + this.props.token} icon={<EuroRoundedIcon sx={{color: '#916BBF'}} fontSize='large'/>}/>
						</Grid>
						<Grid item xs={12}>
							<Footer/>
						</Grid>
					</Grid>
				</Box>
			</React.Fragment>
		);
	}
}