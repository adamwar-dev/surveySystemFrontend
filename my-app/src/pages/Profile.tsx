import * as React from 'react';
import { NavBar } from '../components/NavBar';

export class Profile extends React.Component{
	public render () {
		return (
			<React.Fragment>
                <NavBar backArrowVisable={true} barText={'Welcome to your Profile'}/>
            </React.Fragment>
		);
	}
}