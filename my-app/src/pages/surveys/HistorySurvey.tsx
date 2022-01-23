import { Typography } from '@mui/material';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { NavBar } from '../../components/NavBar';
import { SurveyInHistory } from '../../components/SurveyInHistory';
import { SurveyDataProvider } from '../../data/SurveyDataProvider';

export interface SurveyData {
	id: string;
	type: string;
	title: string;
	tokens?: string[];
}
interface HistorySurveyProps {
	token?: string;
	status?: string;
}

interface HistorySurveyState {
	surveys: SurveyData[];
	redirectOnDelete: boolean;
}
export class HistorySurvey extends React.Component<HistorySurveyProps, HistorySurveyState> {
	public constructor(props: HistorySurveyProps) {
		super(props);

		this.state = {
			surveys: [],
			redirectOnDelete: false,
		}
	}

	public componentDidMount () {
		return SurveyDataProvider.getAllUserSurveys(this.props.token!)
		.then(surveys => {
			surveys.forEach((survey: any) => {
				const surveyData: SurveyData = {
					id: survey._id,
					type: survey.Type,
					title: survey.Title,
					tokens: survey.Tokens,
				}
				this.setState(previousState => ({
				surveys: [...previousState.surveys, surveyData]}));
			});
		});
	}

	public render () {
		const {
			status,
		} = this.props;

		const renderSurvey = this.state.surveys.map((survey, index) => {
			return (
				<React.Fragment>
				{survey.type !== 'Distributed' &&
					<SurveyInHistory 
						key={index}
						token={this.props.token!}
						id={survey.id}
						type={survey.type}
						title={survey.title}
						onDelete={this.handleSurveyDelete}
					/>
				}
				{survey.type === 'Distributed' &&
					<SurveyInHistory 
						key={index}
						token={this.props.token!}
						id={survey.id}
						type={survey.type}
						title={survey.title}
						tokens={survey.tokens}
						onDelete={this.handleSurveyDelete}
					/>
				}
				</React.Fragment>
			)
		});

		return (
			<React.Fragment>
                <NavBar backArrowVisable={true} barText={'History'} linkTo={'/mainPage/' + this.props.token}/>
				{status === '201' &&
					<Typography color={'#47d147'} align='center' sx={{mb:'40px'}}>
						{'New survey created successfully!'}
					</Typography>
				}
				{status !== '201' && status !== 'deleted' && status !== undefined &&
					<Typography color={'#ff1a1a'} align='center' sx={{mb:'40px'}}>
						{'Error occurred while creating survey :('}
					</Typography>
				}
				{status === 'deleted' &&
					<Typography color={'#47d147'} align='center' sx={{mb:'40px'}}>
						{'Survey deleted successfully!'}
					</Typography>
				}
				{this.state.redirectOnDelete ? (<Redirect push to={'/history/' + this.props.token + '/deleted'} />) : null}
				{renderSurvey}
            </React.Fragment>
		);
	}

	private readonly handleSurveyDelete = (surveyId: string, token: string) => {
		return SurveyDataProvider.deleteSurvey(surveyId, token)
		.then(status => {
			if (status === 200) {
				this.setState({redirectOnDelete: true});
			}
		});
	}
}