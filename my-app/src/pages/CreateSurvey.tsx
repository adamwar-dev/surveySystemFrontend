import * as React from 'react';
import { NavBar } from '../components/NavBar';

export class CreateSurvey extends React.Component{
	public render () {
		return (
			<React.Fragment>
                <NavBar backArrowVisable={true} barText={'Create a Survey'}/>
            </React.Fragment>
		);
	}
}