import { Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { NavBar } from '../../components/NavBar';
import { SurveyDataProvider } from '../../data/SurveyDataProvider';
import { QuestionData } from '../../questions/Question';
import { SurveyData } from './HistorySurvey';

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
			const questionAnswers = question.RespondentsAnswers.map((answer, index) => {
				return(
				<Typography
					color="text.primary"
					align='center'
					paragraph
					variant='h5'
					component='div'
					sx={{ flexGrow: 1 }}
					>
					{index + 1 + '. ' + answer}
				</Typography>
				)
			});
			return (
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
							{index + 1 + '. ' + question.Content}
						</Typography>
						{questionAnswers}
					</CardContent>
				</Card>
			)
		});

		return (
			<React.Fragment>
				<NavBar backArrowVisable={true} barText={'History'} linkTo={'/history/' + this.props.userToken!}/>
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
				{renderQuestions}
			</React.Fragment>
		);
	}
}