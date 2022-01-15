import { Box, Grid } from '@mui/material';
import * as React from 'react';
import { NavBar } from '../../components/NavBar';
import { Tile } from '../../components/Tile';
import PublicRoundedIcon from '@mui/icons-material/PublicRounded';
import PublicOffRoundedIcon from '@mui/icons-material/PublicOffRounded';
import SupervisorAccountRoundedIcon from '@mui/icons-material/SupervisorAccountRounded';

interface CreateSurveyProps {
	token?: string;
}
export class CreateSurvey extends React.Component<CreateSurveyProps>{
	public constructor(props: CreateSurveyProps) {
		super(props);
	}

	public render () {
		return (
			<React.Fragment>
                <NavBar backArrowVisable={true} barText={'Create a Survey'} linkTo={'/mainPage/' + this.props.token}/>
				<Box sx={{ flexGrow: 1, width:'100%', height:'85vh'}}>
					<Grid container spacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mb:'30px'}}>
						<Grid item xs={12} sm={6} md={4}>
							<Tile primaryText='Public Survey' linkTo={'/survey/public/' + this.props.token} icon={<PublicRoundedIcon sx={{color: '#916BBF'}} fontSize={'large'}/>}/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Tile primaryText='Private Survey' linkTo={'/survey/private/' + this.props.token} icon={<PublicOffRoundedIcon sx={{color: '#916BBF'}} fontSize={'large'}/>}/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<Tile primaryText='Distributed Survey' linkTo={'/survey/distributed/' + this.props.token} icon={<SupervisorAccountRoundedIcon sx={{color: '#916BBF'}} fontSize={'large'}/>}/>
						</Grid>
					</Grid>
				</Box>
            </React.Fragment>
		);
	}
}