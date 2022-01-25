import {Box, Card, CardContent, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { NavBar } from '../../components/NavBar';
import { SurveyDataProvider } from '../../data/SurveyDataProvider';
import { QuestionData } from '../../questions/Question';
import { SurveyData } from './HistorySurvey';
import {ColoredLine} from "../../components/Utils";

interface SurveyQuestion extends QuestionData {
	RespondentsAnswers: string[];
}

interface PreviewSurveyProps {
	userToken?: string;
	surveyToken?: string;
}

interface PreviewSurveyState extends SurveyData {
	questions: SurveyQuestion[];
}

export class PreviewSurvey extends React.Component<PreviewSurveyProps, PreviewSurveyState> {
	public constructor(props: PreviewSurveyProps) {
		super(props);

		this.state = {
			id: '',
			title: '',
			type: '',
			questions: [],
		}
	}

	public componentDidMount () {
		return SurveyDataProvider.getSingleSurvey(this.props.userToken!, this.props.surveyToken!)
		.then(survey => {
			this.setState({
				id: survey._id,
				title: survey.Title,
				type: survey.Type,
				questions: [],
			})
			survey.Questions.forEach((questionData: any) => {
				const question: SurveyQuestion = questionData;
				this.setState(previousState => ({
					questions: [...previousState.questions, question]}));
			});
			console.log(this.state.questions);
		});
	}

	public render () {
		const renderQuestions = this.state.questions.map((question, index) => {
			if(question.Type !== 'Open') {
				const questionAnswers = question.QuestionAnswers.map((questionAnswer, index) => {
					let singleOrMultiNumber = 0;
					question.RespondentsAnswers.forEach((respondentAnswer) => {
						if (respondentAnswer === questionAnswer) {
							singleOrMultiNumber++;
						} 
					});
					const singleOrMultiPrecent = Math.round(singleOrMultiNumber/question.RespondentsAnswers.length * 100 * 100) / 100;
					return(
					<React.Fragment>
						<TextField
							disabled
							multiline
							fullWidth
							value={index + 1 + '. ' + questionAnswer}
							sx = {{color: '#D8BFD8', ".MuiInputBase-input.Mui-disabled": {
								WebkitTextFillColor: "black",
							}}}
						/>
						<Typography
							color="text.primary"
							align='center'
							paragraph
							variant='h5'
							component='div'
							sx={{ flexGrow: 1 }}
						>
							{'Total answers: ' + singleOrMultiNumber}
						</Typography>
						<Typography
							color="text.primary"
							align='center'
							paragraph
							variant='h5'
							component='div'
							sx={{ flexGrow: 1 }}
						>
							{'Percent: ' + singleOrMultiPrecent + '%'}
						</Typography>
					</React.Fragment>
					)
				});
				return (
					<Box mt={5}>
					<Card sx={{ml: '30px', mr: '30px'}}>
						<CardContent>
							<Box  sx={{ borderRadius: 2 }}>
							<Typography
								color="text.primary"
								align='center'
								paragraph
								variant='h5'
								component='div'
								sx={{ flexGrow: 1 }}
							>
								{index + 1 + '. ' + question.Content}
							</Typography>
							</Box>
							{ColoredLine('#d0b3ff')}
							{questionAnswers}
						</CardContent>
					</Card>
					</Box>
				)
			} else {
				const questionAnswers = question.RespondentsAnswers.map((answer, index) => {
					return(
						<TextField
							disabled
							multiline
							fullWidth
							value={index + 1 + '. ' + answer}
							sx = {{color: '#D8BFD8', ".MuiInputBase-input.Mui-disabled": {
								WebkitTextFillColor: "black",
							}}}
						/>
					)
				});
				return (
					<Box mt={5}>
					<Card sx={{ml: '30px', mr: '30px'}}>
						<CardContent>
							<Box  sx={{ borderRadius: 2 }}>
							<Typography
								color="text.primary"
								align='center'
								paragraph
								variant='h5'
								component='div'
								sx={{ flexGrow: 1 }}
							>
								{index + 1 + '. ' + question.Content}
							</Typography>
							</Box>
							{ColoredLine('#d0b3ff')}
							{questionAnswers}
						</CardContent>
					</Card>
					</Box>
				)
			}
			
		});

		return (
			<React.Fragment>
				<NavBar backArrowVisable={true} barText={'History'} linkTo={'/history/' + this.props.userToken!}/>
				<Box mt={{mb: '200px', mt:'200px'}}>
				<Card sx={{ml: '30px', mr: '30px'}}>
					<CardContent>
						<Typography
							color="text.primary"
							align='center'
							paragraph
							variant='h5'
							component='div'
							sx={{ flexGrow: 1 }}
						>
							{this.state.title}
						</Typography>
					</CardContent>
				</Card>
				</Box>
				{renderQuestions}
			</React.Fragment>
		);
	}


}
