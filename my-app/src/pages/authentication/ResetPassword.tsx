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
import SmsFailedRoundedIcon from '@mui/icons-material/SmsFailedRounded';

interface ResetPasswordProps {}

export interface ResetPasswordState {
	email: string;
	emailError: boolean;
	resetStatus?: boolean;
}

export class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
	public constructor(props: ResetPasswordProps) {
		super(props);

		this.state = {
			email: '',
			emailError: true,
			resetStatus: undefined,
		}
	}

	public componentDidMount() {

	}

	public componentWillUnmount() {

	}

	public render () {
		const {
			email,
			emailError,
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
						{'Reset Password'}
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
							<Button
								disabled={emailError}
								type='submit'
								fullWidth
								variant='contained'
								sx={{ mt: 3, mb: 2, backgroundColor: palettePro.button.buttonPrimary, floodColor: palettePro.button.buttonPrimary }}
							>
								{'Reset'}
							</Button>
                            { this.state.resetStatus ? (<Redirect push to="/signIn/success"/>) : null }
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
								<Link href='/signIn' variant='body2' sx={{ color: palettePro.link.linkPrimary}}>
									{'Sign In'}
								</Link>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs>
							</Grid>
							<Grid item>
								<Link href='/signUp' variant='body2' sx={{ color: palettePro.link.linkPrimary}}>
									{'Create Account'}
								</Link>
							</Grid>
						</Grid>
                        {this.state.resetStatus === false &&
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
										<SmsFailedRoundedIcon htmlColor='#ff6666'/>
										<span>{'Invalid Email'}</span>
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

	private readonly validateEmail = (email: string) => {
		if (/^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			this.setState({emailError: false});
		} else {
			this.setState({emailError: true});
		}
	}

	private readonly handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const {
			email,
		} = this.state;
		event.preventDefault();
		return AuthenticationDataProvider.resetPassword(email)
        .then(status => {
			console.log({
				email: this.state.email,
			});
			if (status===201) {
                this.setState({resetStatus: true});
			} else {
                this.setState({resetStatus: false});
			}
		})
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