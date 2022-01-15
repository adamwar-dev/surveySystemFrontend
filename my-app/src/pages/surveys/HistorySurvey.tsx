import * as React from 'react';
import { NavBar } from '../../components/NavBar';
import { SurveyInHistory } from '../../components/SurveyInHistory';
import { SurveyDataProvider } from '../../data/SurveyDataProvider';
import { QuestionData } from '../../questions/Question';

interface SurveyData {
	id: string;
	type: string;
	title: string;
	surveyQuestions: SurveyQuestions[];
}
export interface SurveyQuestions extends QuestionData {
	RespondentAnswers: string[];
}
interface HistorySurveyProps {
	token?: string;
}

interface HistorySurveyState {
	surveys: SurveyData[];
}
export class HistorySurvey extends React.Component<HistorySurveyProps, HistorySurveyState> {
	public constructor(props: HistorySurveyProps) {
		super(props);

		this.state = {
			surveys: [],
		}
	}

	public componentDidMount () {
		return SurveyDataProvider.getAllUserSurveys(this.props.token!)
		.then(surveys => {
			surveys.forEach((survey: any) => {
				const questions: SurveyQuestions[] = [];
				survey.Questions.forEach((question: any) => {
					questions.push(question);
				});
				const surveyData: SurveyData = {
					id: survey._id,
					type: survey.Type,
					title: survey.Title,
					surveyQuestions: questions,
				}
				this.setState(previousState => ({
				surveys: [...previousState.surveys, surveyData]}));
			});
		});
	}

	public render () {
		const renderSurvey = this.state.surveys.map((survey, index) => {
			return (
				<SurveyInHistory 
					key={index}
					id={survey.id}
					type={survey.type}
					title={survey.title}
					questions={survey.surveyQuestions}
				/>
			)
		});

		return (
			<React.Fragment>
                <NavBar backArrowVisable={true} barText={'History'} linkTo={'/mainPage/' + this.props.token}/>
				{renderSurvey}
            </React.Fragment>
		);
	}
}