import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';

export class OpenQuestion extends React.Component{
	public render () {
		return (
			<React.Fragment>
				<Card>
					<CardContent style={{backgroundColor:'#F8F8F8'}}>
						<TextField
							id='question'
							label='Question'
							placeholder='e.g. What do you think about zmitac?'
							multiline
							fullWidth			
						/>
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}
}