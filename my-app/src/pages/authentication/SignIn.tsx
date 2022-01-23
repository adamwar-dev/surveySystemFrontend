import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {palettePro} from '../../styles/PalettePro';
import { AuthenticationDataProvider } from '../../data/AuthenticationDataProvider';
import { Redirect } from 'react-router-dom';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';

interface SingInProps {
	status?: string;
	surveyId?: string;
}

export interface SignInState {
	email: string;
	password: string;
	emailError: boolean;
	passwordError: boolean;
	redirect?: boolean;
	token?: string;
	status?: string;
	redirectToPrivateSurvey?: boolean;
	redirectToDistributedSurvey?: boolean;
}

export class SignIn extends React.Component<SingInProps, SignInState> {
	public constructor(props: SingInProps) {
		super(props);

		this.state = {
			email: '',
			password: '',
			emailError: true,
			passwordError: true,
			redirect: undefined,
			redirectToPrivateSurvey: undefined,
			redirectToDistributedSurvey: undefined,
			token: '',
			status: '',
		}
	}

	public componentDidMount() {
		this.setState({status: this.props.status});
	}

	public componentWillUnmount() {

	}

	public render () {
		const {
			surveyId,
		} = this.props;
		const {
			email,
			password,
			emailError,
			passwordError,
			token,
			status,
		} = this.state;

		return (
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{'Sign in'}
					</Typography>
					<Box component='form' onSubmit={this.handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							value={email}
							onChange={this.handleEmailChange}
							helperText={emailError ? 'Invalid address email' : ''}
							error={emailError}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							sx = {{borderColor: palettePro.frame.framePrimary}}
							value={password}
							onChange={this.handlePasswordChange}
							helperText={passwordError ? 'Invalid password format' : ''}
							error={passwordError}
						/>
						<Button
							disabled={emailError || passwordError}
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2, backgroundColor: palettePro.button.buttonPrimary, floodColor: palettePro.button.buttonPrimary }}
						>
							{'Sign In'}
						</Button>
						{ this.state.redirect ? (<Redirect push to={"/mainPage/" + token}/>) : null }
						{ this.state.redirectToPrivateSurvey ? (<Redirect push to={"/fillPrivateSurvey/" + token + '/' + surveyId}/>) : null }
						{ this.state.redirectToDistributedSurvey ? (<Redirect push to={"/distributedToken/" + token + '/' + surveyId}/>) : null }
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
								<Link href='/signUp' variant='body2' sx={{ color: palettePro.link.linkPrimary}}>
									{'Do not have an account? Sign Up'}
								</Link>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
								<Link href='/resetPassword' variant='body2' sx={{ color: palettePro.link.linkPrimary}}>
									{'Do you forgot password? Reset Here'}
								</Link>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
								<Link href='/verifyAccount' variant='body2' sx={{ color: palettePro.link.linkPrimary}}>
									{'Already created account? Verify Here'}
								</Link>
							</Grid>
						</Grid>
						{this.state.redirect === false &&
							<Grid container>
								<Grid item xs>
								</Grid>
								<Grid item>
									<div style={{
										marginTop: '10px',
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										color: '#ff6666',
									}}>
										<ErrorRoundedIcon htmlColor='#ff6666'/>
										<span>{'Invalid Address Email or Password'}</span>
									</div>
								</Grid>
							</Grid>
						}
						{status === 'success' &&
							<Grid container>
								<Grid item xs>
								</Grid>
								<Grid item>
									<div style={{
										marginTop: '10px',
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										color: '#009933',
									}}>
										<CheckBoxRoundedIcon htmlColor='#009933'/>
										<span>{'Sign In with a new Password now!'}</span>
									</div>
								</Grid>
							</Grid>
						}
						{status === 'verify' &&
							<Grid container>
								<Grid item xs>
								</Grid>
								<Grid item>
									<div style={{
										marginTop: '10px',
										display: 'flex',
										alignItems: 'center',
										flexWrap: 'wrap',
										color: '#009933',
									}}>
										<CheckBoxRoundedIcon htmlColor='#009933'/>
										<span>{'Your Account has been verfied!'}</span>
									</div>
								</Grid>
							</Grid>
						}
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		);
	}

	private readonly handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({email: event.currentTarget.value});
		this.validateEmail(event.currentTarget.value);
	}

	private readonly handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({password: event.currentTarget.value});
		this.validatePassword(event.currentTarget.value);
	}


	private readonly validateEmail = (email: string) => {
		if (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			this.setState({emailError: false});
		} else {
			this.setState({emailError: true});
		}
	}

	private readonly validatePassword = (password: string) => {
		this.setState({passwordError: false});
		// if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
		// 	this.setState({passwordError: false});
		// } else {
		// 	this.setState({passwordError: true});
		// }
	}

	
	private readonly handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const {
			email,
			password,
		} = this.state;
		this.setState({ redirect: undefined, status: undefined });
		event.preventDefault();
		return AuthenticationDataProvider.singIn(email, password)
		.then((newToken) => {
			console.log({
				email: this.state.email,
				password: this.state.password,
			});
			if (newToken!=='') {
				if (this.props.status === 'fillingPrivate') {
					this.setState({token: newToken, redirectToPrivateSurvey: true});
				} else if (this.props.status === 'fillingDistributed') {
					this.setState({token: newToken, redirectToDistributedSurvey: true});
				}
				else {
					this.setState({ token: newToken, redirect: true });
				}
			} else {
				this.setState({ redirect: false });
			}
		}).catch(error => {
			console.log({error});
		});
	};
}

const Copyright = (props: any) => {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://platforma2.polsl.pl/rau2/course/view.php?id=878'>
				{'Survey Surf Project'}
			</Link>{' '}
			{new Date().getFullYear()}
		</Typography>
	);
}