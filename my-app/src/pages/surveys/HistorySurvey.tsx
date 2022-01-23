import { Typography } from '@mui/material';
import * as React from 'react';
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
				{status !== '201' && status !== undefined &&
					<Typography color={'#ff1a1a'} align='center' sx={{mb:'40px'}}>
						{'Error occurred while creating survey :('}
					</Typography>
				}
				{renderSurvey}
            </React.Fragment>
		);
	}
}