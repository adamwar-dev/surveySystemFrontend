import * as React from 'react';
import { NavBar } from '../components/NavBar';

interface SurveyProps {
	surveyType: string;
}

export class Survey extends React.Component<SurveyProps> {
	public constructor(props: SurveyProps) {
		super(props);
	}

	public render () {
		const {
			surveyType,
		} = this.props;
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
					linkTo='/create'/>
            </React.Fragment>
		);
	}
}