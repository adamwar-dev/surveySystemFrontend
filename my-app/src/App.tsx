import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { Profile } from './pages/Profile';
import { CreateSurvey } from './pages/CreateSurvey';
import { HistorySurvey } from './pages/HistorySurvey';
import { Survey } from './pages/Survey';


class App extends React.Component {
	public render () {
		return (
			<Router>
				<Switch>
					<Route exact path={'/'}>
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
