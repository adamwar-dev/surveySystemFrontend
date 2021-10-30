import * as React from 'react';
import Typography from '@mui/material/Typography';
import './Components.css'

export class Footer extends React.Component{
	public render () {
		return (
			<div className='Footer'>
				<Typography
					variant='subtitle1'
				>
					{'IOIO Team 2021 © All Rights Reserved'}
				</Typography>
			</div>
		);
	}
}