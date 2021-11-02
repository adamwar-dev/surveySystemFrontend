import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { Profile } from './pages/Profile';
import { CreateSurvey } from './pages/CreateSurvey';
import { HistorySurvey } from './pages/HistorySurvey';


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
				</Switch>
			</Router>
		);
	}
}

export default App;
