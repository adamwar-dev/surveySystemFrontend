import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField } from '@mui/material';

interface OpenQuestionProps {
	placeholder?: string;
	onChangeContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
	questionContent: string;
}

interface OpenQuestionState {
	content: string;
}

export class OpenQuestion extends React.Component<OpenQuestionProps, OpenQuestionState>{
	public constructor(props: OpenQuestionProps){
		super(props);

		this.state = {
			content: '',
		}
	}

	public render () {
		const {
			questionContent,
			placeholder,
		} = this.props;

		const {
			content,
		} = this.state;
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
							value={questionContent}
							onChange={this.handleContentChange}			
						/>
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}

	private readonly handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({content: event.currentTarget.value});
		this.props.onChangeContent(event);
	}
}