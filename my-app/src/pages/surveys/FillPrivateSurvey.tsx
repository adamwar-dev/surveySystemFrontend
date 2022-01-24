import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Footer } from '../../components/Footer';
import { QuestionsAnswers, SurveyDataProvider } from '../../data/SurveyDataProvider';
import { AnswerChoiceQuestion } from '../../questions/AnswerChoiceQuestion';
import { AnswerOpenQuestion } from '../../questions/AnswerOpenQuestion';
import { FillPublicProps, FillPublicSurveyState, QuestionToAnswer } from './FillPublicSurvey';

interface FillPrivateProps extends FillPublicProps {
	token: string;
}

interface FillPrivateSurveyState extends FillPublicSurveyState {
}

export class FillPrivateSurvey extends React.Component<FillPrivateProps, FillPrivateSurveyState> {
	public constructor(props: FillPrivateProps) {
		super(props);

		this.state = {
			title: '',
			type: '',
			questions: [],
			redirectToFinalPage: false,
		}
	}

	public componentDidMount () {
		return SurveyDataProvider.getPrivateSurvey(this.props.surveyId, this.props.token)
		.then(survey => {
			this.setState({
			title: survey.Title,
			type: survey.Type,
			});
			survey.Questions.forEach((questionData: any) => {
				const question: QuestionToAnswer = {
					id: questionData._id,
					type: questionData.Type,
					content: questionData.Content,
					questionAnswers: questionData.QuestionAnswers,
					number: survey.Questions.indexOf(questionData) + 1,
					currentAnswers: [],
				}
				this.setState(previousState => ({
					questions: [...previousState.questions, question],
				}));
			});
		});
	}

	public render () {
		const renderQuestions = this.state.questions.map((question, index) => {
			return (
				<React.Fragment>
					{question.type === 'Open' &&
						<AnswerOpenQuestion
							key={index}
							questionId={question.id}
							questionValue={question.content}
							onChangeAnswer={this.handleQuestionAnswerChange}
							number={question.number}
						/>
					}
					{question.type === 'OneChoice' &&
						<AnswerChoiceQuestion
							multi={false}
							key={index}
							questionId={question.id}
							questionValue={question.content}
							questionAnswers={question.questionAnswers}
							onChangeAnswer={this.handleQuestionAnswerChange}
							number={question.number}
						/>
					}
					{question.type === 'MultipleChoice' &&
						<AnswerChoiceQuestion
							multi={true}
							key={index}
							questionId={question.id}
							questionValue={question.content}
							questionAnswers={question.questionAnswers}
							onChangeAnswer={this.handleQuestionAnswerChange}
							number={question.number}
						/>
					}
				</React.Fragment>
			)
		});

		const {
			title,
			redirectToFinalPage,
			status,
		} = this.state;

		const {
			surveyId,
		} = this.props;
		return (
			<React.Fragment>
				<Box textAlign='center'>
					<Card>
						<CardContent style={{backgroundColor:'#E6E6FA'}}>
						<Typography variant="h5" component="h5">
								{'Survey id: ' + surveyId}
							</Typography>
							<Typography variant="h5" component="h5">
								{'Title: '+ title}
							</Typography>
						</CardContent>
					</Card>
					{renderQuestions}
					<Button
						variant="contained"
						fullWidth
						sx={{mt: '30px', textAlign: 'center'}}
						style={{backgroundColor:'#916BBF', maxWidth: '240px'}}
						onClick={this.sendAnswers}
					>
					{'Send'}
					</Button>
					{redirectToFinalPage ? (<Redirect push to={'/finalPage/' + status }/>) : null}
				</Box>
				<Footer/>
			</React.Fragment>
		);
	}

	private readonly handleQuestionAnswerChange = (questionId: string, currentAnswers: string[]) => {
		const {
			questions,
		} = this.state;

		console.log(currentAnswers);
		const updatedQuestions = questions.map((question) => {
			const updatedQuestion: QuestionToAnswer = {
				id: question.id,
				type: question.type,
				content: question.content,
				questionAnswers: question.questionAnswers,
				currentAnswers: currentAnswers,
				number: question.number,
			}
			return questionId !== question.id ? question : updatedQuestion;
		});
		this.setState({questions: updatedQuestions});
	}

	private readonly sendAnswers = () => {
		const questionsAnswers: QuestionsAnswers[] = [];
		this.state.questions.forEach(question => {
			const questionAnswers: QuestionsAnswers = {
				questionId: question.id,
				Answers: question.currentAnswers,
			}
			questionsAnswers.push(questionAnswers);
		})
		return SurveyDataProvider.answerPrivateSurvey(this.props.surveyId, questionsAnswers, this.props.token)
		.then(status => {
			this.setState({redirectToFinalPage: true, status: status !== '' ? status : 'error'});
		});
	}
}