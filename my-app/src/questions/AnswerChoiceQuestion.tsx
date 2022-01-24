import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { AnswerMultiOption } from '../components/AnswerMultiOption';
import { AnswerSingleOption } from '../components/AnswerSingleOption';

interface AnswerChoiceQuestionProps {
	multi: boolean;
	questionId: string;
    questionValue: string;
	number: number;
    questionAnswers: string[];
	onChangeAnswer: (questionId: string, currentAnswers: string[]) => void;
}

interface AnswerChoiceQuestionState {
	content: string;
	respondentAnswers: string[];
	singleAnswerOptionValue: string;
}

export class AnswerChoiceQuestion extends React.Component<AnswerChoiceQuestionProps, AnswerChoiceQuestionState>{
	public constructor(props: AnswerChoiceQuestionProps) {
		super(props);

		this.state = {
			content: '',
			respondentAnswers: [],
			singleAnswerOptionValue: '',
		}
	}

	public render () {
		const {
			singleAnswerOptionValue,
		} = this.state;

		const {
			multi,
			number,
			questionValue,
		} = this.props;

        const renderOptions = this.props.questionAnswers.map((option, index) => {
			
			return (
				<React.Fragment>
					{multi &&
						<AnswerMultiOption
							key={index}
							optionNumber={index+1}
							content={option}
							onChangeAnswerOption={this.changeMultiAnswerOption}
						/>
					}
					{!multi &&
						<AnswerSingleOption
							key={index}
							optionNumber={index+1}
							content={option}
							value={singleAnswerOptionValue}
							onChangeAnswerOption={this.changeSingleAnswerOption}
						/>
					}
				</React.Fragment>
			)
		});

		return (
			<React.Fragment>
				<Card sx={{mt: '20px'}}>
					<CardContent style={{backgroundColor:'#E6E6FA'}}>
                        <Typography variant="h5" component="h5">
                           {number + '. ' + questionValue}
                        </Typography>
                        {renderOptions}
					</CardContent>
				</Card>
			</React.Fragment>
		);
	}

	private readonly changeMultiAnswerOption = (answer: string, checked: boolean) => {
		const {
			respondentAnswers,
		} = this.state;

		const answers = respondentAnswers;
	
		if (checked) {
			if (!respondentAnswers.includes(answer)) {
				answers.push(answer);
				this.setState({respondentAnswers: answers});
				this.props.onChangeAnswer(this.props.questionId, answers);
			}
		} else {
			if (respondentAnswers.includes(answer)) {
				const index = respondentAnswers.indexOf(answer);
				answers.splice(index, 1);
				this.setState({respondentAnswers: answers});
				this.props.onChangeAnswer(this.props.questionId, answers);
			}
		}
		
	}

	private readonly changeSingleAnswerOption = (event: React.ChangeEvent<HTMLInputElement>) => {
		const answers: string[] = [];
		answers.push(event.target.value);
		this.setState({respondentAnswers: answers, singleAnswerOptionValue: event.target.value});
		this.props.onChangeAnswer(this.props.questionId, answers);
	}
}