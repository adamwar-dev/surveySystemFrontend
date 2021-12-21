import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { Profile } from './pages/Profile';
import { CreateSurvey } from './pages/CreateSurvey';
import { HistorySurvey } from './pages/HistorySurvey';
import { Survey } from './pages/Survey';
import { SignIn } from './pages/authentication/SignIn';
import { SignUp } from './pages/authentication/SignUp';


class App extends React.Component {
	public render () {
		return (
			<Router>
				<Switch>
					<Route exact path={'/'}>
						<Redirect to='/signIn'/>
					</Route>
					<Route exact path={'/signIn'}>
						<SignIn/>
					</Route>
					<Route exact path={'/signUp'}>
						<SignUp/>
					</Route>
					<Route exact path={'/mainPage'}>
						<MainPage/>
					</Route>
					<Route path={'/create'}>
						<CreateSurvey/>
					</Route>
					<Route path={'/history'}>
						<HistorySurvey/>
					</Route>
					<Route path={'/profile'}>
						<Profile/>
					</Route>
					<Route exact path={'/survey/:id'} render={(props) => (
    					<Survey surveyType={props.match.params.id}/>)} />
				</Switch>
			</Router>
		);
	}
}

export default App;
