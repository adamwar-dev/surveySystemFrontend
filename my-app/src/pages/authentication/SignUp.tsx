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
import { SignInState } from './SignIn';
import { AuthenticationDataProvider } from '../../data/AuthenticationDataProvider';
import { Redirect } from 'react-router-dom';

interface SingUpProps {}

interface SingUpState extends SignInState {
	repeatPassword: string;
	emailError: boolean;
	passwordError: boolean;
	repeatPasswordError: boolean;
	redirect?: boolean;
}

export class SignUp extends React.Component<SingUpProps, SingUpState> {
	public constructor(props: SingUpProps) {
		super(props);

		this.state = {
			email: '',
			password: '',
			repeatPassword: '',
			emailError: true,
			passwordError: true,
			repeatPasswordError: true,
			redirect: undefined,
		}
	}

	public componentDidMount() {

	}

	public componentWillUnmount() {

	}

	public render () {
		const {
			email,
			password,
			repeatPassword,
			emailError,
			passwordError,
			repeatPasswordError,
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
						{'Create Account'}
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
							sx={{borderColor: palettePro.frame.framePrimary}}
							value={password}
							onChange={this.handlePasswordChange}
							helperText={passwordError ? 'Invalid password format' : ''}
							error={passwordError}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='repeatPassword'
							label='Repeat password'
							type='password'
							id='repeatPassword'
							autoComplete='current-password'
							sx = {{borderColor: palettePro.frame.framePrimary}}
							value={repeatPassword}
							onChange={this.handleRepeatPasswordChange}
							helperText={repeatPasswordError ? 'Passwords do not match' : ''}
							error={repeatPasswordError}
						/>
						<Button
							disabled={emailError || passwordError || repeatPasswordError}
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2, backgroundColor: palettePro.button.buttonPrimary, floodColor: palettePro.button.buttonPrimary }}
						>
							{'Create Account'}
						</Button>
						{ this.state.redirect ? (<Redirect push to="/signIn"/>) : null }
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
								<Link href='/' variant='body2' sx={{ color: palettePro.link.linkPrimary}}>
									{'You have an account? Sign In'}
								</Link>
							</Grid>
						</Grid>
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
		this.validateRepeatPassword(event.currentTarget.value);
	}

	private readonly handleRepeatPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({repeatPassword: event.currentTarget.value});
		this.validateRepeatPassword(event.currentTarget.value);
	}

	private readonly validateEmail = (email: string) => {
		if (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			this.setState({emailError: false});
		} else {
			this.setState({emailError: true});
		}
	}

	private readonly validatePassword = (password: string) => {
		if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
			this.setState({passwordError: false});
		} else {
			this.setState({passwordError: true});
		}
	}

	private readonly validateRepeatPassword = (repeatPassword: string) => {
		if (this.state.password === repeatPassword) {
			this.setState({repeatPasswordError: false});
		} else {
			if(this.state.repeatPassword === repeatPassword) {
				this.setState({repeatPasswordError: false});
			} else {
				this.setState({repeatPasswordError: true});
			}
		}
	}

	private readonly handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		const {
			email,
			password,
		} = this.state;
		event.preventDefault();
		return AuthenticationDataProvider.createAccount(email, password)
		.then(token => {
			console.log({
				email: this.state.email,
				password: this.state.password,
				repeatPassword: this.state.repeatPassword,
			});
			if (token===201) {
				this.setState({ redirect: true })
			} else {
				this.setState({ redirect: false });
			}
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