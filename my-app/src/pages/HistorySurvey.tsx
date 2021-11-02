import * as React from 'react';
import { NavBar } from '../components/NavBar';

export class HistorySurvey extends React.Component{
	public render () {
		return (
			<React.Fragment>
                <NavBar backArrowVisable={true} barText={'History'}/>
            </React.Fragment>
		);
	}
}