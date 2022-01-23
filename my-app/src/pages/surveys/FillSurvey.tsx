import * as React from 'react';
import { Redirect } from 'react-router-dom';

interface FillSurveyProps {
	surveyId: string;
    surveyType: string;
}

export class FillSurvey extends React.Component<FillSurveyProps> {
	public constructor(props: FillSurveyProps) {
		super(props);
	}

	public render () {
        const {
            surveyId,
            surveyType,
        } = this.props;
		return (
			<React.Fragment>
               { surveyType === 'Public' ? (<Redirect push to={"/fillPublicSurvey/" + surveyId}/>) 
                : surveyType === 'Private' ? (<Redirect push to={"/signIn/fillingPrivate/" + surveyId}/>)
				: (<Redirect push to={"/signIn/fillingDistributed/" + surveyId}/>)
				}
            </React.Fragment>
		);
	}
}