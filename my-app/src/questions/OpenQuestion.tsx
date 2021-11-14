import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';

interface OpenQuestionProps {
	placeholder?: string;
}

export class OpenQuestion extends React.Component<OpenQuestionProps>{
	public constructor(props: OpenQuestionProps){
		super(props);
	}

	public render () {
		const {
			placeholder,
		} = this.props;
		return (
			<React.Fragment>
				<Card>
					<CardContent style={{backgroundColor:'#E6E6FA'}}>
						<TextField
							id='question'
							label='Question'
							placeholder={placeholder}
							multiline
							fullWidth			
						/>
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}
}