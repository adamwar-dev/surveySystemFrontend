import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import { MainPage } from './pages/MainPage'
import { Profile } from './pages/Profile';
import { CreateSurvey } from './pages/surveys/CreateSurvey';
import { HistorySurvey } from './pages/surveys/HistorySurvey';
import { Survey } from './pages/surveys/Survey';
import { SignIn } from './pages/authentication/SignIn';
import { SignUp } from './pages/authentication/SignUp';
import { ResetPassword } from './pages/authentication/ResetPassword';
import { VerifyAccount } from './pages/authentication/VerifyAccount';
import { PreviewSurvey } from './pages/surveys/PreviewSurvey';
import { FillSurvey } from './pages/surveys/FillSurvey';
import { FillPublicSurvey } from './pages/surveys/FillPublicSurvey';
import { FillPrivateSurvey } from './pages/surveys/FillPrivateSurvey';
import { FinalPage } from './pages/FinalPage';
import { FillDistributedSurvey } from './pages/surveys/FillDistributedSurvey';
import { DistributedTokenPage } from './pages/surveys/DistributedTokenPage';

class App extends React.Component {
	public render () {
		return (
			<Router>
				<Switch>
					<Route exact path={'/'}>
						<Redirect to='/signIn'/*mainPage skipping login part*//>
					</Route>
					<Route exact path={'/signIn'}>
						<SignIn/>
					</Route>
					<Route exact path={'/signIn/:status'} render={(props) => (
    					<SignIn status={props.match.params.status}/>)} 
					/>
					<Route exact path={'/signIn/:status/:id'} render={(props) => (
    					<SignIn 
							status={props.match.params.status}
							surveyId={props.match.params.id}
						/>)} 
					/>
					<Route exact path={'/signUp'}>
						<SignUp/>
					</Route>
					<Route exact path={'/verifyAccount'}>
					<VerifyAccount/>
					</Route>
					<Route exact path={'/verifyAccount/:email'} render={(props) => (
    					<VerifyAccount email={props.match.params.email}/>)} 
					/>
					<Route exact path={'/resetPassword'}>
						<ResetPassword/>
					</Route>
					<Route exact path={'/mainPage'}>
						<MainPage/>
					</Route>
					<Route exact path={'/mainPage/:token'} render={(props) => (
    					<MainPage token={props.match.params.token}/>)} 
					/>
					<Route exact path={'/create/:token'} render={(props) => (
    					<CreateSurvey token={props.match.params.token}/>)} 
					/>
					<Route exact path={'/history/:token'} render={(props) => (
    					<HistorySurvey token={props.match.params.token}/>)} 
					/>
					<Route exact path={'/history/:token/:status'} render={(props) => (
    					<HistorySurvey 
							token={props.match.params.token}
							status={props.match.params.status}
						/>)} 
					/>
					<Route exact path={'/preview/:token/:surveyToken'} render={(props) => (
    					<PreviewSurvey 
							userToken={props.match.params.token}
							surveyToken={props.match.params.surveyToken}
						/>)} 
					/>
					<Route exact path={'/profile/:token'} render={(props) => (
    					<Profile token={props.match.params.token}/>)} 
					/>
					<Route exact path={'/survey/:type/:token'} render={(props) => (
    					<Survey 
							surveyType={props.match.params.type}
							token={props.match.params.token}
						/>
						)} 
					/>
					<Route exact path={'/fillSurvey/:type/:id'} render={(props) => (
    					<FillSurvey 
							surveyType={props.match.params.type}
							surveyId={props.match.params.id}
						/>
						)} 
					/>
					<Route exact path={'/fillPublicSurvey/:id'} render={(props) => (
    					<FillPublicSurvey 
							surveyId={props.match.params.id}
						/>
						)}
					/>
					<Route exact path={'/fillPrivateSurvey/:token/:id'} render={(props) => (
    					<FillPrivateSurvey
							token={props.match.params.token}
							surveyId={props.match.params.id}
						/>
						)}
					/>
					<Route exact path={'/fillDistributedSurvey/:token/:id/:surveyToken'} render={(props) => (
    					<FillDistributedSurvey
							token={props.match.params.token}
							surveyId={props.match.params.id}
							surveyToken={props.match.params.surveyToken}
						/>
						)}
					/>
					<Route exact path={'/distributedToken/:token/:id'} render={(props) => (
    					<DistributedTokenPage
							token={props.match.params.token}
							surveyId={props.match.params.id}
						/>
						)}
					/>
					<Route exact path={'/finalPage/:status'} render={(props) => (
    					<FinalPage
							status={props.match.params.status}
						/>
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
