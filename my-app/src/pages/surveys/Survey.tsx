import {Box, Button, Card, CardContent, TextField } from '@mui/material';
import * as React from 'react';
import { NavBar } from '../../components/NavBar';
import { Question, QuestionData, QuestionProps } from '../../questions/Question';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { SurveyDataProvider } from '../../data/SurveyDataProvider';
import { Redirect } from 'react-router-dom';

interface SurveyProps {
	surveyType: string;
	token: string;
}

interface SurveyState {
	title: string;
	tokens: string;
	numberOfTokens?: number;
	questions: QuestionProps[];
	questionsData: QuestionData[];
	redirectToHistory: boolean;
	status?: number;
}

export class Survey extends React.Component<SurveyProps, SurveyState> {
	public constructor(props: SurveyProps) {
		super(props);

		this.state = {
			tokens: '',
			title: '',
			questions: [],
			questionsData: [],
			redirectToHistory: false,
			status: undefined,
		}
	}

	public render () {
		const {
			surveyType,
			token,
		} = this.props;

		const {
			title,
			tokens,
			redirectToHistory,
			status,
		} = this.state;

		const renderQuestion = this.state.questions.map((question, index) => {
			return (
				<Question 
					key={index}
					numberOfQuestion={index}
					OnDeleteClick={question.OnDeleteClick}
					handleQuestionChange={question.handleQuestionChange}
				/>
			)
		});
	
		return (
			<React.Fragment>
                <NavBar 
					backArrowVisable={true}
					barText={surveyType === 'public' ?
						'Public Survey' :
						surveyType === 'private' ?
							'Private Survey' :
							'Distributed Survey'
					}
					linkTo={'/create/' + this.props.token}
				/>
				<Box
					sx={{mx: '40px', textAlign: 'center'}}
				>
				<Card>
					<CardContent style={{backgroundColor: '#DDA0DD'}}>
						<TextField
							id='title'
							label='Title'
							placeholder='Brief title of the survey'
							multiline
							fullWidth
							value={title}
							onChange={this.handleTitleChange}			
						/>
					</CardContent>
				</Card>
				{surveyType === 'distributed' &&
					<Card>
						<CardContent style={{backgroundColor: '#DDA0DD'}}>
							<TextField
								id='Tokens'
								label='Tokens'
								placeholder='e.g. 100'
								multiline
								fullWidth
								value={tokens}
								onChange={this.handleTokensChange}			
							/>
						</CardContent>
					</Card>
				}
				{renderQuestion}
				<Box
					sx={{mx: '120px', textAlign: 'center'}}
				>
				<Button 
					variant="contained"
					fullWidth
					sx={{mt: '10px', textAlign: 'center'}}
					style={{backgroundColor:'#DDA0DD'}}
					startIcon={<AddCircleRoundedIcon/>}
					onClick={this.questionAddClick}
				/>
				</Box>
				<Box textAlign='center'>
				<Button 
					variant="contained"
					fullWidth
					sx={{mt: '30px', textAlign: 'center'}}
					style={{backgroundColor:'#916BBF', maxWidth: '240px'}}
					onClick={this.sendData}
				>
				{'Send'}
				</Button>
				{redirectToHistory ? (<Redirect push to={'/history/' + token + '/' + status}/>) : null}
				</Box>
				</Box>
            </React.Fragment>
		);
	}

	private readonly handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({title: event.currentTarget.value});
	}

	private readonly handleTokensChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({tokens: event.currentTarget.value});
	}

	private readonly handleQuestionAdd = () => {
		const questionData: QuestionData = {
			Content: '',
			Type: 'Open',
			QuestionAnswers: [],
		}
		this.setState(previousState => ({
			questionsData: [...previousState.questionsData, questionData]
			})
		);
	}

	private readonly handleQuestionChange = (numberOfOption: number, updatedQuestion: QuestionData) => {
		const {
			questionsData,
		} = this.state;
		const updatedQuestions = questionsData.map((question, index) => {
			return numberOfOption !== index ? question : updatedQuestion;
		});
		this.setState({questionsData: updatedQuestions});
	}

	private readonly handleQuestionDelete = (numberOfQuestion: number) => {
		const {
			questionsData,
		} = this.state;
		const updatedQuestions: QuestionData[] = [];
		questionsData.forEach((question, index) => {
			if(index !== numberOfQuestion) {
				updatedQuestions.push(question);
			}
		});
		this.setState({questionsData: updatedQuestions});
	}

	private readonly questionAddClick = () => {
		const question: QuestionProps = {
			numberOfQuestion: this.state.questions.length,
			OnDeleteClick: this.questionDeleteClick,
			handleQuestionChange: this.handleQuestionChange,
		}
		this.setState({questions: [...this.state.questions, question]});
		this.handleQuestionAdd();
	}
	
	private readonly questionDeleteClick = (numberOfQuestion: number) => {
		const {
			questions,
		} = this.state;
		const updatedQuestions: QuestionProps[] = [];
		questions.forEach((question, index) => {
			if(index !== numberOfQuestion) {
				updatedQuestions.push(question);
			}
		});
		this.setState({questions: updatedQuestions});
		this.handleQuestionDelete(numberOfQuestion);
	}

	private readonly sendData = () => {
		const surveyData = {
			title: this.state.title,
			creatorId: this.props.token,
			surveyType: this.props.surveyType,
			tokens: Number(this.state.tokens),
			questions: this.state.questionsData,
		}
		console.log(surveyData);
		if (surveyData.surveyType === 'public') {
			SurveyDataProvider.createPublicSurvey(surveyData)
			.then(status => {
				this.setState({redirectToHistory: true, status: status});
			});
		} else if (surveyData.surveyType === 'private') {
			SurveyDataProvider.createPrivateSurvey(surveyData)
			.then(status => {
				this.setState({redirectToHistory: true, status: status});
			});
		} else {
			SurveyDataProvider.createDistributedSurvey(surveyData)
			.then(status => {
				this.setState({redirectToHistory: true, status: status});
			});
		}
	}
}