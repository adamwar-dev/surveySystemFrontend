import * as React from 'react';
import { NavBar } from '../components/NavBar';
import { SurveyDataProvider } from '../data/SurveyDataProvider';


interface HistorySurveyProps {
	token?: string;
}
export class HistorySurvey extends React.Component<HistorySurveyProps> {
	public constructor(props: HistorySurveyProps) {
		super(props);
	}

	public componentDidMount () {
		return SurveyDataProvider.getAllUserSurveys(this.props.token!);
	}

	public render () {
		return (
			<React.Fragment>
                <NavBar backArrowVisable={true} barText={'History'} linkTo={'/mainPage/' + this.props.token}/>

            </React.Fragment>
		);
	}
}