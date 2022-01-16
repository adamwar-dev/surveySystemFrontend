import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField, Typography } from '@mui/material';

interface AnswerOpenQuestionProps {
	questionId: string;
    questionValue: string;
	number: number;
	onChangeAnswer: (questionId: string, currentAnswers: string[]) => void;
}

interface AnswerOpenQuestionState {
	content: string;
	respondentAnswers: string;
}

export class AnswerOpenQuestion extends React.Component<AnswerOpenQuestionProps, AnswerOpenQuestionState>{
	public constructor(props: AnswerOpenQuestionProps) {
		super(props);

		this.state = {
			content: '',
			respondentAnswers: '',
		}
	}

	public render () {
		const {
			number,
			questionValue,
		} = this.props;

		const {
			content,
		} = this.state;

		return (
			<React.Fragment>
				<Card sx={{mt: '20px'}}>
					<CardContent style={{backgroundColor:'#E6E6FA'}}>
                        <Typography variant="h5" component="h5">
                           {number + '. ' + questionValue}
                        </Typography>
                        <TextField
							id='question'
							label='Answer'
							multiline
							fullWidth
							value={content}
							onChange={this.handleAnswerChange}			
						/>
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}

	private readonly handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({content: event.currentTarget.value});
		const answers: string[] = [];
		answers.push(event.currentTarget.value);
		this.props.onChangeAnswer(this.props.questionId, answers);
	}
}